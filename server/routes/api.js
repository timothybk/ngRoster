const express = require("express");
const router = express.Router();
const FireFighter = require("./../models/firefighter");
const Qualification = require("./../models/qualification");
const Appliance = require("../models/appliance");
const ShiftInstance = require("../models/shiftinstance");
const Nightduty = require("./../models/night-duty");
const jwt = require("jsonwebtoken");

// // declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

router.use("/", (req, res, next) => {
  jwt.verify(
    req.headers.authorization,
    "Pia is the cutest!",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({
          title: "Not logged in",
          error: err
        });
      }
      next();
    }
  );
});

// Get all firefighters
router.get("/firefighters", (req, res) => {
  FireFighter.find({})
    .sort("-rank number")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
});

// Add new firefighter
router.post("/firefighter", (req, res, next) => {
  req.check("rank", "Rank must not be empty.").notEmpty();
  req.check("name", "Name must not be empty.").notEmpty();

  req.sanitize("rank").escape();
  req.sanitize("name").escape();
  req.sanitize("rank").trim();
  req.sanitize("name").trim();

  const newFirefighter = new FireFighter({
    number: req.body.number,
    rank: req.body.rank,
    name: req.body.name,
    qualifications: req.body.qualifications,
    n2: req.body.n2
  });

  const errors = req.validationErrors();
  if (errors) {
    res.status(500).send(errors);
  } else {
    newFirefighter
      .save()
      .then(firefighter => {
        console.log(firefighter);
        res.status(200).send(firefighter);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

// update firefighter
router.post("/updatefirefighter", (req, res, next) => {
  req.check("firefighter.rank", "Rank must not be empty.").notEmpty();
  req.check("firefighter.name", "Name must not be empty.").notEmpty();

  req.sanitize("firefighter.rank").escape();
  req.sanitize("firefighter.name").escape();
  req.sanitize("firefighter.rank").trim();
  req.sanitize("firefighter.name").trim();

  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.status(500).send(errors);
  } else {
    var promise = FireFighter.findByIdAndUpdate(
      req.body.key,
      {
        number: req.body.firefighter.number,
        rank: req.body.firefighter.rank,
        name: req.body.firefighter.name,
        qualifications: req.body.firefighter.qualifications
      },
      { new: true }
    ).exec();

    promise
      .then(firefighter => {
        res.status(200).send(firefighter);
        console.log(firefighter);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

// delete firefighter post
router.post("/deletefirefighter", (req, res, next) => {
  console.log("begin delete");
  req.check("name", "name must not be empty").exists();

  req.sanitize("name").escape();
  req.sanitize("name").trim();

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.status(500).send(errors);
  } else {
    FireFighter.findOneAndRemove({ name: req.body.name }, () =>
      res.status(200)
    );
  }
});

// Get all shifts
router.get("/ffpumptotals", (req, res) => {
  const promiseFirefighters = FireFighter.find()
    .where("name")
    .nin(["Seeney", "Ruaro", "dummy"])
    .exec();

  const promiseAppliances = Appliance.find()
    .populate("qualifications")
    .exec();

  Promise.all([promiseFirefighters, promiseAppliances]).then(ffsAndPumps => {
    const firefighters = ffsAndPumps[0];
    const appliances = ffsAndPumps[1];

    const fnGetShifts = firefighter => {
      return Promise.all(
        appliances.map(appliance => {
          return ShiftInstance.find({ firefighter: firefighter._id })
            .where("pump")
            .equals(appliance._id)
            .sort("date")
            .limit(1)
            .then(result => {
              if (result.length) {
                return {
                  pump: appliance.name,
                  date: result[0].date
                };
              } else {
                return {
                  pump: appliance.name,
                  date: new Date()
                };
              }
            });
        })
      ).then(result => {
        return {
          firefighter: firefighter.name,
          pumps: result
        };
      });
    };

    const fnGetShiftByPump = pump => {
      return Promise.all(
        firefighters.map(firefighter => {
          return ShiftInstance.find({ pump: pump._id })
            .where("firefighter")
            .equals(firefighter._id)
            .then(result => {
              return {
                firefighter: firefighter.name,
                count: result.length
              };
            });
        })
      ).then(result => {
        return {
          pump: pump.name,
          firefighters: result
        };
      });
    };

    const fnTallyandFormat = rawResult => {
      const tallyResult = {};
      tallyResult.firefighter = rawResult.firefighter;
      tallyResult.total = 0;
      tallyResult.pumps = [];

      for (const pump of rawResult.pumps) {
        tallyResult.pumps.push({
          name: pump.pump,
          count: pump.count
        });
        tallyResult.total += pump.count;
      }

      return tallyResult;
    };

    const fnTallyandFormatPump = rawResult => {
      const tallyResult = {};
      tallyResult.pump = rawResult.pump;
      tallyResult.total = 0;
      tallyResult.firefighters = [];

      for (const firefighter of rawResult.firefighters) {
        tallyResult.firefighters.push({
          name: firefighter.firefighter,
          count: firefighter.count
        });
        tallyResult.total += firefighter.count;
      }

      return tallyResult;
    };

    const fnFindPercentage = tallyResult => {
      const percentageResult = {
        firefighter: tallyResult.firefighter,
        pumps: []
      };

      for (const pump of tallyResult.pumps) {
        percentageResult.pumps.push({
          name: pump.name,
          percentage: (pump.count / tallyResult.total) * 100
        });
      }

      return percentageResult;
    };

    const fnFindPercentagePump = tallyResult => {
      const percentageResult = {
        pump: tallyResult.pump,
        firefighters: []
      };

      for (const firefighter of tallyResult.firefighters) {
        percentageResult.firefighters.push({
          name: firefighter.name,
          percentage: (firefighter.count / tallyResult.total) * 100
        });
      }

      return percentageResult;
    };

    const fnSortInFF = rawResult => {
      const pumps = rawResult.pumps;
      const sorted = pumps.sort((a, b) => {
        return a.date - b.date;
      });

      const justNames = [];

      for (const result of sorted) {
        justNames.push(result.pump);
      }

      return [rawResult.firefighter, justNames];
    };

    const fnSortInPump = percentageResult => {
      const firefighters = percentageResult.firefighters;
      const sorted = firefighters.sort((a, b) => {
        return a.percentage - b.percentage;
      });

      const justNames = [];

      for (const result of sorted) {
        justNames.push(result.name);
      }

      return [percentageResult.pump, justNames];
    };

    const fnQualCheckFf = pumpFfList => {
      const pumpTruthey = [];

      for (const pumper of pumpFfList[1]) {
        const actualPump = appliances.find(pump => pump.name === pumper);

        const pumpQuals = actualPump.qualifications;

        if (pumpQuals.length > 0) {
          const actualFf = firefighters.find(ff => ff.name === pumpFfList[0]);
          const index = actualFf.qualifications.indexOf(pumpQuals[0].name);

          if (index > -1) {
            pumpTruthey.push(pumper);
          }
        } else {
          pumpTruthey.push(pumper);
        }
      }

      return [pumpFfList[0], pumpTruthey];
    };

    const promisePumpSorted = Promise.all(
      appliances.map(fnGetShiftByPump)
    ).then(rawResults => {
      const tallyResult = rawResults.map(fnTallyandFormatPump);
      const percentageResult = tallyResult.map(fnFindPercentagePump);
      const justSorted = percentageResult.map(fnSortInPump);

      return justSorted;
    });

    const promiseFfSorted = Promise.all(firefighters.map(fnGetShifts)).then(
      rawResults => {
        const justSorted = rawResults.map(fnSortInFF);
        const checked = justSorted.map(fnQualCheckFf);

        return checked;
      }
    );

    Promise.all([promisePumpSorted, promiseFfSorted]).then(result => {
      const pumpPreferences = result[0];
      const ffPreferences = result[1];
      const pumpKey = [];
      const ffKey = [];
      const failList = [];
      let tempFailList = [];

      const pumpsSeatsArr = [[], [], [], [], []];

      const fnCheckPumpNumber = pumpIndex => {

        const actualPump = appliances[pumpIndex];

        const pumpSeats = actualPump.seats;

        if (pumpsSeatsArr[pumpIndex].length < pumpSeats.length) {
          return true;
        } else {
          return false;
        }
      };

      const fnGetPumpIndex = pumpString => {
        return pumpKey.indexOf(pumpString);
      };

      const fnGetFfIndex = ffString => {
        return ffKey.indexOf(ffString);
      };

      const fnSortSeatsArr = pumpIndex => {
        pumpsSeatsArr[pumpIndex].sort(function(a, b) {
          return a - b;
        });
        return;
      };

      const fnFfFromPumpRecipPref = (pumpIndex, pumpRecipPref) => {
        console.log(
          "pumpIndex: ",
          pumpIndex,
          " pumpRecipPref: ",
          pumpRecipPref
        );
        return pumpPreferences[pumpIndex][1][pumpRecipPref];
      };

      const fnClearTempFailList = () => {
        tempFailList = [];
      };

      const fnMarriageLogic = firefighter => {
        for (let l = 0; l < firefighter[1].length; l++) {
          const preference = firefighter[1][l];
          // console.log(pumpIndex, pumpKey[pumpIndex], pumpRecipPref);

          const pumpIndex = fnGetPumpIndex(preference);
          const seatsAvailable = fnCheckPumpNumber(pumpIndex);
          const pumpRecipPref = pumpPreferences[pumpIndex][1].indexOf(
            firefighter[0]
          );

          if (seatsAvailable) {
            pumpsSeatsArr[pumpIndex].push(pumpRecipPref);

            fnSortSeatsArr(pumpIndex);

            console.log("added to ", preference, " there are still seats");

            break;
          } else if (pumpsSeatsArr[pumpIndex][3] > pumpRecipPref) {
            console.log(
              preference,
              " had ",
              pumpsSeatsArr[pumpIndex],
              " swaping ",
              pumpRecipPref
            );
            const oldFFString = fnFfFromPumpRecipPref(
              pumpIndex,
              pumpsSeatsArr[pumpIndex][3]
            );
            console.log("old ff string: ", oldFFString);
            const oldFFIndex = fnGetFfIndex(oldFFString);
            console.log("old ff index: ", oldFFIndex);
            tempFailList.push(ffPreferences[oldFFIndex]);
            pumpsSeatsArr[pumpIndex][3] = pumpRecipPref;
            fnSortSeatsArr(pumpIndex);

            console.log(preference, " now has ", pumpsSeatsArr[pumpIndex]);
            console.log("tempFailList now has", oldFFString);
            break;
          } else if (l === firefighter[1].length - 1) {
            failList.push(firefighter);
            console.log(
              preference,
              " has ",
              pumpsSeatsArr[pumpIndex],
              " ignoring ",
              pumpRecipPref,
              " that was last preference"
            );
            console.log("faillist now has", firefighter);
          } else {
            console.log(
              preference,
              " has ",
              pumpsSeatsArr[pumpIndex],
              " ignoring ",
              pumpRecipPref,
              " trying next preference"
            );
          }
        }
      };

      for (const pump of pumpPreferences) {
        pumpKey.push(pump[0]);
      }

      for (const ff of ffPreferences) {
        ffKey.push(ff[0]);
      }

      for (let k = 0; k < ffPreferences.length; k++) {
        const firefighter = ffPreferences[k];
        console.log(firefighter[0]);
        fnMarriageLogic(firefighter);
      }

      // iterate through temp fail list
      while (tempFailList.length > 0) {
        const copyTempFailList = [...tempFailList];
        fnClearTempFailList();
        for (let i = 0; i < copyTempFailList.length; i++) {
          console.log(copyTempFailList, tempFailList);
          const firefighter = copyTempFailList[i];
          fnMarriageLogic(firefighter);
        }
      }

      for (let i = 0; i < pumpsSeatsArr.length; i++) {
        const pumpString = pumpKey[i];
        const currentPumpPrefs = pumpPreferences[i][1];
        for (let j = 0; j < pumpsSeatsArr[i].length; j++) {
          const ffRecipIndex = pumpsSeatsArr[i][j];
          const ffString = currentPumpPrefs[ffRecipIndex];
          pumpsSeatsArr[i][j] = ffString;
        }

        console.log(pumpString, pumpsSeatsArr[i]);
      }
      console.log(
        "///fail list///\n",
        failList,
        "\n///fail list///\n",
        "\n///TEMP fail list///\n",
        tempFailList,
        "\n///TEMP fail list///"
      );
      // console.log(pumpPreferences, ffPreferences);
    });
  });
});

// Get all pumps
router.get("/pumps", (req, res) => {
  Appliance.find({})
    .populate("qualifications", "name")
    .then(result => {
      const newPumpArray = [];
      for (const pump of result) {
        if (pump.qualifications.length > 0) {
          for (let i = 0; i < pump.qualifications.length; i++) {
            pump.qualifications[i] = pump.qualifications[i].name;
          }
        }
        newPumpArray.push(pump);
      }
      return newPumpArray;
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// control post actions for nightduties
router.post("/nightduty", (req, res, next) => {
  console.log("received", req.body.date);
  req.checkBody("firefighter", "Firefighter must not be empty").notEmpty();
  req.checkBody("date", "Invalid date").notEmpty();

  req.sanitize("firefighter").escape();
  req.sanitize("date").toDate();

  req.sanitize("firefighter").trim();

  const changeDate = req.body.date.setHours(req.body.date.getHours() + 11);
  const n2FF = { name: req.body.firefighter };
  const n2Date = { n2: req.body.date };
  console.log(n2Date);

  const errors = req.validationErrors();
  if (errors) {
    res.status(500).send(errors);
  } else {
    var promise = FireFighter.findByIdAndUpdate(req.body.firefighter, n2Date, {
      new: true
    })
      .then(firefighter => {
        res.status(200).send(firefighter);
        console.log(firefighter);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
});

// find shifts n2
// .then(firefighters => {
//   return Promise.all(
//     firefighters.map(firefighter => {
//       const promiseShifts = ShiftInstance.aggregate()
//         .match({ firefighter: firefighter._id })
//         .lookup({
//           from: "firefighters",
//           localField: "firefighter",
//           foreignField: "_id",
//           as: "firefighter"
//         })
//         .unwind("$firefighter")
//         .lookup({
//           from: "appliances",
//           localField: "pump",
//           foreignField: "_id",
//           as: "pump"
//         })
//         .unwind("$pump")
//         .group({
//           _id: {
//             pump: "$pump.name",
//             shift: "$shift",
//             md: "$md"
//           },
//           count: { $sum: 1 }
//         })
//         .then(result => {
//           let shiftCount = 0;
//           const newFirefighter = {
//             ...firefighter
//           };

//           for (const shift of result) {
//             shiftCount += shift.count;
//           }

//           const newArr = [
//             {
//               pump: "flyer",
//               counts: {
//                 dayDrive: 0,
//                 dayBack: 0,
//                 nightDrive: 0,
//                 nightBack: 0
//               }
//             },
//             {
//               pump: "runner",
//               counts: {
//                 dayDrive: 0,
//                 dayBack: 0,
//                 nightDrive: 0,
//                 nightBack: 0
//               }
//             },
//             {
//               pump: "rescuepump",
//               counts: {
//                 dayDrive: 0,
//                 dayBack: 0,
//                 nightDrive: 0,
//                 nightBack: 0
//               }
//             },
//             {
//               pump: "salvage",
//               counts: {
//                 dayDrive: 0,
//                 dayBack: 0,
//                 nightDrive: 0,
//                 nightBack: 0
//               }
//             },
//             {
//               pump: "bronto",
//               counts: {
//                 dayDrive: 0,
//                 dayBack: 0,
//                 nightDrive: 0,
//                 nightBack: 0
//               }
//             }
//           ];

//           for (const shift of result) {
//             const individualCount = shift.count / shiftCount * 100;
//             if (shift._id.md) {
//               if (shift._id.shift === "day") {
//                 if (shift._id.pump === 'flyer') {
//                   newArr[0].counts.dayDrive = individualCount;
//                 } else if (shift._id.pump === 'runner') {
//                   newArr[1].counts.dayDrive = individualCount;
//                 } else if (shift._id.pump === 'rescuepump') {
//                   newArr[2].counts.dayDrive = individualCount;
//                 } else if (shift._id.pump === 'salvage') {
//                   newArr[3].counts.dayDrive = individualCount;
//                 } else {
//                   newArr[4].counts.dayDrive = individualCount;
//                 }
//               } else {
//                 if (shift._id.pump === 'flyer') {
//                   newArr[0].counts.nightDrive = individualCount;
//                 } else if (shift._id.pump === 'runner') {
//                   newArr[1].counts.nightDrive = individualCount;
//                 } else if (shift._id.pump === 'rescuepump') {
//                   newArr[2].counts.nightDrive = individualCount;
//                 } else if (shift._id.pump === 'salvage') {
//                   newArr[3].counts.nightDrive = individualCount;
//                 } else {
//                   newArr[4].counts.nightDrive = individualCount;
//                 }
//               }
//             } else {
//               if (shift._id.shift === "day") {
//                 if (shift._id.pump === 'flyer') {
//                   newArr[0].counts.dayBack = individualCount;
//                 } else if (shift._id.pump === 'runner') {
//                   newArr[1].counts.dayBack = individualCount;
//                 } else if (shift._id.pump === 'rescuepump') {
//                   newArr[2].counts.dayBack = individualCount;
//                 } else if (shift._id.pump === 'salvage') {
//                   newArr[3].counts.dayBack = individualCount;
//                 } else {
//                   newArr[4].counts.dayBack = individualCount;
//                 }
//               } else {
//                 if (shift._id.pump === 'flyer') {
//                   newArr[0].counts.nightBack = individualCount;
//                 } else if (shift._id.pump === 'runner') {
//                   newArr[1].counts.nightBack = individualCount;
//                 } else if (shift._id.pump === 'rescuepump') {
//                   newArr[2].counts.nightBack = individualCount;
//                 } else if (shift._id.pump === 'salvage') {
//                   newArr[3].counts.nightBack = individualCount;
//                 } else {
//                   newArr[4].counts.nightBack = individualCount;
//                 }
//               }
//             }
//           }
//           return newArr;
//         });

//       const promiseNightDuties = Nightduty.find({
//         firefighter: firefighter._id
//       })
//         .populate("firefighter")
//         .then(result => {
//           return result;
//         });

//       return Promise.all([
//         promiseShifts,
//         promiseNightDuties
//       ]).then(([shifts, nightduties]) => {
//         return {
//           ...firefighter._doc,
//           shifts: shifts,
//           nightduties: nightduties
//         };
//       });
//     })
//   );
// })
// .then(result => {
//   let flyerDayDriveTotal = 0;
//   let flyerDayBackTotal = 0;
//   let flyerNightDriveTotal = 0;
//   let flyerNightBackTotal = 0;

//   let runnerDayDriveTotal = 0;
//   let runnerDayBackTotal = 0;
//   let runnerNightDriveTotal = 0;
//   let runnerNightBackTotal = 0;

//   let rescuepumpDayDriveTotal = 0;
//   let rescuepumpDayBackTotal = 0;
//   let rescuepumpNightDriveTotal = 0;
//   let rescuepumpNightBackTotal = 0;

//   let salvageDayDriveTotal = 0;
//   let salvageDayBackTotal = 0;
//   let salvageNightDriveTotal = 0;
//   let salvageNightBackTotal = 0;

//   let brontoDayDriveTotal = 0;
//   let brontoDayBackTotal = 0;
//   let brontoNightDriveTotal = 0;
//   let brontoNightBackTotal = 0;

//   for (const firefighter of result) {
//     if (
//       firefighter.rank !== "Station Officer" &&
//       firefighter.name !== "dummy"
//     ) {
//       for (const shift of firefighter.shifts) {
//         if (shift.pump === "rescuepump") {
//           rescuepumpDayDriveTotal += shift.counts.dayDrive;
//           rescuepumpDayBackTotal += shift.counts.dayBack;
//           rescuepumpNightDriveTotal += shift.counts.nightDrive;
//           rescuepumpNightBackTotal += shift.counts.nightBack;
//         } else if (shift.pump === "salvage") {
//           salvageDayDriveTotal += shift.counts.dayDrive;
//           salvageDayBackTotal += shift.counts.dayBack;
//           salvageNightDriveTotal += shift.counts.nightDrive;
//           salvageNightBackTotal += shift.counts.nightBack;
//         } else if (shift.pump === "bronto") {
//           brontoDayDriveTotal += shift.counts.dayDrive;
//           brontoDayBackTotal += shift.counts.dayBack;
//           brontoNightDriveTotal += shift.counts.nightDrive;
//           brontoNightBackTotal += shift.counts.nightBack;
//         } else if (shift.pump === "runner") {
//           runnerDayDriveTotal += shift.counts.dayDrive;
//           runnerDayBackTotal += shift.counts.dayBack;
//           runnerNightDriveTotal += shift.counts.nightDrive;
//           runnerNightBackTotal += shift.counts.nightBack;
//         } else {
//           flyerDayDriveTotal += shift.counts.dayDrive;
//           flyerDayBackTotal += shift.counts.dayBack;
//           flyerNightDriveTotal += shift.counts.nightDrive;
//           flyerNightBackTotal += shift.counts.nightBack;
//         }
//       }
//     }
//   }
//   const flyerDayDriveAvg = flyerDayDriveTotal / result.length;
//   const flyerDayBackAvg = flyerDayBackTotal / result.length;
//   const flyerNightDriveAvg = flyerNightDriveTotal / result.length;
//   const flyerNightBackAvg = flyerNightBackTotal / result.length;
//   const runnerDayDriveAvg = runnerDayDriveTotal / result.length;
//   const runnerDayBackAvg = runnerDayBackTotal / result.length;
//   const runnerNightDriveAvg = runnerNightDriveTotal / result.length;
//   const runnerNightBackAvg = runnerNightBackTotal / result.length;
//   const rescuepumpDayDriveAvg = rescuepumpDayDriveTotal / result.length;
//   const rescuepumpDayBackAvg = rescuepumpDayBackTotal / result.length;
//   const rescuepumpNightDriveAvg = rescuepumpNightDriveTotal / result.length;
//   const rescuepumpNightBackAvg = rescuepumpNightBackTotal / result.length;
//   const salvageDayDriveAvg = salvageDayDriveTotal / result.length;
//   const salvageDayBackAvg = salvageDayBackTotal / result.length;
//   const salvageNightDriveAvg = salvageNightDriveTotal / result.length;
//   const salvageNightBackAvg = salvageNightBackTotal / result.length;
//   const brontoDayDriveAvg = brontoDayDriveTotal / result.length;
//   const brontoDayBackAvg = brontoDayBackTotal / result.length;
//   const brontoNightDriveAvg = brontoNightDriveTotal / result.length;
//   const brontoNightBackAvg = brontoNightBackTotal / result.length;

//   const averages = {
//     flyer: {
//       dayDrive: flyerDayDriveAvg,
//       dayBack: flyerDayBackAvg,
//       nightDrive: flyerNightDriveAvg,
//       nightBack: flyerNightBackAvg
//     },
//     runner: {
//       dayDrive: runnerDayDriveAvg,
//       dayBack: runnerDayBackAvg,
//       nightDrive: runnerNightDriveAvg,
//       nightBack: runnerNightBackAvg
//     },
//     rescuepump: {
//       dayDrive: rescuepumpDayDriveAvg,
//       dayBack: rescuepumpDayBackAvg,
//       nightDrive: rescuepumpNightDriveAvg,
//       nightBack: rescuepumpNightBackAvg
//     },
//     salvage: {
//       dayDrive: salvageDayDriveAvg,
//       dayBack: salvageDayBackAvg,
//       nightDrive: salvageNightDriveAvg,
//       nightBack: salvageNightBackAvg
//     },
//     bronto: {
//       dayDrive: brontoDayDriveAvg,
//       dayBack: brontoDayBackAvg,
//       nightDrive: brontoNightDriveAvg,
//       nightBack: brontoNightBackAvg
//     }
//   };
//   return {
//     firefighters: result,
//     averages: averages
//   };
// })

// +++++++++++++++++++++++++++++++++++++++++++++++
// delete shift instances with no firefighter

// ShiftInstance.find()
//     .then( shifts => {
//       shifts.map( shift => {
//         FireFighter.find()
//           .where('_id', shift.firefighter)
//           .then( result => {
//             if (!result.length) {
//               ShiftInstance.deleteMany({firefighter: shift.firefighter}).then(console.log('gone'))
//             }
//           })
//       })
//     })
// ++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;

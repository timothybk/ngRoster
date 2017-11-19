const express = require("express");
const router = express.Router();
const FireFighter = require("./../models/firefighter");
const Qualification = require("./../models/qualification");
const Appliance = require("../models/appliance");
const ShiftInstance = require("../models/shiftinstance");
const Nightduty = require("./../models/night-duty");

// // declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});

// get all pumps
router.get("/pumps", (req, res) => {
  Appliance.find()
    .populate("qualifications")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Get all firefighters
router.get("/firefighters", (req, res) => {
  FireFighter.find({})
    .populate("qualifications")
    .then(firefighters => {
      return Promise.all(
        firefighters.map(firefighter => {
          const promiseShifts = ShiftInstance.aggregate()
            .match({ firefighter: firefighter._id })
            .lookup({
              from: "firefighters",
              localField: "firefighter",
              foreignField: "_id",
              as: "firefighter"
            })
            .unwind("$firefighter")
            .lookup({
              from: "appliances",
              localField: "pump",
              foreignField: "_id",
              as: "pump"
            })
            .unwind("$pump")
            .group({
              _id: {
                pump: "$pump.name",
                shift: "$shift",
                md: "$md"
              },
              count: { $sum: 1 }
            })
            .then(result => {
              let shiftCount = 0;
              const newFirefighter = {
                ...firefighter
              };

              for (const shift of result) {
                shiftCount += shift.count;
              }

              const newArr = [
                {
                  pump: "flyer",
                  counts: {
                    dayDrive: 0,
                    dayBack: 0,
                    nightDrive: 0,
                    nightBack: 0
                  }
                },
                {
                  pump: "runner",
                  counts: {
                    dayDrive: 0,
                    dayBack: 0,
                    nightDrive: 0,
                    nightBack: 0
                  }
                },
                {
                  pump: "rescuepump",
                  counts: {
                    dayDrive: 0,
                    dayBack: 0,
                    nightDrive: 0,
                    nightBack: 0
                  }
                },
                {
                  pump: "salvage",
                  counts: {
                    dayDrive: 0,
                    dayBack: 0,
                    nightDrive: 0,
                    nightBack: 0
                  }
                },
                {
                  pump: "bronto",
                  counts: {
                    dayDrive: 0,
                    dayBack: 0,
                    nightDrive: 0,
                    nightBack: 0
                  }
                }
              ];

              for (const shift of result) {
                const individualCount = shift.count / shiftCount * 100;
                if (shift._id.md) {
                  if (shift._id.shift === "day") {
                    if (shift._id.pump === 'flyer') {
                      newArr[0].counts.dayDrive = individualCount;
                    } else if (shift._id.pump === 'runner') {
                      newArr[1].counts.dayDrive = individualCount;
                    } else if (shift._id.pump === 'rescuepump') {
                      newArr[2].counts.dayDrive = individualCount;
                    } else if (shift._id.pump === 'salvage') {
                      newArr[3].counts.dayDrive = individualCount;
                    } else {
                      newArr[4].counts.dayDrive = individualCount;
                    }
                  } else {
                    if (shift._id.pump === 'flyer') {
                      newArr[0].counts.nightDrive = individualCount;
                    } else if (shift._id.pump === 'runner') {
                      newArr[1].counts.nightDrive = individualCount;
                    } else if (shift._id.pump === 'rescuepump') {
                      newArr[2].counts.nightDrive = individualCount;
                    } else if (shift._id.pump === 'salvage') {
                      newArr[3].counts.nightDrive = individualCount;
                    } else {
                      newArr[4].counts.nightDrive = individualCount;
                    }
                  }
                } else {
                  if (shift._id.shift === "day") {
                    if (shift._id.pump === 'flyer') {
                      newArr[0].counts.dayBack = individualCount;
                    } else if (shift._id.pump === 'runner') {
                      newArr[1].counts.dayBack = individualCount;
                    } else if (shift._id.pump === 'rescuepump') {
                      newArr[2].counts.dayBack = individualCount;
                    } else if (shift._id.pump === 'salvage') {
                      newArr[3].counts.dayBack = individualCount;
                    } else {
                      newArr[4].counts.dayBack = individualCount;
                    }
                  } else {
                    if (shift._id.pump === 'flyer') {
                      newArr[0].counts.nightBack = individualCount;
                    } else if (shift._id.pump === 'runner') {
                      newArr[1].counts.nightBack = individualCount;
                    } else if (shift._id.pump === 'rescuepump') {
                      newArr[2].counts.nightBack = individualCount;
                    } else if (shift._id.pump === 'salvage') {
                      newArr[3].counts.nightBack = individualCount;
                    } else {
                      newArr[4].counts.nightBack = individualCount;
                    }
                  }
                }
              }
              return newArr;
            });

          const promiseNightDuties = Nightduty.find({
            firefighter: firefighter._id
          })
            .populate("firefighter")
            .then(result => {
              return result;
            });

          return Promise.all([
            promiseShifts,
            promiseNightDuties
          ]).then(([shifts, nightduties]) => {
            return {
              ...firefighter._doc,
              shifts: shifts,
              nightduties: nightduties
            };
          });
        })
      );
    })
    .then(result => {
      let flyerDayDriveTotal = 0;
      let flyerDayBackTotal = 0;
      let flyerNightDriveTotal = 0;
      let flyerNightBackTotal = 0;

      let runnerDayDriveTotal = 0;
      let runnerDayBackTotal = 0;
      let runnerNightDriveTotal = 0;
      let runnerNightBackTotal = 0;

      let rescuepumpDayDriveTotal = 0;
      let rescuepumpDayBackTotal = 0;
      let rescuepumpNightDriveTotal = 0;
      let rescuepumpNightBackTotal = 0;

      let salvageDayDriveTotal = 0;
      let salvageDayBackTotal = 0;
      let salvageNightDriveTotal = 0;
      let salvageNightBackTotal = 0;

      let brontoDayDriveTotal = 0;
      let brontoDayBackTotal = 0;
      let brontoNightDriveTotal = 0;
      let brontoNightBackTotal = 0;

      for (const firefighter of result) {
        if (
          firefighter.rank !== "Station Officer" &&
          firefighter.name !== "dummy"
        ) {
          for (const shift of firefighter.shifts) {
            if (shift.pump === "rescuepump") {
              rescuepumpDayDriveTotal += shift.counts.dayDrive;
              rescuepumpDayBackTotal += shift.counts.dayBack;
              rescuepumpNightDriveTotal += shift.counts.nightDrive;
              rescuepumpNightBackTotal += shift.counts.nightBack;
            } else if (shift.pump === "salvage") {
              salvageDayDriveTotal += shift.counts.dayDrive;
              salvageDayBackTotal += shift.counts.dayBack;
              salvageNightDriveTotal += shift.counts.nightDrive;
              salvageNightBackTotal += shift.counts.nightBack;
            } else if (shift.pump === "bronto") {
              brontoDayDriveTotal += shift.counts.dayDrive;
              brontoDayBackTotal += shift.counts.dayBack;
              brontoNightDriveTotal += shift.counts.nightDrive;
              brontoNightBackTotal += shift.counts.nightBack;
            } else if (shift.pump === "runner") {
              runnerDayDriveTotal += shift.counts.dayDrive;
              runnerDayBackTotal += shift.counts.dayBack;
              runnerNightDriveTotal += shift.counts.nightDrive;
              runnerNightBackTotal += shift.counts.nightBack;
            } else {
              flyerDayDriveTotal += shift.counts.dayDrive;
              flyerDayBackTotal += shift.counts.dayBack;
              flyerNightDriveTotal += shift.counts.nightDrive;
              flyerNightBackTotal += shift.counts.nightBack;
            }
          }
        }
      }
      const flyerDayDriveAvg = flyerDayDriveTotal / result.length;
      const flyerDayBackAvg = flyerDayBackTotal / result.length;
      const flyerNightDriveAvg = flyerNightDriveTotal / result.length;
      const flyerNightBackAvg = flyerNightBackTotal / result.length;
      const runnerDayDriveAvg = runnerDayDriveTotal / result.length;
      const runnerDayBackAvg = runnerDayBackTotal / result.length;
      const runnerNightDriveAvg = runnerNightDriveTotal / result.length;
      const runnerNightBackAvg = runnerNightBackTotal / result.length;
      const rescuepumpDayDriveAvg = rescuepumpDayDriveTotal / result.length;
      const rescuepumpDayBackAvg = rescuepumpDayBackTotal / result.length;
      const rescuepumpNightDriveAvg = rescuepumpNightDriveTotal / result.length;
      const rescuepumpNightBackAvg = rescuepumpNightBackTotal / result.length;
      const salvageDayDriveAvg = salvageDayDriveTotal / result.length;
      const salvageDayBackAvg = salvageDayBackTotal / result.length;
      const salvageNightDriveAvg = salvageNightDriveTotal / result.length;
      const salvageNightBackAvg = salvageNightBackTotal / result.length;
      const brontoDayDriveAvg = brontoDayDriveTotal / result.length;
      const brontoDayBackAvg = brontoDayBackTotal / result.length;
      const brontoNightDriveAvg = brontoNightDriveTotal / result.length;
      const brontoNightBackAvg = brontoNightBackTotal / result.length;

      const averages = {
        flyer: {
          dayDrive: flyerDayDriveAvg,
          dayBack: flyerDayBackAvg,
          nightDrive: flyerNightDriveAvg,
          nightBack: flyerNightBackAvg
        },
        runner: {
          dayDrive: runnerDayDriveAvg,
          dayBack: runnerDayBackAvg,
          nightDrive: runnerNightDriveAvg,
          nightBack: runnerNightBackAvg
        },
        rescuepump: {
          dayDrive: rescuepumpDayDriveAvg,
          dayBack: rescuepumpDayBackAvg,
          nightDrive: rescuepumpNightDriveAvg,
          nightBack: rescuepumpNightBackAvg
        },
        salvage: {
          dayDrive: salvageDayDriveAvg,
          dayBack: salvageDayBackAvg,
          nightDrive: salvageNightDriveAvg,
          nightBack: salvageNightBackAvg
        },
        bronto: {
          dayDrive: brontoDayDriveAvg,
          dayBack: brontoDayBackAvg,
          nightDrive: brontoNightDriveAvg,
          nightBack: brontoNightBackAvg
        }
      };
      return {
        firefighters: result,
        averages: averages
      };
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// control post actions for nightduties
router.post("/nightduty", (req, res, next) => {
  console.log("received");
  req.checkBody("firefighter", "Firefighter must not be empty").notEmpty();
  req.checkBody("date", "Invalid date").notEmpty();
  req.checkBody("type", "type must not be empty").notEmpty();

  req.sanitize("firefighter").escape();
  req.sanitize("date").toDate();
  req.sanitize("type").escape();

  req.sanitize("firefighter").trim();
  req.sanitize("type").trim();

  const nightduty = new Nightduty({
    firefighter: req.body.firefighter,
    date: req.body.date,
    type: req.body.type
  });

  const errors = req.validationErrors();
  if (errors) {
    res.status(500).send(errors);
  } else {
    nightduty.save().then(() => {
      res.status(200);
    });
  }
});

module.exports = router;

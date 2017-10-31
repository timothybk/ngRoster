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

// Get all firefighters
router.get("/firefighters", (req, res) => {
  FireFighter.find()
    .populate("qualifications")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
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

// get all shifts
//Display ShiftInstance create form on GET
router.get("/shift-list", (req, res) => {
  FireFighter.find({})
    .populate("qualifications")
    .then(firefighters => {
      return Promise.all(
        firefighters.map(firefighter => {
          return ShiftInstance.aggregate()
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
            .group({ _id: { pump: "$pump.name" }, count: { $sum: 1 } })
            .sort("count")
            .then(result => {
              const res = {
                firefighter: firefighter,
                shifts: result
              };
              return res;
            });
        })
      );
    })
    .then(
      // transform firefighters into Angular model
      firefighters => {
        const transformedFirefighters = [];
        let totalFirefighters = 0;
        const averages = {
          flyer: 0,
          runner: 0,
          rescuepump: 0,
          salvage: 0,
          bronto: 0
        }
        for (const firefighter of firefighters) {
          let shiftCount = 0;
          totalFirefighters++;

          for (const shift of firefighter.shifts) {
            shiftCount += shift.count;
          }

          const newArr = [
            {
              pump: "flyer",
              count: 0
            },
            {
              pump: "runner",
              count: 0
            },
            {
              pump: "rescuepump",
              count: 0
            },
            {
              pump: "salvage",
              count: 0
            },
            {
              pump: "bronto",
              count: 0
            }
          ];

          for (const shift of firefighter.shifts) {
            const individualCount = shift.count / shiftCount * 100;
            switch (shift._id.pump) {
              case "flyer":
                newArr[0] = {
                  ...newArr[0],
                  count: individualCount
                };
                averages.flyer += shift.count;
                break;
              case "runner":
                newArr[1] = {
                  ...newArr[1],
                  count: individualCount
                };
                averages.runner += shift.count;
                break;
              case "rescuepump":
                newArr[2] = {
                  ...newArr[2],
                  count: individualCount
                };
                averages.rescuepump += shift.count;
                break;
              case "salvage":
                newArr[3] = {
                  ...newArr[3],
                  count: individualCount
                };
                averages.salvage += shift.count;
                break;
              case "bronto":
                newArr[4] = {
                  ...newArr[4],
                  count: individualCount
                };
                averages.bronto += shift.count;
                break;
              default:
                break;
            }
          }
          if (firefighter.firefighter.rank !== "Station Officer") {
            transformedFirefighters.push({
              firefighter: firefighter.firefighter,
              shifts: newArr
            });
          }
        }
        // const finishedAverages = {
        //   ...averages,
        //   flyer: flyer / totalFirefighters * 100,
        //   runner: runner / totalFirefighters * 100,
        //   rescuepump: rescuepump / totalFirefighters * 100,
        //   salvage: salvage / totalFirefighters * 100,
        //   bronto: bronto / totalFirefighters * 100
        // }
        // console.log(finishedAverages);
        res.status(200).json(transformedFirefighters);
      }
    )
    .catch(err => {
      res.status(500).send(err);
    });
});

// control get actions for nightduties
router.get("/nightduty", (req, res, next) => {
  FireFighter.find({})
    .then(firefighters => {
      return Promise.all(
        firefighters.map(firefighter => {
          return Nightduty.find({ firefighter: firefighter._id })
            .populate("firefighter")
            .then(result => {
              const res = {
                firefighter: firefighter,
                nightduties: result
              };
              return res;
            });
        })
      );
    })
    .then(result => {
      console.log(result);
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

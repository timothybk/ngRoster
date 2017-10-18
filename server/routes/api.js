const express = require('express');
const router = express.Router();
const FireFighter = require('./../models/firefighter');
const Qualification = require('./../models/qualification');
const Appliance = require('../models/appliance');
const ShiftInstance = require('../models/shiftinstance');

// // declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all firefighters
router.get('/firefighters', (req, res) => {
  FireFighter.find()
    .populate('qualifications')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// get all pumps
router.get('/pumps', (req, res) => {
  Appliance.find()
    .populate('qualifications')
    .then(
    result => {
      res.status(200).json(result);
    })
    .catch(
    err => {
      res.status(500).send(err);
    }
    )
});

// get all shifts
//Display ShiftInstance create form on GET
router.get('/shift-list', (req, res) => {
  FireFighter.find({})
    .populate('qualifications')
    .then((firefighters) => {
      return Promise.all(firefighters.map((firefighter) => {
        return ShiftInstance.aggregate()
          .match({ 'firefighter': firefighter._id })
          .lookup({ from: 'firefighters', localField: 'firefighter', foreignField: '_id', as: 'firefighter' })
          .unwind('$firefighter')
          .lookup({ from: 'appliances', localField: 'pump', foreignField: '_id', as: 'pump' })
          .unwind('$pump')
          .group({ _id: { pump: '$pump.name' }, count: { $sum: 1 } })
          .sort('count')
          .then(
          result => {
            const res = {
              firefighter: firefighter,
              shifts: result
            }
            return res;
          }
          )
      }
      )
      )
    }
    )
    .then(
      // transform firefighters into Angular model
      firefighters => {
        const transformedFirefighters = [];
        for (const firefighter of firefighters) {
          const flyer = {
            name: 'flyer',
            exists: false
          };
          const runner = {
            name: 'runner',
            exists: false
          };
          const rp = {
            name: 'rescuepump',
            exists: false
          };
          const salvage = {
            name: 'salvage',
            exists: false
          };
          const aerial = {
            name: 'bronto',
            exists: false
          };
          const newArr = [];
          let shiftCount = 0;
          for (const shift of firefighter.shifts) {
            switch (shift._id.pump) {
              case 'flyer':
                flyer.exists = true;
                newArr.push({
                  pump: 'flyer',
                  count: shift.count
                });
                shiftCount += shift.count;
                break;
              case 'runner':
                runner.exists = true;
                newArr.push({
                  pump: 'runner',
                  count: shift.count
                });
                shiftCount += shift.count;
                break;
              case 'rescuepump':
                rp.exists = true;
                newArr.push({
                  pump: 'rescuepump',
                  count: shift.count
                });
                shiftCount += shift.count;
                break;
              case 'salvage':
                salvage.exists = true;
                newArr.push({
                  pump: 'salvage',
                  count: shift.count
                });
                shiftCount += shift.count;
                break;
              case 'bronto':
                aerial.exists = true;
                newArr.push({
                  pump: 'bronto',
                  count: shift.count
                });
                shiftCount += shift.count;
                break;
              default:
                break;
            }
          }
          const pumpArr = [flyer, runner, rp, salvage, aerial];
          for (const pump of pumpArr) {
            if (!pump.exists) {
              newArr.push({
                pump: pump.name,
                count: 0
              });
            }
          }
          if (firefighter.firefighter.rank !== 'Station Officer') {
            transformedFirefighters.push({
              firefighter: firefighter.firefighter,
              shifts: newArr,
              totalShifts: shiftCount
            });
          }
        }
        res.status(200).json(transformedFirefighters);
      }
    )
    .catch(
      err => {
        res.status(500).send(err);
      }
    )
})


module.exports = router;

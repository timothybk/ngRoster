const express = require('express');
const router = express.Router();
const FireFighter = require('./../models/firefighter');
const Qualification = require('./../models/qualification');
const Appliance = require('../models/appliance');

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
// exports.shiftinstance_create_get = function (req, res, next) {
//   const firefighters = req.query.valid.split(',');
//   const promiseA = FireFighter.find({_id: firefighters})
//       .populate('qualifications')
//       .exec()

//   const promiseB = Appliance.find({})
//       .populate('qualifications')
//       .exec()

//   Promise.all([promiseA, promiseB])
//       .then(([firefighters, appliances]) => {
//           return Promise.all(firefighters.map((firefighter) => {
//               return ShiftInstance.aggregate()
//                   .match({ 'firefighter': firefighter._id })
//                   .lookup({ from: 'firefighters', localField: 'firefighter', foreignField: '_id', as: 'firefighter' })
//                   .unwind('$firefighter')
//                   .lookup({ from: 'appliances', localField: 'pump', foreignField: '_id', as: 'pump' })
//                   .unwind('$pump')
//                   .group({ _id: { pump: '$pump.name', md: '$md' }, count: { $sum: 1 } })
//                   .sort('count')
//                   .then(result => {
//                       const pumps = {};

//                       for (let pump of appliances) {
//                           pumps[pump.name] = {};
//                           const record = result.find(truck => {
//                               return truck._id.pump === pump.name && truck._id.md === false;
//                           })
//                           const recordMd = result.find(truck => {
//                               return truck._id.pump === pump.name && truck._id.md === true;
//                           })
//                           let nonMd;
//                           let md;
//                           if (record) {
//                               nonMd = record.count;
//                           } else {
//                               nonMd = 0;
//                           }

//                           if (recordMd) {
//                               md = recordMd.count
//                           } else {
//                               md = 0
//                           }
//                           pumps[pump.name].driver = md;
//                           pumps[pump.name].back = nonMd;

//                       }
//                       let sum = 0;
//                       for (var key in pumps) {
//                           for (var pos in key) {
//                               if (key.hasOwnProperty(pos)) {
//                                   sum += key[pos];

//                               }
//                           }
//                       }
//                       pumps.total = sum;
//                       pumps.avg = Math.round(pumps.total / appliances.length);
//                       return pumps;
//                   })
//           }))
//               .then(result => {
//                   const pumpObj = {};

//                   for (let pump of appliances) {
//                       const ffBackMain = [];
//                       const ffBackSecond = [];
//                       const ffDriverMain = [];
//                       const ffDriverSecond = [];
//                       const pumpQual = [];
//                       // set Appliance.name as a key in pumpObj;
//                       pumpObj[pump.name] = {};
//                       // set 'appliance' as key, Appliance as value
//                       pumpObj[pump.name].appliance = pump;
//                       // populate pumpQual with pump qualification names
//                       if (pump.qualifications.length > 0) {
//                           for (let qual of pump.qualifications) {
//                               pumpQual.push(qual.name);
//                           }
//                       }
//                       for (var i = 0; i < result.length; i++) {
//                           const ffQual = [];
//                           if (firefighters[i].qualifications.length > 0) {
//                               for (let qual of firefighters[i].qualifications) {
//                                   ffQual.push(qual.name);
//                               }
//                           }
//                           // remove station officers and push [FireFighter Object, count for this pump] to array

//                           switch (true) {
//                               case firefighters[i].rank === 'Station Officer':
//                                   break;
//                               case firefighters[i].name === 'dummy':
//                                   ffBackSecond.push([firefighters[i], result[i][pump.name].back]);
//                                   ffDriverSecond.push([firefighters[i], result[i][pump.name].driver]);
//                                   break;
//                               case pumpQual.length > 0 && pumpQual.some(v => ffQual.includes(v)):
//                                   ffBackMain.push([firefighters[i], result[i][pump.name].back]);
//                                   ffDriverMain.push([firefighters[i], result[i][pump.name].driver]);
//                                   break;
//                               case pumpQual.length > 0 && ffQual.includes('md') && pump.name === 'rescuepump':
//                                   ffDriverMain.push([firefighters[i], result[i][pump.name].driver]);
//                                   ffBackSecond.push([firefighters[i], result[i][pump.name].back])
//                                   break;
//                               case pumpQual.length > 0:
//                                   ffDriverSecond.push([firefighters[i], result[i][pump.name].driver]);
//                                   ffBackSecond.push([firefighters[i], result[i][pump.name].back]);
//                                   break;
//                               case pumpQual.length <= 0 && ffQual.includes('md'):
//                                   ffBackMain.push([firefighters[i], result[i][pump.name].back]);
//                                   ffDriverMain.push([firefighters[i], result[i][pump.name].driver]);
//                                   break;
//                               default:
//                                   ffBackMain.push([firefighters[i], result[i][pump.name].back]);
//                                   ffDriverSecond.push([firefighters[i], result[i][pump.name].driver])
//                                   break;
//                           }
//                       }
//                       // sort array of [Firefighter Object, count] (ascending)
//                       ffBackMain.sort((a, b) => {
//                           return a[1] - b[1];
//                       })
//                       ffBackSecond.sort((a, b) => {
//                           return a[1] - b[1];
//                       })
//                       ffDriverMain.sort((a, b) => {
//                           return a[1] - b[1];
//                       })
//                       ffDriverSecond.sort((a, b) => {
//                           return a[1] - b[1];
//                       })
//                       for (var i = 0; i < pump.seats.length; i++) {
//                           ffBackMain[i]['selected' + (i + 1)] = true;
//                       }
//                       // set 'results' as key and array of [Firefighter Object, count] as value
//                       pumpObj[pump.name].backMain = ffBackMain;
//                       pumpObj[pump.name].backSecond = ffBackSecond;
//                       pumpObj[pump.name].driverMain = ffDriverMain;
//                       pumpObj[pump.name].driverSecond = ffDriverSecond;


//                   }

//                   return pumpObj;
//               })
//       })
//       .then(result => {
//           res.render('shiftinstance_form', {
//               title: 'shift form',
//               results: result
//           })
//       })
//       .catch(err => {
//           return next(err);
//       })



// }

module.exports = router;

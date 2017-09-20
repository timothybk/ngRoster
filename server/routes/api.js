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
  ShiftInstance.find()
  .populate('firefighter')
  .populate('pump')
  .sort('-date')
  .then(result => {
    res.status(200).json(result);
  })
  .catch(
    err => {
      res.status(500).send(err);
    }
  )
})


module.exports = router;

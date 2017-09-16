const express = require('express');
const router = express.Router();
const FireFighter = require('./../models/firefighter')
const Qualification = require('./../models/qualification')

// // declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
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

module.exports = router;

const express = require("express"),
      router  = express.Router(),
      User    = require('../models/user');
      bcrypt  = require('bcryptjs');

// handle signup
router.post('/register', (req, res, next) => {
  const user = new User({
    password: bcrypt.hashSync(req.body.password, 10),
    username: req.body.username
  });
  user.save()
    .then(user => {
      console.log(user)
      res.status(201).json({
        message: 'user created',
        obj: user
    });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        title: "error occured",
        error: err
      })
    })
});

// router.post('/signin', (req, res, next) => {
//   User.findOne({username: req.body.username});
// })

module.exports = router;

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
  user.save((err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).json({
        title: "error occured",
        error: err
      });
    }
    console.log(result)
    res.status(201).json({
      message: 'user created',
      obj: result
    });

  })
});

module.exports = router;

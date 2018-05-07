const express = require("express"),
      router  = express.Router(),
      User    = require('../models/user'),
      bcrypt  = require('bcryptjs');
      jwt     = require('jsonwebtoken');

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

router.post('/signin', (req, res, next) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if(!user) {
        return res.status(401).json({
          title: 'Login failed',
          error: {message: 'Invalid login'}
        });
      };
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          title: 'Login failed',
          error: {message: 'Invalid login'}
        });
      };
      const token = jwt.sign({user: user}, 'Pia is the cutest!', {expiresIn: 7200});
      res.status(200).json({
        message: 'Successfully loged in',
        token: token,
        userId: user._id
      })

    })
    .catch(err => {
      return res.status(500).json({
        title: 'error occured',
        error: err
      })
    })
})

module.exports = router;

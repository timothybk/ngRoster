const express = require("express"),
      router  = express.Router(),
      User    = require('./models/user');

// handle signup
app.post('/register', function(req, res) {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
      if (err) {
          console.log(err);
      }
      passport.authenticate('local')(req, res, function () {
          console.log('success')
      })
  })
});

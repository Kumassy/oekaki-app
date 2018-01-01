var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // models.User.findAll({
  //   include: [ models.Account ]
  // }).then(function(users) {
  models.User.findAll().then(function(users) {
    res.json({
      users
    });
  });
});

module.exports = router;

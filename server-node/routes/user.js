var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user == null) {
    res.status(200).json({
      user: null
    })
    return;
  }
  models.User.findOne({
    where: {id: req.user.id}
  }).then(user => {
    res.json({
      user
    });
  });
});

module.exports = router;

var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // TODO: fix query
  models.Post.findAll({attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'], include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]}).then(posts => {
    res.json({
      posts
    });
  });
});

module.exports = router;

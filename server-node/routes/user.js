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
    where: {id: req.user.id},
    attributes: ['id', 'username', 'avatar', 'createdAt', 'updatedAt', [models.sequelize.fn('COUNT', models.sequelize.col('posts.id')), 'postsCount'], [models.sequelize.fn('COUNT', models.sequelize.col('comments.id')), 'commentsCount']],
    include: [{
      model: models.Post,
      as: 'posts',
      attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
    }, {model: models.Comment, as: 'comments'}],
    group: 'id'
  }).then(user => {
    res.json({
      user
    });
  });
});

module.exports = router;

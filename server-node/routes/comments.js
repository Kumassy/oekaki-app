var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET comments listing. */
router.get('/', function(req, res, next) {
  models.Comment.findAll({attributes: ['id', 'threadId', 'message', 'createdAt', 'updatedAt'], include: [{model: models.User, as: 'user'}]}).then(comments => {
    res.json({
      comments
    });
  });
});

router.get('/:comment_id', function(req, res, next) {
  models.Comment
    .findOne({
      where: {id: req.params.comment_id},
      attributes: ['id', 'threadId', 'message', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}]
    })
    .then(comment => {
      res.json({
        comment
      });
    });
});

router.post('/', function(req, res, next) {
  if (req.user == null) {
    res.status(401).json({
      error: {
        type: 'SIGNIN_REQUIRED',
        message: 'コメントを投稿するにはログインが必要です'
      }
    })
    return;
  }
  Promise.resolve()
    .then(() => {
      console.log(req.body);
      return models.Comment.create({
        userId: req.user.id,
        threadId: req.body.thread_id,
        message: req.body.message
      })
    })
    .then(comment => {
      return models.Comment.findOne({
        where: {id: comment.id},
        attributes: ['id', 'threadId', 'message', 'createdAt', 'updatedAt'],
        include: [{model: models.User, as: 'user'}]
      })
    })
    .then(comment => {
      res.status(201).json({
        comment
      });
    });
});

// models.User.create({
// //     username: req.body.username
// //   }).then(function() {
// //     res.redirect('/');
// //   });

module.exports = router;

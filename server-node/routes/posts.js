var models  = require('../models');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Post.findAll({attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'], include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]}).then(posts => {
    res.json({
      posts
    });
  });
});

router.get('/:post_id', function(req, res, next) {
  models.Post
    .findOne({
      where: {id: req.params.post_id},
      attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
    })
    .then(post => {
      res.json({
        post
      });
    });
});

router.post('/', function(req, res, next) {
  if (req.user == null) {
    res.status(401).json({
      error: {
        type: 'SIGNIN_REQUIRED',
        message: '画像を投稿するにはログインが必要です'
      }
    })
    return;
  }
  Promise.resolve()
    .then(() => {
      return new Promise(function(resolve, reject) {
        const data = new Buffer(req.body.image, 'base64');
        const filename = `${uuidv4()}.png`;

        fs.writeFile(path.resolve('images', filename), data, function(err) {
          if (err) reject(err);
          else resolve(filename);
        });
      });
    })
    .then(filename => {
      return models.Image.create({
        name: filename
      });
    })
    .then(image => {
      return models.Post.create({
        userId: req.user.id,
        threadId: req.body.thread_id,
        imageId: image.id,
        caption: req.body.caption
      })
    })
    .then(post => {
      return models.Post.findOne({
        where: {id: post.id},
        attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
        include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
      })
    })
    .then(post => {
      res.status(201).json({
        post
      });
    });
});

// models.User.create({
// //     username: req.body.username
// //   }).then(function() {
// //     res.redirect('/');
// //   });

module.exports = router;

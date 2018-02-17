var models  = require('../models');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

/* GET threads listing. */
router.get('/', function(req, res, next) {
  models.Thread.findAll({
    include: [{
      model: models.Post,
      as: 'posts',
      attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
    },{
      model: models.Comment,
      as: 'comments',
      attributes: ['id', 'threadId', 'message', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}]
    }]
  })
  .then(threads => {
    res.json({
      threads
    });
  });
});

router.get('/:thread_id', function(req, res, next) {
  models.Thread.findOne({
    where: {id: req.params.thread_id},
    include: [{
      model: models.Post,
      as: 'posts',
      attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
    },{
      model: models.Comment,
      as: 'comments',
      attributes: ['id', 'threadId', 'message', 'createdAt', 'updatedAt'],
      include: [{model: models.User, as: 'user'}]
    }]
  }).then(thread => {
    res.json({
      thread
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
      return Promise.all([
        models.Image.create({
          name: filename
        }),
        models.Thread.create({
          isOpen: true
        })]);
    })
    .then(values => {
      const [image, thread] = values;
      return models.Post.create({
        userId: req.user.id,
        threadId: thread.id,
        imageId: image.id,
        caption: req.body.caption
      })
    })
    .then(post => {
      return models.Thread.findOne({
        where: {id: post.threadId},
        include: [{
          model: models.Post,
          as: 'posts',
          attributes: ['id', 'caption', 'threadId', 'createdAt', 'updatedAt'],
          include: [{model: models.User, as: 'user'}, {model: models.Image, as: 'image'}]
        }]
      })
    })
    .then(thread => {
      res.status(201).json({
        thread
      });
    });
});


module.exports = router;

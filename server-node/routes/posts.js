var models  = require('../models');
var express = require('express');
var router = express.Router();
const fs = require('fs');

const path = require('path');
const uuidv4 = require('uuid/v4');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Post.findAll().then(posts => {
    res.json({
      posts
    });
  });
});

router.get('/:post_id', function(req, res, next) {
  models.Post.findById(req.params.post_id).then(post => {
    res.json({
      post
    });
  });
});

router.post('/', function(req, res, next) {
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
      models.Post.create({
        UserId: req.user.id,
        ThreadId: req.body.thread_id,
        ImageId: image.id,
        caption: req.body.caption
      }).then(post => {
        res.json({
          post
        });
      });
    });
});

// models.User.create({
// //     username: req.body.username
// //   }).then(function() {
// //     res.redirect('/');
// //   });

module.exports = router;

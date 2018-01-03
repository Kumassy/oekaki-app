var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(users => {
    res.json({
      users
    });
  });
});

router.get('/:user_id', function(req, res, next) {
  models.User.findById(req.params.user_id).then(user => {
    res.json({
      user
    });
  });
});

// router.post('/create', function(req, res) {
//   models.User.create({
//     username: req.body.username
//   }).then(function() {
//     res.redirect('/');
//   });
// });
//
// router.get('/:user_id/destroy', function(req, res) {
//   models.User.destroy({
//     where: {
//       id: req.params.user_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

// router.post('/:user_id/tasks/create', function (req, res) {
//   models.Task.create({
//     title: req.body.title,
//     UserId: req.params.user_id
//   }).then(function() {
//     res.redirect('/');
//   });
// });
//
// router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
//   models.Task.destroy({
//     where: {
//       id: req.params.task_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

module.exports = router;

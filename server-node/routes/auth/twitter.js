const models  = require('../../models');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/',
  passport.authenticate('twitter'));
router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;

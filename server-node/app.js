const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const HOST = 'http://localhost:3000'

const express = require('express');
const session = require('express-session')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

const models = require('./models');

const index = require('./routes/index');
const users = require('./routes/users');
const authTwitter = require('./routes/auth/twitter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'kumassecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  models.User
    .findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});
// twitter
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: `${HOST}/auth/twitter/callback`
  }, (token, tokenSecret, profile, done) => {
    models.User
      .create({ username: profile.displayName })
      .then(user => {
        return models.Account.create({
          UserId: user.get('id'),
          provider: 'twitter',
          uid: profile.id,
          token,
          tokenSecret
        })
      })
      .then(account => {
        return done(null, account.user);
      })
      .catch(err => {
        done(err);
      });
    // return done(null, profile);
}));

app.use('/', index);
app.use('/users', users);
app.use('/auth/twitter', authTwitter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

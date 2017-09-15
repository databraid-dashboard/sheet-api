const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
// const GoogleStrategy = require('passport-google-oauth20');

// import GoogleStrategy from 'passport-google-oauth20';

// const graphqlHTTP = require('express-graphql');
// const root = require('./src/resolvers/RootResolver');
// const schema = require('./src/schema/schema');
const cookieParser = require('cookie-parser')
const partials = require('express-partials');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_SECRET;
const CALLBACK_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

app.use('/', partials());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

// app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send('aok');
});
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

passport.use( new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:8003/auth/sheets/callback",
    passReqToCallback: true
    // callbackURL: `${CALLBACK_URL}/auth/sheets/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("inside strategy");
    process.env.REACT_APP_TKN = accessToken;
    process.env.REACT_APP_PROFILE_ID = profile.id;
    // User.findOrCreate({ googleId: profile.id }, myLogger, function (err, user) {
    //   return cb(err, user);
    // });

    process.nextTick(() =>
      cb(null, profile),
    );
  }
));
var myLogger = function (req, res, next) {
  console.log('LOGGED', GOOGLE_CLIENT_ID,)
  next();
}

// NOTE read only scope is diff format https://www.googleapis.com/auth/spreadsheets.readonly

app.get('/auth/sheets',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/spreadsheets.readonly' }) );
// http://localhost:8003/auth/sheets/callback

app.get('/auth/sheets/callback',
  passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
}),
  function(req, res) {
    console.log('made it to second oauth step');
    // Successful authentication, redirect home.
    res.cookie('sheetsAccessToken', process.env.TKN);
    res.cookie('userName', process.env.PROFILE_ID);
    res.redirect('http://localhost:3000/');
  });

app.use((req, res) => {
  res.sendStatus(404);
});
// function logStep(req, res, next) {
//   console.log(new Date(), 'method-->', req.method, next().toString());
//   next();
// }
app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Express server listening on port ${PORT}`);
});

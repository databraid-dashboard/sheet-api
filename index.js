const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const root = require('./src/resolvers/RootResolver');
const schema = require('./src/schema');
const partials = require('express-partials');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_SHEETS_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SHEETS_CLIENT_SECRET;
/* eslint-disable no-unused-vars */
// NOTE these variables will be used once the OAuth strategy begins, not before
const CALLBACK_URL = process.env.GOOGLE_SHEETS_URL;
const PROFILE_ID = process.env.GOOGLE_SHEETS_PROFILE_ID;

app.use('/', partials());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send('aok');
});
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8003/auth/google/callback',

},
  ((accessToken, refreshToken, profile, done) => {
    process.env.TKN = accessToken;
    process.env.PROFILE_ID = profile.id;
    process.env.USERNAME = profile.displayName;

    done(null, profile);
  }),
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/spreadsheets.readonly'] }));

app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.cookie('userName', process.env.USERNAME);
    res.cookie('profileID', process.env.PROFILE_ID);
    res.redirect(process.env.FRONT_END_BASE_URL);
  });

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }),
  );

app.use('/', (req, res) => {
  res.sendStatus(200);
});
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Express server listening on port ${PORT}`);
});

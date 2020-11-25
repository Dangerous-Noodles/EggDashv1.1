//express, ejs
const express = require('express');
const authRouters = require('./routes/auth_routes');
const profileRoutes = require
const passportSetup = require('./config/passport_setup'); // <-- tutorial 8
//import PostgreSQL
const { cookieKey } = require('./config/keys').session;//these three should import to db.js
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();

/*
npm install passport passport-google-oauth20 <-- run in terminal for dependencies
*/
app.set('view engine', 'ejs'); // <-- will be handled with our react components

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create home route
app.get('/', (req, res)) // home route

//connect to PostgreSQL!!
//db.connect(keys.dbkeysssss, () => {
//  console.log('connected to DB')
//})

//set up routes to handle with auth router
app.use('/auth', authRouters);
app.use('/profile', profileRoutes);

app.get('/auth/google')

app.listen(3000, () => {
  console.log('app listening on port 3000');
})
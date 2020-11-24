//express, ejs
const express = require('express');
const app = express();
const authRouters = require('./routes/auth_routes');
const passportSetup = require('./config/passport_setup'); // <-- tutorial 8
//import PostgreSQL
/*
npm install passport passport-google-oauth20 <-- run in terminal for dependencies
*/
app.set('view engine', 'ejs'); // <-- will be handled with our react components

//create home route
app.get('/', (req, res)) // home route

//connect to PostgreSQL!!
//db.connect(keys.dbkeysssss, () => {
//  console.log('connected to DB')
//})

//set up routes to handle with auth router
app.use('/auth', authRouters);

app.get('/auth/google')

app.listen(3000, () => {
  console.log('app listening on port 3000');
})
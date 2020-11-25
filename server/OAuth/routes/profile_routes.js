const router = require('express').Router();

const authCheck = (req, res, next) => { // fires before sending response, checks for user being logged in 
  if (!req.user) {
    //if user is not logged in
    res.redirect('/login');
  } else {
    //if logged in
    next();
  }

}


router.get('/', authCheck, (req, res) => {
  res.send('this is the users market profile' + req.user);
    //build a route in app.js
})

module.exports = router;
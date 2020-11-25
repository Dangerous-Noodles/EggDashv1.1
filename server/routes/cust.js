const express = require('express');
const passport = require('passport');
const router = express.Router();
const passportSetup = require('../OAuth/config/passport_setup');

const custController = require('../controllers/custController');
const cookieController = require('../controllers/cookieController');
// const cartController = require('../controllers/cartController');

// customer signs up
router.post('/signup', custController.createUser, (req, res) => {
  console.log('sign up worked, entered middleware');
  res.status(200).json('the sign up fucking worked!');
});

// customer signs in and cart loads 'get' request
router.post('/login', custController.verifyCust, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals);
});

// router.post('/google', custController.oAuth, (req, res) => {
//   res.status(200).json(res.locals);
// });

// customer deletes their login (Stretch feature)
// router.delete('/', custController.deleteUser, (req, res) => {});
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // console.log('This is res.locals', res.locals.isVerified);
  // res.locals.isVerified = true;
  // console.log('this is profile --> ', req.user);
  res.cookie('success', true);
  res.redirect('/'); //<-- 
});
// // user modifies quantity in cart - 'put' request
// router.put('/', custController.updateCustInfo, (req, res) => {});

module.exports = router;

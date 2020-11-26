const express = require('express');
const passport = require('passport');
const router = express.Router();
const passportSetup = require('../OAuth/config/passport_setup');
const db = require('../../db/db');
const custController = require('../controllers/custController');
const cookieController = require('../controllers/cookieController');
const { Pool } = require('pg');
// const cartController = require('../controllers/cartController');

// customer signs up
router.post('/signup', custController.createUser, (req, res) => {
  console.log('sign up worked, entered middleware');
  res.status(200).json('the sign up fucking worked!');
});

// customer signs in and cart loads 'get' request
router.post(
  '/login',
  custController.verifyCust,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

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
// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile'],
//   })
// );
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.send('you reached the callback URI');
// });
// // user modifies quantity in cart - 'put' request
// router.put('/', custController.updateCustInfo, (req, res) => {});
router.post('/successBuy', (req, res) => {
  console.log('in the successBuybody');
  let productInfo = [];
  // const userId;
  const { paymentID } = req.body.payment;
  const { paymentToken } = req.body.payment;
  const { email } = req.body.payment;
  req.body.cartDetail.forEach((item) => {
    productInfo.push({
      dateOfPurchase: Date.now(),
      name: item[1],
      id: item[0],
      price: item[2],
      quantity: item[3],
    });
  });
  productInfo = JSON.stringify(productInfo);
  console.log(productInfo);
  // Todo: how we can idenitfy the user
  const text1 =
    'INSERT INTO payment("paymentID", "paymentToken", "email", "products") VALUES($1, $2,$3, $4) RETURNING *';
  const values = [paymentID, paymentToken, email, productInfo];
  db.query(text1, values, (err, res) => {
    console.log(err, res);
    console.log('put payment info into the database', res.rows[0]);
  });
  console.log('whats in the req', req.body.cartDetail);
  console.log('whats in the user id', req.user);
  console.log('whats in the payment', req.body.payment);
  res.json(req.body);
});
module.exports = router;

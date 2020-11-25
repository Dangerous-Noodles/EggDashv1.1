const express = require('express');
const path = require('path');
const custRouter = require('./routes/cust');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const cors = require('cors');
const { cookieKey } = require('../server/OAuth/config/keys').session;
const authRouters = require('../server/OAuth/routes/auth_routes');
const passportSetUp = require('./OAuth/config/passport_setup');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const port = 3000;
app.use(cors());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouters);
// router for customer logins
app.use('/cust', custRouter);

// router to access products
app.use('/products', productsRouter);

// router for shopping cart
app.use('/cart', cartRouter);

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log:
      'Express error handler caught unknown middleware error (default error handler)',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

module.exports = app;

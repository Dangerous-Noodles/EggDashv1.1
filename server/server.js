const express = require('express');
const path = require('path');

const app = express();

const custRouter = require('./routes/cust');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const port = 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    log: 'Express error handler caught unknown middleware error',
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

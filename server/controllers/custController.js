const db = require('../../db/db.js');

const custController = {};

// new customer signs up
custController.createUser = (req, res, next) => {
  // const { email, password } = req.body;
  const {
    first_name,
    last_name,
    email,
    password,
    address_number,
    address_street,
    address_zip,
    type,
  } = req.body;

  console.log('this is the req.body for createUser:', req.body);
  // const signUp = `SELECT * FROM customers WHERE email='${email}'`;
  const signUp = `INSERT INTO customers (first_name, last_name, email, password, address_number, address_street, address_zip)
  VALUES ($1, $2, $3, $4, $5, $6, $7 )`;
  const signUpValues = [
    first_name,
    last_name,
    email,
    password,
    address_number,
    address_street,
    address_zip,
  ];
  db.query(signUp, signUpValues)
    .then((data) => {
      console.log(
        'this is the data we get once we insert a user into the DB ',
        data.rows
      );
    })
    .then(next)
    .catch(() => {
      // next(err)
      next({
        log: `custController.createUser: ERROR: Error creating new user.`,
        message: {
          err:
            'Error occurred in custController.createUser. Check server logs for more details.',
        },
      });
    });
};

// customer signs in and cart loads 'get' request
custController.verifyCust = (req, res, next) => {
  const { email, password } = req.body;
  console.log('this is the request body: ', req.body);
  const allCusts = `SELECT * FROM customers WHERE email=$1`;
  const allCustValue = [email];
  db.query(allCusts, allCustValue)
    .then((data) => {
      // console.log('this is the data from the customer ', data);
      if (data.rows[0].password === password) {
        res.locals.isVerified = true;
        res.locals.custInfo = data.rows;
        // console.log('this is res.locals with stuff inside', res.locals);
      } else {
        res.locals.isVerified = false;
      }
    })
    .then(next)
    .catch(() => {
      // next(err)
      next({
        log: `custController.verifyCust: ERROR: Error getting the customer's information from the database.`,
        message: {
          err:
            'Error occurred in custController.verifyCust. Check server logs for more details.',
        },
      });
    });
};

module.exports = custController;

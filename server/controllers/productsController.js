const db = require('../../db/db.js');

const productsController = {};

productsController.getAllProducts = (req, res, next) => {
  const getProducts = `SELECT * FROM products`;

  db.query(getProducts)
    .then((data) => {
      console.log('this is the data from the products table ', data.rows);
      res.locals.products = data.rows;
    })
    .then(next)
    .catch(() => {
      // next(err)
      next({
        log: `productsController.createUser: ERROR: Error pulling data from the DB.`,
        message: {
          err:
            'Error occurred in productController.getAllProducts. Check server logs for more details.',
        },
      });
    });
};

productsController.decrementProducts = (req, res, next) => {
  const decProducts = `UPDATE products SET quantity = $2 WHERE products.name = $1`;
  const values = [req.body[0], req.body[1]];
  console.log(
    'This hit the decrementProducts controller',
    req.body[0],
    req.body[1]
  );
  db.query(decProducts, values)
    .then((data) => {
      res.locals.products = data.rows;
    })
    .then(next)
    .catch(() => {
      next({
        log: `productsController.decrementProducts: ERROR: Error decrementing purchase quantity from the DB.`,
        message: {
          err:
            'Error occurred in productController.decrementProducts. Check server logs for more details.',
        },
      });
    });
};

module.exports = productsController;

const db = require('../../db/db.js');

const cartController = {};

// user signs in and cart loads 'get' request
cartController.getProductsUserCart = (req, res, next) => {
  // console.log(req.params, 'req.params');
  const { email } = req.params;
  const userCartQuery = `
SELECT *
FROM (SELECT c.product_id AS productId, c.id AS cartId, c.customer_id AS custId, 
 p.name, p.description, p.pictureurl, p.type, p.price, p.farm_id
FROM cart AS c
LEFT OUTER JOIN products AS p
ON c.product_id = p.id) AS i
LEFT JOIN customers AS cust
ON i.custid = cust.id
WHERE cust.email = $1;
  `;
  const userCartValue = [email];

  db.query(userCartQuery, userCartValue)
    .then((data) => {
      console.log(`this is the data from the user's CART: `, data.rows);
      res.locals.userCart = data.rows;
    })
    .then(next)
    .catch(() => {
      // next(err)
      next({
        log: `cartController.getProductsUserCart: ERROR: Error getting the user's cart from database`,
        message: {
          err:
            'Error occurred in cartController.getProductsUserCart. Check server logs for more details.',
        },
      });
    });
};

// user adds item to cart = 'post' request
cartController.addProductsUserCart = (req, res, next) => {
  const { customer_id, product_id, quantity } = req.body;

  const addCart = `INSERT INTO cart (customer_id, product_id, quantity) VALUES ($1,$2,$3)`;
  const cartValues = [customer_id, product_id, quantity];
  db.query(addCart, cartValues)
    .then((data) => {
      // console.log(`this is the data from the user's CART: `, data.rows);
      res.locals.userCart = data.rows;
    })
    .then(next)
    .catch(() => {
      // next(err)
      next({
        log: `cartController.getProductsUserCart: ERROR: Error putting the user's cart in the database`,
        message: {
          err:
            'Error occurred in cartController.getProductsUserCart. Check server logs for more details.',
        },
      });
    });
};

// user adds item to cart - 'post' request
// cartController.addProductsUserCart = (req, res, next) => {
//   const arr = req.body;
//   // const { customer_id, product_id, quantity } = req.body;
//   // we will get an array of objects with multiple rows that will need to be added
//   // declare a const that is
//   let addCart = '';

//   for (let i = 0; i < arr.length; i++) {
//     const custId = arr[i].customer_id;
//     const prodId = arr[i].product_id;
//     const quant = arr[i].quantity;
//     // console.log(
//     //   'customer id: ',
//     //   custId,
//     //   'product id: ',
//     //   prodId,
//     //   'quantity:',
//     //   quant
//     // );

//     let str =
//       "(nextval('cart_sequence')" +
//       ',' +
//       `${custId}` +
//       ',' +
//       `${prodId}` +
//       ',' +
//       `${quant}` +
//       '),';
//     // console.log('this is the concatenated string', str);
//     addCart = addCart + str;
//     // console.log('this is our addCart query after concat:', addCart);
//   }
//   let oldDbQuery = `INSERT INTO cart (id, customer_id, product_id, quantity) VALUES `;

//   let newDB = oldDbQuery + addCart;
//   // console.log(newDB, 'newDB');
//   let lengthSlice = newDB.length - 1;
//   // console.log(lengthSlice, 'lengthSlice');
//   let newDbQuery = newDB.slice(0, lengthSlice);
//   // console.log(newDbQuery, 'newDbQuery');
//   // console.log('this is the new DB query, pls work! ', newDbQuery);

//   db.query(newDbQuery)
//     .then((data) => {
//       // console.log(`this is the data from the user's CART: `, data.rows);
//       res.locals.userCart = data.rows;
//     })
//     .then(next)
//     .catch(() => {
//       // next(err)
//       next({
//         log: `cartController.getProductsUserCart: ERROR: Error putting the user's cart in the database`,
//         message: {
//           err:
//             'Error occurred in cartController.getProductsUserCart. Check server logs for more details.',
//         },
//       });
//     });
// };

// user deletes item from cart - 'delete' request
cartController.deleteProductsUserCart = (req, res, next) => {};

// user modifies quantity in cart - 'put' request
cartController.updateItemUserCart = (req, res, next) => {};

module.exports = cartController;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys'); // secret keys/secrets
/*
to secure keys and secrets :: import from keys.js
*/
const db = require('../../../db/db');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('this is id --> ', id);
    const text = `SELECT * FROM customers WHERE "accessToken"='${id}'`; //maybe should be customers.id instead of customers.accessToken?
    const { rows } = await db.query(text);
    const user = rows;
    console.log(user);
    return done(null, user);
  } catch (error) {
    console.log('error in deserialize user', error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      //options for google strategy
      //to get google secrets --> to console.developers.google.com and create project, enable API and enable Google+, create credentials (specify API) calling from web swerver with node, user data, (http://localhost:8080) for both oirgins and redirects, create ID, gives us client ID and secret
      callbackURL: '/cust/google/redirect', // <-- make sure this route is correct via google API directions auth/google/redirect
      clientID: keys.google.clientID, //'string from API',
      clientSecret: keys.google.clientSecret, //'string from API'
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const isUser = `select exists(select * from customers where "accessToken" = '${profile.id}')`;
        const addNewUser = `INSERT INTO customers(email, "accessToken") VALUES ('${profile.emails[0].value}', '${profile.id}')`;
        const findUser = `SELECT * FROM customers WHERE email = '${profile.emails[0].value}'`;

        console.log('successful first query --> ', profile.emails[0].value);

        const response = await db.query(isUser);
        if (!response.rows[0].exists) await db.query(addNewUser);
        return done(null, profile); //
      } catch (e) {
        console.log('error in googlestrategy passport', e);
      }
    }
  )
);

//query to retrieve their cart
// await db.query(findUser);
//`SELECT * FROM customers WHERE email='${email}'`
// console.log('here is the cart -->', cart);

//response.locals.custInfo = cart.rows
// .then((cart) => console.log(cart));
//res.locals.profile = profile

/*
    (accessToken, refreshToken, profile, done) => {
    //aToken gets access to user info
    //rToken refreshes access Token
    //profile is the information that passport brings back from google
    //done is called when function is finished
    //passport callback function 
      console.log('passport callback function fired: ', profile);
      //use profile info to add or login user 
  }));

/* async (request, accessToken, refreshToken, profile, done) => {
    try {
      const text1 = `select exists(select * from users where users.accesstoken = '${profile.id}')`;
      const text2 = `INSERT INTO users(email, accesstoken) VALUES ('${profile.email}', '${profile.id}')`;
      const response = await db.query(text1);
      if (!response.rows[0].exists) await db.query(text2);
      return done(null, profile);
    } catch (e) {
      console.log(e);
    }
  }
)
);
*/

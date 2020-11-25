
const router = require('express').Router();
const passport = require('passport');


//auth login
router.get('/login', (req, res) => {
  res.render('login'); // <-- this should be a react component probably with a google button
                      // react router with links for each oauth? 
});

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send('logging out')
})

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile'] // <-- check API for options
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the callback URI')
});

module.exports = router;
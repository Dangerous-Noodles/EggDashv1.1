// const db = require('../-->enterDB link here');

const cookieController = {

};

cookieController.setCookie = (req, res, next) => {
  res.cookie('success', true);
  return next();
}
module.exports = cookieController;

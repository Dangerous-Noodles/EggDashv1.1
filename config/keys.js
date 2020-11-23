// set up twitter consumer api
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: 'SOME KEY',
  TWITTER_CONSUMER_SECRET: 'SOME SECRET',
  TWITTER_ACCESS_TOKEN: 'SOME ACCESS TOKEN',
  TWITTER_TOKEN_SECRET: 'SOME TOKEN SECRET',
};

// set up the database
const DB_USER = 'SOME USER';
const DB_PASSWORD = 'SOME PASSWPORD';
const MONGODB = {
  MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`,
};

const SESSION = {
  COOKIE_KEY: 'thisappisawesome',
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;

// set up twitter consumer api
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: 'SOME KEY',
  TWITTER_CONSUMER_SECRET: 'SOME SECRET',
  TWITTER_ACCESS_TOKEN: 'SOME ACCESS TOKEN',
  TWITTER_TOKEN_SECRET: 'SOME TOKEN SECRET',
};

// set up the database

const SESSION = {
  COOKIE_KEY: 'thisappisawesome',
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...MONGODB,
  ...SESSION,
};

module.exports = KEYS;

const { Pool } = require('pg');

const PG_URI =
'postgres://ndzalgxg:h49nn77jdN3Vq9r-ZE9W67QH3H5GYriO@suleiman.db.elephantsql.com:5432/ndzalgxg';
  // 'postgres://gvajvsqt:mZb_UBRu49_2Qtw3KYzaJ7CYJT7Q-5sP@rajje.db.elephantsql.com:5432/gvajvsqt';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/images/schema.png?raw=true

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

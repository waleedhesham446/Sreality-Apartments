const Pool = require('pg').Pool

const pool = new Pool({
  user: 'root',
  host: 'postgres',
  database: 'sreality',
  password: 'secret',
  port: 5432,
});

module.exports = { pool }
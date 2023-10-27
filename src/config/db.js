const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    console.log({'user':pool.user,'password':pool.password,'host':pool.host,'port':pool.port,'database':pool.database})
  } else {
    console.log('Connected to the database!');
  }
});

module.exports = pool;
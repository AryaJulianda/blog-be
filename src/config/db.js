const { Pool } = require('pg');

console.log({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
})

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
});

module.exports = pool;

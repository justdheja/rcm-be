const { Pool, Client } = require('pg');
require('dotenv').config()

const config = {
	connectionString: process.env.PG_CONN_URL,
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to the Database');
});

const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL,
      password VARCHAR(120) NOT NULL
    )`;
  pool.query(userTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
};

pool.on('remove', () => {
  console.log('Client Removed');
});

module.exports = {
  pool,
  createTables
};

require('make-runnable');
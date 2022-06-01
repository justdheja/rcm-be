const pg = require('pg');
require('dotenv').config();

const databaseConfig = { connectionString: process.env.PG_CONN_URL };
const pool = new pg.Pool(databaseConfig);

pool.on('connect', () => {
	console.log('Connected to the Database');
});

const createOrganizationsTable = () => {
	const companyTable = `
    CREATE TABLE IF NOT EXISTS
    organizations(
      id SERIAL PRIMARY KEY,
      user_id integer NOT NULL,
      organization_name VARCHAR(120) NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `;
	pool
		.query(companyTable)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

const createUserTable = () => {
	const userTable = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL,
      password VARCHAR(120) NOT NULL,
			personal_access_token VARCHAR(200)
    )`;
	pool
		.query(userTable)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

const dropUserTable = () => {
	const usersDropQuery = 'DROP TABLE IF EXISTS users';
	pool
		.query(usersDropQuery)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

const dropCompanyTable = () => {
	const query = 'DROP TABLE IF EXISTS organizations';
	pool
		.query(query)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

const createAllTable = async () => {
	createUserTable();
	createOrganizationsTable();
};

const dropAllTable = () => {
	dropUserTable();
	dropCompanyTable();
};

pool.on('remove', () => {
	console.log('Client Removed');
});

module.exports = {
	createAllTable,
	dropAllTable,
	pool
};

require('make-runnable');

const pg = require('pg');
require('dotenv').config();

const databaseConfig = { connectionString: process.env.PG_CONN_URL };
const pool = new pg.Pool(databaseConfig);

pool.on('connect', () => {
	console.log('Connected to the Database');
});

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

const createMeetingTable = () => {
	const meetingTable = `CREATE TABLE IF NOT EXISTS
		meetings(
			id SERIAL PRIMARY KEY,
			user_id integer NOT NULL,
			project_id VARCHAR(200) NOT NULL,
			title VARCHAR(200) NOT NULL,
			meeting_link text NOT NULL,
			participants text NOT NULL,
			meeting_date TIMESTAMP NOT NULL,
			meeting_record text,
			meeting_mom text,
			meeting_desc VARCHAR(255),
			FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		)`;
	pool
		.query(meetingTable)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
};

const createNoteTable = () => {
	const noteTable = `CREATE TABLE IF NOT EXISTS
		notes(
			id SERIAL PRIMARY KEY,
			meeting_id integer NOT NULL,
			workitems_id VARCHAR(200) NOT NULL,
			workitems_state VARCHAR(150) NOT NULL,
			title text NOT NULL,
			new_title text NOT NULL,
			note_detail text NOT NULL,
			note_priority integer NOT NULL,
			note_initiator VARCHAR(200) NOT NULL,
			note_type CHAR(50) NOT NULL,
			note_acceptance CHAR(50),
			note_reason text,
			FOREIGN KEY (meeting_id) REFERENCES meetings (id) ON DELETE CASCADE,
			CONSTRAINT valid_priority_number 
			CHECK (note_priority <= 4 AND note_priority >= 0)
		)`;
	pool
		.query(noteTable)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
}

const createReportTable = () => {
	const reportTable = `CREATE TABLE IF NOT EXISTS
		reports(
			id SERIAL PRIMARY KEY,
			report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			project_id VARCHAR(200) NOT NULL,
			meeting_id integer NOT NULL,
			user_id integer NOT NULL,
			FOREIGN KEY (meeting_id) REFERENCES meetings (id) ON DELETE CASCADE,
			FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		)`;
	pool
		.query(reportTable)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.log(err);
			pool.end();
		});
}

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

const dropMeetingsTable = () => {
	const query = 'DROP TABLE IF EXISTS meetings';
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

const dropNoteTable = () => {
	const query = 'DROP TABLE IF EXISTS notes';
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

const dropReportTable = () => {
	const query = 'DROP TABLE IF EXISTS reports';
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
	// createUserTable();
	// createMeetingTable();
	createNoteTable();
	createReportTable();
};

const dropAllTable = () => {
	// dropUserTable();
	// dropMeetingsTable();
	dropReportTable();
	dropNoteTable();
};

pool.on('remove', () => {
	console.log('Client Removed');
});

module.exports = {
	createAllTable,
	dropAllTable,
	pool,
};

require('make-runnable');

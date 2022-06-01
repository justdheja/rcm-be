const { pool } = require('../services/db.config');
require('dotenv').config();

exports.allAccess = (req, res) => {
	res.status(200).send('Welcome to RCM Services');
};

exports.userBoard = (req, res) => {
	const query = `SELECT * FROM users WHERE id=$1`;
	const value = [req.user_id];
	res.status(200).send({
		user_id: req.userId,
		message: 'success access user content',
	});
};

exports.addPesonalAccessToken = async (req, res) => {
	const query = `UPDATE users SET personal_access_token=$1 WHERE id=$2 returning *`;
	const values = [req.body.pat, req.user_id];
	pool.connect((error, client, release) => {
		if (error) {
			return console.error('Error acquiring client', error.stack);
		}
		client.query(query, values, (err, result) => {
			release();
			if (err) {
				console.log(err.message);
				return res.status(400).json({ err });
			}
			const user = result.rows[0];
			return res.status(200).send({
				username: user.username,
				user_id: user.id,
				personal_access_token: user.personal_access_token,
				message: `Personal Access Token Updated!`,
			});
		});
	});
};

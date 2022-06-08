const { pool } = require('../services/db.config');
const devOpsApi = require('../services/devOpsApi');
require('dotenv').config();

exports.allAccess = (req, res) => {
	res.status(200).send('Welcome to RCM Services');
};

exports.userBoard = (req, res) => {
	const query = `SELECT * FROM users WHERE id=$1`;
	const values = [req.user_id];
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
				email: user.email,
				personal_access_token: user.personal_access_token,
				microsoft_id: user.microsoft_id,
				message: `User Profile`,
			});
		});
	});
};

exports.addPesonalAccessToken = async (req, res) => {
	let msid;
	await devOpsApi
		.getMicrosoftProfile(req.body.personal_access_token)
		.then((response) => {
			console.log(response);
			if (response.publicAlias) {
				msid = response.publicAlias;
				const query = `UPDATE users SET personal_access_token=$1, microsoft_id=$2 WHERE id=$3 returning *`;
				const values = [req.body.personal_access_token, msid, req.user_id];
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
							email: user.email,
							personal_access_token: user.personal_access_token,
							microsoft_id: user.microsoft_id,
							message: `Personal Access Token Updated!`,
						});
					});
				});
			} else {
				return res.status(404).send({
					message: 'Please input valid Personal Access Token!',
				});
			}
		});
};

exports.deleteAccount = (req, res) => {
	const query = `DELETE FROM users WHERE id=$1 RETURNING *`;
	const values = [req.user_id];
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
				email: user.email,
				user_id: user.id,
				message: `Account has been successfully deleted!`,
			});
		});
	});
};

const { pool } = require('../services/db.config');
const devOpsApi = require('../services/devOpsApi');

exports.getAllWorkItems = (req, res) => {
	const query = `SELECT * FROM users WHERE id=$1`;
	const values = [req.user_id];
	pool.connect((error, client, release) => {
		if (error) {
			return console.error('Error acquiring client', error.stack);
		}
		client.query(query, values, async (err, result) => {
			release();
			if (err) {
				console.log(err.message);
				return res.status(400).json({ err });
			}
			const user = result.rows[0];
			devOpsApi
				.getWorkItemsList(
					req.params.name,
					req.params.projectId,
					user.personal_access_token
				)
				.then((response) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send({ message: 'Data not Found!' });
					}
				});
		});
	});
};

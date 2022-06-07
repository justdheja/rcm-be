const { pool } = require('../services/db.config');
const devOpsApi = require('../services/devOpsApi');
require('dotenv').config();

exports.getAllOrganziations = (req, res) => {
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
			if(user.microsoft_id) {
				const organizations = await devOpsApi.getAllOrganizations(
					user.microsoft_id,
					user.personal_access_token
				);
				return res.status(200).send(organizations);
			} else {
				return res.status(404).send({
					message: 'Not found! Please input your valid Personal Access Token!'
				})
			}
		});
	});
};

exports.getOrganizationProjects = (req, res) => {
	const organizationName = req.params.name
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
			const projects = await devOpsApi.getAllOrganizationProjects(
				organizationName,
				user.personal_access_token
			);
			if(projects.value) {
				return res.status(200).send(projects);
			} else {
				return res.status(404).send({
					message: 'not found'
				})
			}
		});
	});
}

exports.addOrganization = (req, res) => {
	if (req.body.organization_name && !req.body.organization_name.includes(' ')) {
		const query = `
    INSERT INTO organizations(user_id, organization_name) VALUES($1, $2) RETURNING *`;
		const values = [req.user_id, req.body.organization_name];
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
				const organization = result.rows[0];
				return res.status(200).send({
					id: organization.id,
					organization_name: organization.organization_name,
					message: 'Organization was added successfully!',
				});
			});
		});
	} else {
		res.status(400).send({
			message: 'Organization can not be empty or include white space!',
		});
	}
};

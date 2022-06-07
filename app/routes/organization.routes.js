require('dotenv').config();
const { verifyToken } = require('../middleware/authJwt');
const controller = require('../controllers/organization.controller');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.get(
		'/api/organization',
		[verifyToken],
		controller.getAllOrganziations
	);

	app.get('/api/organization/:name/projects', [verifyToken], controller.getOrganizationProjects)

	app.post('/api/organization/add', [verifyToken], controller.addOrganization);
};

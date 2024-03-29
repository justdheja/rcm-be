require('dotenv').config();
const { verifyToken } = require('../middleware/authJwt');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', "*");
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.get('/', controller.allAccess)

	app.get('/api/', controller.allAccess);

	app.get('/api/user', [verifyToken], controller.userBoard);

	app.post(
		'/api/user/personaltoken',
		[verifyToken],
		controller.addPesonalAccessToken
	);

	app.get(
		'/api/user/delete',
		[verifyToken],
		controller.deleteAccount
	);
};

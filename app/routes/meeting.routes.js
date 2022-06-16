require('dotenv').config();
const { verifyToken } = require('../middleware/authJwt');
const controller = require('../controllers/meeting.controller');

module.exports = (app) => {
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	app.post('/api/meeting', [verifyToken], controller.createMeeting);
	app.post('/api/meeting/note', [verifyToken], controller.createNote);
	app.get(
		'/api/meeting/note/:note_id/delete',
		[verifyToken],
		controller.deleteNote
	);
	app.get('/api/meeting/:project_id', [verifyToken], controller.getAllMeetings);
	app.get(
		'/api/meeting/delete/:meeting_id',
		[verifyToken],
		controller.deleteMeeting
	);
	app.get(
		'/api/meeting/detail/:meeting_id',
		[verifyToken],
		controller.getMeetingDetail
	);
	app.post(
		'/api/meeting/:meeting_id/record',
		[verifyToken],
		controller.addRecordLink
	);
	app.get(
		'/api/meeting/:meeting_id/note',
		[verifyToken],
		controller.getAllNotes
	);
	app.post(
		'/api/meeting/note/approve',
		[verifyToken],
		controller.approveNote
	);
	app.post('/api/meeting/:meeting_id/mom', [verifyToken], controller.addMom);
	app.post('/api/meeting/report', [verifyToken], controller.createReport);
	app.get(
		'/api/meeting/report/:report_id/delete',
		[verifyToken],
		controller.deleteReport
	);
	app.get('/api/meeting/report', controller.getReport)
	app.get('/api/meeting/reportbyproject/:project_id', [verifyToken], controller.getReportByProject)
};

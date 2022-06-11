const { pool } = require('../services/db.config');
const { transporter, invitataionHtmlTemplate } = require('../services/email');

exports.createMeeting = (req, res) => {
	const query = `INSERT INTO meetings(user_id, project_id, title, meeting_link, participants, meeting_date, meeting_desc) values($1,$2,$3,$4,$5,$6,$7) returning *`;
	const values = [
		req.user_id,
		req.body.project_id,
		req.body.title,
		req.body.meeting_link,
		req.body.participants,
		req.body.meeting_date,
		req.body.meeting_desc,
	];
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
			const meeting = result.rows[0];
			const emailConfig = {
				from: `"${req.username} via RCM App 🛠 " <rcm-app@outlook.com>`,
				to: req.body.participants,
				subject: req.body.title,
				html: invitataionHtmlTemplate(
					req.body.title,
					req.body.meeting_link,
					req.body.meeting_desc
				),
			};
			transporter.sendMail(emailConfig).then((response) => {
				return res.status(200).send({
					status: response,
					message: 'Meeting created!',
					data: meeting,
				});
			});
		});
	});
};

exports.getAllMeetings = (req, res) => {
	const query = `SELECT * FROM meetings WHERE user_id=$1 AND project_id=$2`;
	const values = [req.user_id, req.params.project_id];
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
			const meetings = result.rows;
			return res.status(200).send(meetings);
		});
	});
};

exports.deleteMeeting = (req, res) => {
	const query = `DELETE FROM meetings WHERE id=$1 AND user_id=$2 RETURNING *`;
	const values = [req.params.meeting_id ,req.user_id];
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
			const meeting = result.rows[0];
			return res.status(200).send({
				message: `Meeting has been successfully deleted!`,
				data: meeting,
			});
		});
	});
};

exports.getMeetingDetail = (req, res) => {
	const query = `SELECT * FROM meetings WHERE id=$1 AND user_id=$2`;
	const values = [req.params.meeting_id ,req.user_id];
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
			const meeting = result.rows[0];
			return res.status(200).send({
				data: meeting,
			});
		});
	});
};

exports.addRecordLink = (req, res) => {
	const query = `UPDATE meetings SET meeting_record=$1 WHERE id=$2 AND user_id=$3 returning *`;
	const values = [req.body.meeting_record, req.params.meeting_id, req.user_id];
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
			const meeting = result.rows[0];
			return res.status(200).send({
				data: meeting,
				message: `Meeting record successfully added!`,
			});
		});
	});
}

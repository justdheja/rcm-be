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
	const values = [req.params.meeting_id, req.user_id];
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
	const values = [req.params.meeting_id, req.user_id];
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
};

exports.addMom = (req, res) => {
	const query = `UPDATE meetings SET meeting_mom=$1 WHERE id=$2 AND user_id=$3 returning *`;
	const values = [req.body.meeting_mom, req.params.meeting_id, req.user_id];
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
				message: `MOM successfully added!`,
			});
		});
	});
};

exports.createNote = (req, res) => {
	const query = `INSERT INTO notes(meeting_id, workitems_id, workitems_state, title, new_title, note_detail, note_priority, note_initiator, note_type) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
	const values = [
		req.body.meeting_id,
		req.body.workitems_id,
		req.body.workitems_state,
		req.body.title,
		req.body.new_title,
		req.body.note_detail,
		req.body.note_priority,
		req.body.note_initiator,
		req.body.note_type,
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
			const note = result.rows[0];
			return res.status(200).send({
				data: note,
				message: `Note created successfully!`,
			});
		});
	});
};

exports.getAllNotes = (req, res) => {
	const query = `SELECT * FROM notes WHERE meeting_id=$1`;
	const values = [req.params.meeting_id];
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
			const notes = result.rows;
			return res.status(200).send({
				data: notes,
			});
		});
	});
};

exports.approveNote = (req, res) => {
	const query = `UPDATE notes SET note_acceptance=$1, note_reason=$2 WHERE id=$3 returning *`;
	const values = [req.body.note_acceptance, req.body.note_reason, req.body.id];
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
			const notes = result.rows[0];
			return res.status(200).send({
				data: notes,
				message: `Note successfully updated!`,
			});
		});
	});
};

exports.deleteNote = (req, res) => {
	const query = `DELETE FROM notes WHERE id=$1 RETURNING *`;
	const values = [req.params.note_id];
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
			const notes = result.rows[0];
			return res.status(200).send({
				data: notes,
				message: 'Note has been deleted!',
			});
		});
	});
};

exports.createReport = (req, res) => {
	const query = `INSERT INTO reports(user_id, project_id, meeting_id, project_name, organization) values($1,$2,$3,$4,$5) returning *`;
	const values = [
		req.user_id,
		req.body.project_id,
		req.body.meeting_id,
		req.body.project_name,
		req.body.organization,
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
			const report = result.rows[0];
			return res.status(200).send({
				data: report,
				message: `Report created successfully!`,
			});
		});
	});
};

exports.getReport = (req, res) => {
	const query = `SELECT * FROM reports 
	INNER JOIN meetings ON reports.meeting_id=meetings.id
	INNER JOIN users ON reports.user_id=users.id
	INNER JOIN notes ON reports.meeting_id=notes.meeting_id`;
	const values = [req.body.report_id, req.body.project_id, req.body.meeting_id];
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
			const reports = result.rows;
			return res.status(200).send({
				data: reports,
			});
		});
	});
};

exports.getReportByProject = (req, res) => {
	const query = `SELECT *, meetings.title AS meeting_title, notes.id AS note_id FROM meetings
INNER JOIN notes ON meetings.id=notes.meeting_id
WHERE user_id=$1 AND project_id=$2 AND notes.note_acceptance='Approved'`;
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
			const reports = result.rows;
			return res.status(200).send({
				data: reports,
			});
		});
	});
};

exports.deleteReport = (req, res) => {
	const query = `DELETE FROM reports WHERE id=$1 RETURNING *`;
	const values = [req.params.report_id];
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
			const report = result.rows[0];
			if (report) {
				return res.status(200).send({
					data: report,
					message: 'Report has been deleted!',
				});
			} else {
				return res.status(404).send({
					message: 'Report not found',
				});
			}
		});
	});
};

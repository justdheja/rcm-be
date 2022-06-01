const { pool } = require('../services/db.config');
require('dotenv').config();

exports.add = (req, res) => {
	res.status(200).send('Public Content.');
};

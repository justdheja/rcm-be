const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const corsOption = {
	origin: '*',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

const PORT = process.env.PORT || 4000;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// simple routes
app.get('/', (req, res) => {
	res.json({ message: 'RCM APP.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/organization.routes')(app);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

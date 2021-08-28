const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
	res.status(200).json({ success: true, msg: 'GET all bootcamps' });
});
app.get('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `GET bootcamp ${req.params.id} ` });
});
app.post('/api/v1/bootcamps', (req, res) => {
	res.status(201).json({ success: true, msg: 'CREATE new bootcamp' });
});
app.put('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `UPDATE bootcamp ${req.params.id} ` });
});
app.delete('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `DELETE bootcamp ${req.params.id} ` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENVIRONMENT} mode on PORT ${PORT} \nMongoDB on ${process.env.MONGODB_URL}`,
	);
});

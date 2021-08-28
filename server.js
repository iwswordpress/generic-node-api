const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config({ path: './config/config.env' });
const colors = require('colors');
require('./colors');

// const connectDB = require('./config/db');
// connectDB();
const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/bootcamps');
// Load env vars

const app = express();

if (process.env.NODE_ENV === 'development') {
	// Logger
	app.use(logger);
	app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

app.listen(PORT, () => {
	console.log(colors.white.inverse(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
	mongoose
		.connect(mongo_uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(colors.verbose.bold(`Mongoose connected...${mongo_uri}`));
		})
		.catch((err) => {
			console.log(err);
		});
});

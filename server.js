const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const colors = require('colors');
require('./colors');
const { connectMongoDB, listDatabases } = require('./config/mongodb');
connectMongoDB();

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

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`);
});

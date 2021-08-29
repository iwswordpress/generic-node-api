const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });
const colors = require('colors');
require('./colors');

const connectDB = require('./config/db');

const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/bootcamps');

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
	console.log(colors.white.inverse(`  Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}  `));
	connectDB();
});

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
	console.log(colors.error.bold(`Error: ${err.message}`));
	server.close(() => process.exit(1));
});

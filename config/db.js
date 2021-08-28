const mongoose = require('mongoose');
const colors = require('colors');
require('../colors');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const connectDB = async () => {
	console.log('connecting to mongo...');
	const conn = await mongoose.connect(
		'mongodb+srv://node:cw26174@MONGODB@cluster0.rwjm6.mongodb.net/devcamper?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	);

	console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

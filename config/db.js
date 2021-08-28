const mongoose = require('mongoose');
const colors = require('colors');
require('../colors');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const mongo_url = process.env.MONGO_URI;
console.log(mongo_url);
const connectDB = async () => {
	console.log('connecting to mongoosw...');
	const conn = await mongoose.connect(mongo_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

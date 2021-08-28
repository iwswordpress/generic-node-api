const mongoose = require('mongoose');
const colors = require('colors');
require('../colors');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const mongo_uri = process.env.MONGO_URI;
const connectDB = async () => {
	console.log('connecting to mongoose...');

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
};

module.exports = connectDB;

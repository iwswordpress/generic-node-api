const express = require('express');

const mongoose = require('mongoose');

const app = express();



mongoose
	.connect('mongodb+srv://node:cw26174@MONGODB@cluster0.rwjm6.mongodb.net/devcamper?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(5000);
		console.log('Mongo and Server running...');
	})
	.catch((err) => {
		console.log(err);
	});

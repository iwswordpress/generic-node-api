const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;
	// Log to console for developer
	console.log(err.name.green.inverse);
	if (err.code) {
		console.log(err.code.toString().blue.inverse);
	} else {
		console.log('NO CODE'.blue.inverse);
	}

	console.log('ErrorHandler', err);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = `Duplicate field value entered`;
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		console.log('Validation Errors:'.red.inverse, message);
		error = new ErrorResponse(message, 400);
	}
	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error',
	});
};

module.exports = errorHandler;

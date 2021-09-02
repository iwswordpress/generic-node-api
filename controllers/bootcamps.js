const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// const connectDB = require('../config/db');
// connectDB();
const Bootcamp = require('../models/Bootcamp');
// @desc     GET all bootcamps
// @route    GET /api/v1/bootcamps
// // @access   Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find();
	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps,
		hello: req.hello,
		user: req.user,
	});
});

// @desc     GET single bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = async (req, res, next) => {
	console.log('bootcamp id:', req.params.id);
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (!bootcamp) {
			return next(new ErrorResponse(`Bootcamp not found in DB with id of ${req.params.id}`, 404));
		}
		res.status(200).json({
			success: true,
			data: bootcamp,
		});
	} catch (err) {
		next(err);
	}
};

// @desc     Create a bootcamp
// @route    POST /api/v1/bootcamps/
// @access   Privte
exports.createBootcamp = async (req, res, next) => {
	console.log('data sent', req.body);

	try {
		const bootcamp = await Bootcamp.create(req.body);
		res.status(201).json({ success: true, msg: 'CREATED new bootcamp', data: bootcamp });
	} catch (err) {
		next(err);
	}
};

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = async (req, res, next) => {
	console.log('bootcamp id:', req.params.id);
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!bootcamp) {
			return next(new ErrorResponse(`Bootcamp not found in DB with id of ${req.params.id}`, 404));
		}
		res.status(200).json({
			success: true,
			data: bootcamp,
		});
	} catch (err) {
		next(err);
	}
};

// @desc     Delete a bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = async (req, res, next) => {
	console.log('bootcamp id:', req.params.id);
	try {
		const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
		if (!bootcamp) {
			return next(new ErrorResponse(`Bootcamp not found in DB with id of ${req.params.id}`, 404));
		}
		res.status(200).json({
			success: true,
			msg: `DELETED ${req.params.id}`,
		});
	} catch (err) {
		next(err);
	}
};

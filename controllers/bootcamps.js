// const connectDB = require('../config/db');
// connectDB();
const Bootcamp = require('../models/Bootcamp');
// @desc     GET all bootcamps
// @route    GET /api/v1/bootcamps
// // @access   Public

exports.getBootcamps = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find();
		res.status(200).json({
			success: true,
			count: bootcamps.length,
			data: bootcamps,
			hello: req.hello,
			user: req.user,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, msg: 'FAILED TO CREATE BOOTCAMP', data: null });
	}
};

// @desc     GET single bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = async (req, res, next) => {
	console.log('bootcamp id:', req.params.id);
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (!bootcamp) {
			return res.status(400).json({ success: false, msg: 'Bootcamp not found', data: null });
		}
		res.status(200).json({
			success: true,
			data: bootcamp,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, msg: 'Incorrect request', data: null });
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
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, msg: 'FAILED TO CREATE BOOTCAMP', data: null });
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
			return res.status(400).json({ success: false, msg: 'Bootcamp not found', data: null });
		}
		res.status(200).json({
			success: true,
			data: bootcamp,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, msg: 'Incorrect request', data: null });
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
			return res.status(400).json({ success: false, msg: 'Bootcamp not found', data: null });
		}
		res.status(200).json({
			success: true,
			msg: `DELETED ${req.params.id}`,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ success: false, msg: 'Incorrect request', data: null });
	}
};

// const connectDB = require('../config/db');
// connectDB();
const Bootcamp = require('../models/Bootcamp');
// @desc     GET all bootcamps
// @route    GET /api/v1/bootcamps
// // @access   Public

exports.getBootcamps = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'GET all bootcamps', hello: req.hello, user: req.user });
};

// @desc     GET single bootcamp
// @route    GET /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `GET bootcamp ${req.params.id} ` });
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
		res.status(400).json({ success: false, msg: 'FAILED TO CREATE', data: null });
	}
};

// @desc     Update a bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @access   Private
exports.updateBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `UPDATE bootcamp ${req.params.id} ` });
};

// @desc     Delete a bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @access   Private
exports.deleteBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `DELETE bootcamp ${req.params.id} ` });
};

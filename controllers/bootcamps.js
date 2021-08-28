// @desc     GET all bootcamps
// @route    GET /api/v1/bootcamps
// @access   Public
exports.getBootcamps = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'GET all bootcamps' });
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
exports.createBootcamp = (req, res, next) => {
	res.status(201).json({ success: true, msg: 'CREATE new bootcamp' });
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

const colors = require('colors');
require('../colors');

// @desc    Logs route to console

const logger = (req, res, next) => {
	req.hello = 'Hello World';
	req.user = { id: 2, auth: true, token: 'FJJHH_8876HHH' };
	const output = `LOGGER: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`;
	console.log(colors.verbose(output));
	// console.log(colors.warn.inverse('Middleware ran...'));
	// console.log(colors.error.underline('Middleware did NOT run...'));
	next();
};

module.exports = logger;

const http = require('http');
const colors = require('colors');

const todos = [
	{ id: 1, text: 'todo one' },
	{ id: 2, text: 'todo two' },
	{ id: 3, text: 'todo three' },
];

let body = [];
const server = http.createServer((req, res) => {
	console.log(req.method);
	res.writeHead(202, {
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node.js',
	});

	console.log(req.headers.authorization.green.inverse);
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		console.log(body);
	});
	res.end(
		JSON.stringify({
			success: true,
			data: todos,
		}),
	);
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server runing on PORT ${PORT}...`));

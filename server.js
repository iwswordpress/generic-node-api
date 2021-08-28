const http = require('http');
const colors = require('colors');

const todos = [
	{ id: 1, text: '1 todo one' },
	{ id: 2, text: '2 todo two' },
	{ id: 3, text: '3 todo three' },
];

const server = http.createServer((req, res) => {
	console.log(req.method);
	const { method, url } = req;
	let body = [];

	const response = {
		success: false,
		data: null,
	};

	if (method === 'GET' && url === '/todos') {
		status = 200;
		response.success = true;
		response.data = todos;
		console.log(JSON.stringify(response).blue.inverse);
	} else if (method === 'POST' && url === '/todos') {
		req.on('data', (chunk) => {
			console.log('chunk', chunk);
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			console.log('end', body);
			const { id, text } = JSON.parse(body);
			todos.push({ id, text });
			status = 201;
			response.success = true;
			response.data = todos;
			console.log(JSON.stringify(response).blue.inverse);
		});
	}
	res.writeHead(202, {
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node.js',
	});

	// console.log(req.headers.authorization.green.inverse);

	res.end(JSON.stringify(response));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server runing on PORT ${PORT}...`));

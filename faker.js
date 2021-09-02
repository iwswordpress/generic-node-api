const fs = require('fs');
const faker = require('faker');
const colors = require('colors');

const camps = ['Functional JS', 'GraphQL', 'RxJS', 'PWA', 'Web Components'];



var mongoObjectId = function () {
	var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
	return (
		timestamp +
		'xxxxxxxxxxxxxxxx'
			.replace(/[x]/g, function () {
				return ((Math.random() * 16) | 0).toString(16);
			})
			.toLowerCase()
	);
};
let bootcamps = [];
const createFakerBootcamp = () => {
	
	const name = faker.name.findName(); // Rowan Nikolaus
	const email = faker.internet.email(); // Kassandra.Haley@erich.biz
	const phone = faker.phone.phoneNumber(); // Kassandra.Haley@erich.biz
	const address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`;
	const obj = {
		id: mongoObjectId(),
		user: mongoObjectId(),
		name,
		email,
		phone,
		address,
		description:
			'ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary. We teach both development and UI/UX',
		website: 'https://moderntech.com',
		careers: ['Web Development', 'UI/UX', 'Mobile Development'],
		housing: false,
		jobAssistance: true,
		jobGuarantee: false,
		acceptGi: true,
	};
	console.log(colors.yellow.bold(`BOOTCAMP id: ${obj.id} user: ${obj.user}`));
	console.log(obj);
	bootcamps.push(obj);
};

// module.exports = createFakerBootcamp;
for (let i = 1; i < 5; i++) {
	createFakerBootcamp();
}
console.log(colors.green.inverse(`----- BOOTCAMPS ARRAY -----`));
console.log(bootcamps);
console.log(colors.blue.bold(__dirname + '/_data/devcamps.json'));
fs.writeFile(__dirname + '/_data/devcamps.json', JSON.stringify(bootcamps), (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(colors.green.inverse(`File created...`));
});

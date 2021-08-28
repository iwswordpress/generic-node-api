const DB = 'sample_airbnb';
const COL = 'test';

// DELETE
async function delete1000Bedrooms(client) {
	console.log('------------------------------------');
	console.log('Properties with 1000 bedrooms deleted');
	await client.db(DB).collection(COL).deleteMany({ bedrooms: 1000 });
}

module.exports = {
	delete1000Bedrooms,
};

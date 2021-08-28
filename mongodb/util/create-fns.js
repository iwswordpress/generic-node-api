const DB = 'sample_airbnb';
const COL = 'test';

// CREATE
async function createListing(client, newListing) {
	console.log('------------------------------------');
	const result = await client.db(DB).collection(COL).insertOne(newListing);
	console.log(`New listing created with the following id: ${result.insertedId}`);
}
async function createMultipleListings(client, newListings) {
	const result = await client.db('sample_airbnb').collection(COL).insertMany(newListings);
	console.log('------------------------------------');
	console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
	console.log(result.insertedIds);
}

module.exports = {
	createListing,
	createMultipleListings,
};

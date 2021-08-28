const { MongoClient } = require('mongodb');
// .env is in root so configure path
require('dotenv').config({ path: '../.env' });
const { findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews } = require('./util/read-fns');
const { delete1000Bedrooms } = require('./util/delete-fns');

const DB = 'sample_airbnb';
// Collection used is in functions from util/crud.js

async function main() {
	const uri = `${process.env.MONGODB}${DB}?retryWrites=true&w=majority`;
	console.log(`uri: ${uri}`);
	const client = new MongoClient(uri, { useUnifiedTopology: true });

	try {
		await client.connect();
		console.clear();
		console.log('');
		console.log('>>> MongoDB now connected...');
		// Make the appropriate DB calls
		console.log('');

		await delete1000Bedrooms(client);

		// DISPLAY NEW INSERTIONS
		await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms: 999,
			minimumNumberOfBathrooms: 0,
			maximumNumberOfResults: 25,
		});
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}
// RUN
main().catch(console.error);

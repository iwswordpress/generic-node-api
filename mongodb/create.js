const { MongoClient } = require('mongodb');
// .env is in root so configure path
require('dotenv').config({ path: '../.env' });
const { createListing, createMultipleListings } = require('./util/create-fns');
const { listDatabases, findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews } = require('./util/read-fns');
const DB = 'sample_airbnb';
// Collection used is in functions from util/crud.js
const COL = 'listingsAndReviews';
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

		await listDatabases(client);

		// Find the listing named "Infinite Views" that we created in create.js

		createListing(client, {
			name: 'RND ' + Math.floor(Math.random() * 1000) + ' - TEST',
			summary: 'Test listing',
			bedrooms: 1000,
			bathrooms: 1000,
		});
		// Create 3 new listings
		await createMultipleListings(client, [
			{
				name: 'TEST ONE',
				property_type: 'House',
				bedrooms: 1000,
				bathrooms: 6,
				beds: 15,
			},
			{
				name: 'TEST TWO',
				property_type: 'House',
				bedrooms: 1000,
				bathrooms: 4.5,
				beds: 25,
			},
			{
				name: 'TEST THREE',
				property_type: 'House',
				bedrooms: 1000,
				bathrooms: 2.5,
				beds: 15,
			},
		]);
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

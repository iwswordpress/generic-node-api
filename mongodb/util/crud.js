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

// READ
async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();
	console.log('------------------------------------');
	console.log('Databases:');
	databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function findOneListingByName(client, nameOfListing) {
	const result = await client.db('sample_airbnb').collection(COL).findOne({ name: nameOfListing });

	if (result) {
		console.log('------------------------------------');
		console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
		console.log(result);
	} else {
		console.log('------------------------------------');
		console.log(`No listings found with the name '${nameOfListing}'`);
	}
}

async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(
	client,
	{
		minimumNumberOfBedrooms = 999,
		minimumNumberOfBathrooms = 0,
		maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
	} = {},
) {
	// See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
	const cursor = client
		.db(DB)
		.collection(COL)
		.find({
			bedrooms: { $gte: minimumNumberOfBedrooms },
			bathrooms: { $gte: minimumNumberOfBathrooms },
		})
		.sort({ name: 1 })
		.limit(maximumNumberOfResults);

	// Store the results in an array
	const results = await cursor.toArray();

	// Print the results
	if (results.length > 0) {
		console.log('------------------------------------');
		console.log(
			`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`,
		);
		results.forEach((result, i) => {
			console.log();
			console.log(`${i + 1}. name: ${result.name}`);
			console.log(`   _id: ${result._id}`);
			console.log(`   bedrooms: ${result.bedrooms}`);
			console.log(`   bathrooms: ${result.bathrooms}`);
		});
	} else {
		console.log('------------------------------------');
		console.log(
			`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`,
		);
	}
}

module.exports = {
	DB,
	COL,
	createListing,
	createMultipleListings,
	listDatabases,
	findOneListingByName,
	findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews,
};

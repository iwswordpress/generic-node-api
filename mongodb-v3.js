const { MongoClient } = require('mongodb');

const { listDatabases } = require('./mongodb/util/crud');
// DB to use
const DB = 'sample_airbnb';
// Collection to use
const COL = 'test';
// const COL = 'listingsAndReviews';
// RUN

main().catch(console.error);

async function main() {
	const uri = `mongodb+srv://node:cw26174@MONGODB@cluster0.rwjm6.mongodb.net/${DB}?retryWrites=true&w=majority`;

	const client = new MongoClient(uri, { useUnifiedTopology: true });

	try {
		await client.connect();
		console.clear();
		console.log('-----&&&&----');
		console.log('>>> MongoDB now connected...');
		await listDatabases(client);
		// Make the appropriate DB calls
		console.log('');
		console.log(`Connected to MongoDB with DB: ${DB}...`);
		console.log(`uri: ${uri}`);
		await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
			minimumNumberOfBedrooms: 3,
			minimumNumberOfBathrooms: 1,
			maximumNumberOfResults: 20,
		});
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
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

const { MongoClient } = require('mongodb');
const colors = require('colors');
require('../colors');

const uri = `mongodb+srv://node:cw26174@MONGODB@cluster0.rwjm6.mongodb.net/devcamper?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useUnifiedTopology: true });
async function connectMongoDB() {
	try {
		await client.connect();
		console.log(colors.blue.inverse(`MongoDB connected...`));
		databasesList = await client.db().admin().listDatabases();
		console.log('------------------------------------');
		console.log(colors.green.inverse('Databases:'));
		databasesList.databases.forEach((db) => console.log(colors.verbose(` - ${db.name}`)));
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

module.exports = { connectMongoDB };

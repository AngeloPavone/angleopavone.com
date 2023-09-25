const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb://localhost:27017/test';

async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function connectToMongoDB() {
	try {
		mongoose.set('strictQuery', false);
		const connect = await mongoose.connect(mongoURI);
		console.log(`Database Connected: ${connect.connection.host}`)
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	connectToMongoDB,
	listDatabases,
}

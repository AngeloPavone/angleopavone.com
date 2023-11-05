const db = require('mongoose');
const { BlogPostModel } = require('./blogPost');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

async function listenForMongoDbErrors() {
	db.connection.on('error', err => {
		logError(err);
	});
};

async function findPost(title) {
  try {
    const post = await BlogPostModel.findOne({ title });

    if (post) {
      return post;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding post by title:', error);
    throw error;
  }
};

async function connectToMongoDb() {
	try {
		if (db.connection.readyState === 0) {
			db.set('strictQuery', false);
			const connect = await db.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
			console.log(`Database Connected: http://${connect.connection.host}:${connect.connection.port}/`)
			listenForMongoDbErrors();
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	connectToMongoDb,
	findPost,
}

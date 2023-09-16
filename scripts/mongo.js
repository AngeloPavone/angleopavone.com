const mongo = require('mongoose')

const blogPostSchema = new mongo.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = mongo.model('BlogPost', blogPostSchema);

const userSchema = new mongo.Schema({
  username: String,
  password: String,
});

const User = mongo.model('User', userSchema);

module.exports = { BlogPost, User };
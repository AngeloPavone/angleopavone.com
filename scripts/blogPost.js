const mongo = require('mongoose')

class BlogPost {
  constructor(title, connections, content, author, date) {
    this.title = title;
    this.connections = connections;
    this.content = content;
    this.author = author;
    this.date = date || new Date();
  }
}

module.exports = BlogPost;

const blogPostSchema = new mongo.Schema({
  title: String,
  content: String,
  date: Date,
});

const BlogPostModel = mongo.model('BlogPost', blogPostSchema);

module.exports = { BlogPostModel, BlogPost};
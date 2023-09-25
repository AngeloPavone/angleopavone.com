const mongoose = require('mongoose')

class BlogPost {
  constructor(title, connections, content, author, date) {
    this.title = title;
    this.connections = connections;
    this.content = content;
    this.author = author;
    this.date = date || new Date();
  }
}

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  connections: { type: Array, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BlogPostModel = mongoose.model('test', blogPostSchema);

module.exports = { BlogPostModel, BlogPost };
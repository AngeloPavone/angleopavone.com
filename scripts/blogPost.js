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

module.exports = BlogPost;

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    connections: { type: Array, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, 
    date: { type: Date, default: Date.now },
});

const testBlogPost = new BlogPostModel({
  title: "test title",
  connections: ["connection1", "connection2"],
  content: "test content",
  author: "Angelo Pavone",
})

testBlogPost.save()

const BlogPostModel = mongoose.model('BlogPost', blogPostSchema);

module.exports = { BlogPostModel, BlogPost};
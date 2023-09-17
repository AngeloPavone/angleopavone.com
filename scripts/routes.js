const express = require('express');
const router = express.Router();
const { BlogPost, BlogPostModel } = require('../scripts/blogPost');
const fs = require('fs');

// Create an instance of BlogPost
const blogPost = new BlogPost(
  'Foo',
  ['connection1', 'connection2'],
  'This is the content of my blog post.',
  'John Doe',
  new Date('2023-09-17') // You can provide a custom date if needed
);

blogPostTitle = blogPost.title;

// server homepage
router.get('/', (req, res) => {
  const data = { title: 'Home Page', content: 'This is the home page' };
  res.render('index', data)
});

// server blog pages
router.get(`/${blogPost.title}`, (req, res) => {
  const data = { title: blogPost.title, content: blogPost.content };
  res.render('blog-post', data)
});


module.exports = router;
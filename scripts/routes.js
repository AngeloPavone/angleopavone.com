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
  new Date(),
);

blogPostTitle = blogPost.title;

// server homepage
router.get('/', (req, res) => {
  res.render('index')
});

// server blog pages
router.get(`/${blogPost.title}`, (req, res) => {
  res.render('blog-post')
});

router.get(`/new-post`, (req, res) => {
  res.render('new-post')
});

module.exports = router;
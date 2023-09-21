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
  const data = { title: 'Home Page', content: 'This is the home page' };
  res.render('index', data)
});

// server blog pages
router.get(`/${blogPost.title}`, (req, res) => {
  const data = { title: blogPost.title, content: blogPost.content };
  res.render('blog-post', data)
});

router.get(`/new-post`, (req, res) => {
  console.log(process.env.blogUsername)
  console.log(process.env.blogPassword)
  res.render('new-post')
});

module.exports = router;
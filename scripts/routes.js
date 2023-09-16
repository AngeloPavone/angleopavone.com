const express = require('express');
const router = express.Router();
const { BlogPost } = require('./mongo');
const fs = require('fs');

const blogPost = new BlogPost();

var blogPostTitle = blogPost.title;

// server homepage
router.get('/', (req,res) => {
  const data = { title: 'Home Page', content: 'This is the home page' };
  res
    // .set('Content-Type', 'plain/html')
    .render('index', data)
});

// server blog pages
router.get(`/blog/${blogPostTitle}`, (req,res) => {
  const data = { title: blogPostTitle, content: 'This is the blog page' };
  res
    // .set('Content-Type', 'plain/html')
    .render('blog-post', data)
});


module.exports = router;
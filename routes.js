const express = require('express');
const app = express();
const router = express.Router();
const { BlogPost, BlogPostModel } = require('./public/blog-post.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongo = require('./database-setup.js');


// server homepage
router.get('/', (req, res) => {
  res.render('index.ejs');
});

// server blog pages
router.get(`/${BlogPostModel.title}`, (req, res) => {
  res.render('blog-post.ejs');
});

router.get('/new-post', (req, res) => {
  res.render('new-post.ejs');
});

router.post('/submitNewPost', bodyParser.json(), async (req, res) => {
  try {
    const newPost = new BlogPostModel({
      title: req.body.title,
      connections: [],
      content: req.body.content,
      author: "Angelo Pavone",
    });

    const savedPost = await newPost.save();

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(savedPost, null, 2));

    console.log('Data saved to MongoDB:', savedPost);
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
    res.send('Error saving to MongoDB');
  }

});

module.exports = router;
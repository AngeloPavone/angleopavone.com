const express = require('express');
const router = express.Router();
const { BlogPost, BlogPostModel } = require('./blog-post.js');
const { connectToMongoDB, getTitle, findPost } = require('./database.js');
const mongoose = require('mongoose');

// server homepage
router.get('/', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('blogposts');
    const result = await collection.find({}).toArray();

    res.render('../views/index.ejs', { posts: result });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Database error' });
  }

});

router.get('/login', (req, res) => {
  res.render('../views/login.ejs');
});

router.post('/new-post', (req, res) => {
  if (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
    res.render('../views/new-post.ejs');
  } else {
    res.status(401).send('Authentication failed');
  }
});

router.get('/data', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('blogposts');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/submitNewPost', async (req, res) => {
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

// server blog pages
router.get('/posts/:title', async (req, res) => {
  findPost(req.params.title).then(result => {
    if (result) {
      var postContent = result.content
    }
      if (postContent) {
        res.render('../views/blog-post.ejs', { postContent })
      } else {
        res.status(404).send(`Post content not found! Found ${postContent} instead`)
      }
  });
});

module.exports = router;
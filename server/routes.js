const express = require('express');
const router = express.Router();
const { BlogPost, BlogPostModel } = require('./blogPost.js');
const { connectToMongoDB, getTitle, findPost } = require('./database.js');
const mongoose = require('mongoose');

// server homepage
router.get('/', async (req, res) => {
    res.render('../views/index.ejs');
});

router.get('/login', (req, res) => {
  res.render('../views/login.ejs');
});

router.post('/newPost', (req, res) => {
  if (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD) {
    res.render('../views/newPost.ejs');
  } else {
    res.status(401).send('Authentication failed');
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
      res.render('../views/blogPost.ejs', { postContent })
    } else {
      res.status(404).send(`Post content not found! Found ${postContent} instead`)
    }
  });
});

router.get('/api/blogposts', async (req, res) => {
    try {
    const collection = mongoose.connection.db.collection('blogposts');
    const result = await collection.find({}).toArray();

    res.json(result);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Database error' });
  }
})

module.exports = router;
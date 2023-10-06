import { Node } from './graph.js';

fetch('/api/blogposts')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {
    console.log(post.connections);
    new Node(post.title);
    });
  })
  .catch((error) => {
    console.error('Error fetching blog posts:', error);
  });

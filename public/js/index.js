import { Node, drawLine, nodes, clearLine } from './graph.js';

export function addNode(blogTitle) {
  const node = new Node(blogTitle);
  nodes.push(node);
}

fetch('/api/blogposts')
  .then((res) => res.json())
  .then((data) => {
    const nodePromises = data.map((post) => {
      return new Promise((resolve) => {
        addNode(post.title);
        resolve();
      });
    });

    return Promise.all(nodePromises);
  })
  .then(() => {
    drawLine(nodes[0], nodes[1]);

    nodes.forEach(node => {
      nodeSVG.appendChild(node.getCircle());
    });
  })
  .catch((error) => {
    console.error('Error fetching blog posts:', error);
  });

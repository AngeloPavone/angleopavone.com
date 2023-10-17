import { Node, randomNumber, nodes, drawLine } from "./graph";

export function createNodesFromDataBase() {
  fetch('/api/blogposts')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        console.log("Creating a new node:", post.title);
        const newNode = new Node(post.title, randomNumber(1200, 2000), randomNumber(1200, 2000));
        nodes.push(newNode);
        console.log(nodes);
      });
    })
    .then(() => {
      drawLine(nodes[0], nodes[1]);
    })
    .catch((error) => {
      console.error('Error creating nodes from database:', error);
    });
}

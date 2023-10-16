const RADIUS = 60;
const nodes = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

let graphContainer = document.getElementById("graphContainer");

window.onload = function() {
  graphContainer.scrollTop = 1200;
  graphContainer.scrollLeft = 1200;
};

const canvas = document.getElementById("nodeCanvas");
const ctx = canvas.getContext("2d");

export class Node {
  constructor(blogTitle, x, y, radius = RADIUS) {

    this.circle = {
      x: x,
      y: y,
      radius: radius,
      isDragging: false,
    };

    this.blogTitle = blogTitle;
    this.createClickableCircle();
  }


  createClickableCircle() {
    const clickableCircle = document.createElement("div");
    const anchor = document.createElement("a");
    clickableCircle.className = "node-circle";
    clickableCircle.style.position = "absolute";
    clickableCircle.style.width = `${this.circle.radius}px`;
    clickableCircle.style.height = `${this.circle.radius}px`;
    clickableCircle.style.borderRadius = "50%";
    clickableCircle.style.backgroundColor = "white";
    clickableCircle.style.border = "2px solid black";
    clickableCircle.style.left = this.circle.x - this.circle.radius + "px";
    clickableCircle.style.top = this.circle.y - this.circle.radius + "px";

    clickableCircle.setAttribute("data-blog-title", this.blogTitle);
    anchor.setAttribute("href", `/posts/${this.blogTitle}`);
    anchor.appendChild(clickableCircle);
    graphContainer.appendChild(anchor);

    let isDragging = false;

    clickableCircle.addEventListener('mousedown', (event) => {
      isDragging = true;
    });

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        // Calculate new element position based on mouse position and offset
        const newLeft  = ((event.clientX + graphContainer.scrollLeft) - this.circle.radius) - 50;
        const newTop   = ((event.clientY + graphContainer.scrollTop) - this.circle.radius) - 100;

        requestAnimationFrame(() => {
          // Set the new element position
          clickableCircle.style.left = newLeft + 'px';
          clickableCircle.style.top = newTop + 'px';

          // Update the circle's position
          this.circle.x = newLeft;
          this.circle.y = newTop;

          clickableCircle.style.left = this.circle.x + "px";
          clickableCircle.style.top = this.circle.y + "px";

        });

      }
      console.log("mouse x:%spx y:%spx | node x:%s y:%s", event.clientX, event.clientY, clickableCircle.style.left, clickableCircle.style.top);
    });
  }
}


function createNodesFromDataBase() {
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

createNodesFromDataBase();

function drawLine(node1, node2) {
  ctx.beginPath();
  ctx.moveTo(node1.circle.x, node1.circle.y);
  ctx.lineTo(node2.circle.x, node2.circle.y);
  ctx.strokeStyle = 'red'; // Set the line color
  ctx.lineWidth = 2; // Set the line width
  ctx.stroke();
  ctx.closePath();
}

// const graphContainer = document.getElementById("graphContainer");
// graphContainer.getAttribute("width");
// graphContainer.getAttribute("height");

// let isDragging = false;
// let initialMouseX, initialMouseY;
// let initialGraphX, initialGraphY;

// graphContainer.addEventListener("mousedown", (event) => {
//   const target = event.target.tagName;
//   if (target === "circle") return;
//   isDragging = true;
//   initialMouseX = event.clientX;
//   initialMouseY = event.clientY;
//   initialGraphX = graphContainer.scrollLeft;
//   initialGraphY = graphContainer.scrollTop;
// });

// window.addEventListener("mousemove", (event) => {
//   if (!isDragging) return;

//   const deltaX = event.clientX - initialMouseX;
//   const deltaY = event.clientY - initialMouseY;

//   graphContainer.scrollLeft = initialGraphX - deltaX;
//   graphContainer.scrollTop = initialGraphY - deltaY;
// });

// window.addEventListener("mouseup", () => {
//   isDragging = false;
// });


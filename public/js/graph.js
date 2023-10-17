import { createNodesFromDataBase } from "./createNodesFromDataBase";

const RADIUS = 60;
export const nodes = [];

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const graphContainer = document.getElementById("graphContainer");
const canvas = document.getElementById("nodeCanvas");

window.onload = function () {
  graphContainer.scrollTop = (canvas.clientHeight / 2) - graphContainer.clientHeight / 2;
  graphContainer.scrollLeft = (canvas.clientWidth / 2) - graphContainer.clientWidth / 2;
};

const ctx = canvas.getContext("2d");

export class Node {
  constructor(blogTitle, x, y, radius = RADIUS) {

    this.circle = {
      x: x,
      y: y,
      offsetX: 0,
      offsetY: 0,
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

  clickableCircle.addEventListener('mousedown', (event) => {
      const nodeRect = clickableCircle.getBoundingClientRect();
      this.circle.offsetX = event.clientX - nodeRect.left;
      this.circle.offsetY = event.clientY - nodeRect.top;
      this.circle.isDragging = true;
    });

    clickableCircle.addEventListener('mousemove', (event) => {
      if (this.circle.isDragging === false) return;

      const newLeft = ((event.clientX + graphContainer.scrollLeft) - this.circle.radius) + this.circle.offsetX;
      const newTop = ((event.clientY + graphContainer.scrollTop) - this.circle.radius) + this.circle.offsetY;

      requestAnimationFrame(() => {
        clickableCircle.style.left = newLeft + 'px';
        clickableCircle.style.top = newTop + 'px';

        this.circle.x = newLeft;
        this.circle.y = newTop;

      });

      clickableCircle.addEventListener('mouseup', () => {
        this.circle.isDragging = false;
      });

    });
  }
}

createNodesFromDataBase();

export function drawLine(node1, node2) {
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


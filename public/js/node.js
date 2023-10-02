// Create an SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", 800);
svg.setAttribute("height", 800);

// Create a circle element
const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", 50);
circle.setAttribute("cy", 100);
circle.setAttribute("r", 20);
circle.setAttribute("fill", "lightblue");

svg.appendChild(circle);

// Append the SVG element to the HTML document
document.body.appendChild(svg);

// JavaScript for making the circle draggable
let isDragging = false;
let offsetX, offsetY;

circle.addEventListener("mousedown", (e) => {
  isDragging = true;
  currentCircle = circle;
  offsetX = e.clientX - parseFloat(circle.getAttribute("cx"));
  offsetY = e.clientY - parseFloat(circle.getAttribute("cy"));
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    circle.setAttribute("cx", newX);
    circle.setAttribute("cy", newY);
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
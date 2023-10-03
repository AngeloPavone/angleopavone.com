const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 800;
// Create an SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", VIEWPORT_WIDTH);
svg.setAttribute("height", VIEWPORT_HEIGHT);

// Append the SVG element to the HTML document
document.body.appendChild(svg);

class Node {
  constructor( x = VIEWPORT_WIDTH / 2, y = VIEWPORT_HEIGHT / 2, radius = 15, color = "lightblue") {
    // Create a circle element
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", color);

    // Append the circle to the SVG element
    svg.appendChild(circle);

    // JavaScript for making the circle draggable
    let isDragging = false;
    let offsetX, offsetY;

    circle.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - parseFloat(circle.getAttribute("cx"));
      offsetY = e.clientY - parseFloat(circle.getAttribute("cy"));
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        circle.setAttribute("cx", newX.toString());
        circle.setAttribute("cy", newY.toString());
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }
}

const node0 = new Node();
const node1 = new Node();
const node2 = new Node();
const node3 = new Node();
const node4 = new Node();
const node5 = new Node();

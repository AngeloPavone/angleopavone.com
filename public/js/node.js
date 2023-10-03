const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 800;
// Create an SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", VIEWPORT_WIDTH);
svg.setAttribute("height", VIEWPORT_HEIGHT);

// Append the SVG element to the HTML document
document.body.appendChild(svg);

class Node {
  constructor(
    blogTitle,
    x = VIEWPORT_WIDTH / 2,
    y = VIEWPORT_HEIGHT / 2,
    radius = 20, color = "lightblue",
  ) {

    const Node = {
      isDragging:  false
    }

    const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
    anchor.setAttribute("href", "/posts/fuck");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", color);
    circle.setAttribute("id", blogTitle);

    svg.appendChild(anchor);
    anchor.appendChild(circle)

    let offsetX, offsetY;

    circle.addEventListener("mousedown", (e) => {
      Node.isDragging = true;
      offsetX = e.clientX - parseFloat(circle.getAttribute("cx"));
      offsetY = e.clientY - parseFloat(circle.getAttribute("cy"));
    });

    document.addEventListener("mousemove", (e) => {
      if (Node.isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        circle.setAttribute("cx", newX.toString());
        circle.setAttribute("cy", newY.toString());
      }
    });

    document.addEventListener("mouseup", () => {
      Node.isDragging = false;
    });

  }
}

const node0 = new Node();

const node = new Node();

console.log(Node.isDragging);

const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 800;
const RADIUS = 30;
const COLOR = "#FFFFFFFF"

function createSVG(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", VIEWPORT_WIDTH);
  svg.setAttribute("height", VIEWPORT_HEIGHT);

  return svg;
}

const svg = document.body.appendChild(createSVG(VIEWPORT_WIDTH, VIEWPORT_HEIGHT));

export class Node {
  constructor(
    blogTitle,
    x = VIEWPORT_WIDTH / 2,
    y = VIEWPORT_HEIGHT / 2,
    radius = RADIUS, color = COLOR,
    isDragging = false,
  ) {

    const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
    anchor.setAttribute("href", `/posts/${blogTitle}`);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", color);
    circle.setAttribute("id", blogTitle);
    circle.setAttribute("style", "pointer-events: auto")

    svg.appendChild(anchor);
    anchor.appendChild(circle);

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
        circle.setAttribute("style", "pointer-events: none")
      }
    });

    document.addEventListener("mouseup", (e) => {
      isDragging = false;
      circle.setAttribute("style", "pointer-events: auto")
    });
  }
}

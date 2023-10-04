const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 800;
const RADIUS = 30;
const COLOR = "#883388FF"

// const canvas = document.getElementById("nodeCanvas");
// const canvasContext = canvas.getContext("2d");

// function loadSVGtoCanvas(img) {
//   var img = new Image();
//   img.onload = function() {
//     canvasContext.drawImage(img, 0, 0);
//   }
// }


const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", VIEWPORT_WIDTH);
svg.setAttribute("height", VIEWPORT_HEIGHT);

document.body.appendChild(svg);

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
    anchor.appendChild(circle)

    // loadSVGtoCanvas(svg);

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

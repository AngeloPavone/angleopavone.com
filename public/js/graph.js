const nodeSVG = document.getElementById("nodeSVG");
const graphContainer = document.getElementById("graphContainer");
const VIEWPORT_MIN = nodeSVG.clientWidth / 2 - graphContainer.clientWidth / 2;
const VIEWPORT_MAX = nodeSVG.clientWidth / 2 + graphContainer.clientWidth / 2;
const RADIUS = 30;
const COLOR = "#FFFFFFFF"

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

graphContainer.getAttribute("width");
graphContainer.getAttribute("height");

let isDragging = false;
let initialMouseX, initialMouseY;
let initialGraphX, initialGraphY;

graphContainer.addEventListener("mousedown", (event) => {
  const target = event.target.tagName;
  if (target === "circle") return;
  isDragging = true;
  initialMouseX = event.clientX;
  initialMouseY = event.clientY;
  initialGraphX = graphContainer.scrollLeft;
  initialGraphY = graphContainer.scrollTop;
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - initialMouseX;
  const deltaY = event.clientY - initialMouseY;

  graphContainer.scrollLeft = initialGraphX - deltaX;
  graphContainer.scrollTop = initialGraphY - deltaY;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

class nodeDragHandler {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    element.addEventListener("mousedown", (e) => this.startDrag(e));
    document.addEventListener("mousemove", (e) => this.onDrag(e));
    document.addEventListener("mouseup", () => this.endDrag());
  }

  startDrag(e) {
    this.isDragging = true;
    this.offsetX = e.clientX - parseFloat(this.element.getAttribute("cx"));
    this.offsetY = e.clientY - parseFloat(this.element.getAttribute("cy"));
  }

  onDrag(e) {
    if (this.isDragging) {
      const newX = e.clientX - this.offsetX;
      const newY = e.clientY - this.offsetY;
      this.element.setAttribute("cx", newX.toString());
      this.element.setAttribute("cy", newY.toString());
      this.element.setAttribute("style", "pointer-events: none");
    }
  }

  endDrag() {
    this.isDragging = false;
    this.element.setAttribute("style", "pointer-events: auto")
  }
}


export class Node {
  constructor(blogTitle, x = randomNumber(VIEWPORT_MIN, VIEWPORT_MAX), y = randomNumber(VIEWPORT_MIN, VIEWPORT_MAX), radius = RADIUS, color = COLOR) {

    const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
    anchor.setAttribute("href", `/posts/${blogTitle}`);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x.toString());
    circle.setAttribute("cy", y.toString());
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", color);
    circle.setAttribute("id", blogTitle);

    nodeSVG.appendChild(anchor);
    anchor.appendChild(circle);

    new nodeDragHandler(circle);

    this.circle = circle;
  }

  getCircle() {
    return this.circle;
  }
}

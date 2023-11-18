export const nodeSVG = document.getElementById("nodeSVG");
export const graphContainer = document.getElementById("graphContainer");
const VIEWPORT_MIN = nodeSVG.clientWidth / 2 - graphContainer.clientWidth / 2;
const VIEWPORT_MAX = nodeSVG.clientWidth / 2 + graphContainer.clientWidth / 2;
const RADIUS = 30;
const COLOR = "#FFFFFFFF"

export const nodes = [];

function randomNumber(min, max) {
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

      drawLine(nodes[0], nodes[1]);
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

    anchor.appendChild(circle);
    nodeSVG.appendChild(anchor);
    graphContainer.appendChild(nodeSVG);

    new nodeDragHandler(circle);

    this.circle = circle;
  }

  getCircle() {
    return this.circle;
  }
}

export function drawLine(source, destination) {
  if (!source || !destination) {
    console.error("ERROR: could not find source and or destination node(s)");
    return 1;
  }

  const sourceCircle = source.circle;
  const destinationCircle = destination.circle;

  const lineId = `line_${source.circle.id}_${destination.circle.id}`;

  const existingLine = document.getElementById(lineId)

  if (existingLine) {
    const x1 = parseFloat(sourceCircle.getAttribute("cx"));
    const y1 = parseFloat(sourceCircle.getAttribute("cy"));
    const x2 = parseFloat(destinationCircle.getAttribute("cx"));
    const y2 = parseFloat(destinationCircle.getAttribute("cy"));

    existingLine.setAttribute("id", lineId);
    existingLine.setAttribute("x1", x1.toString());
    existingLine.setAttribute("y1", y1.toString());
    existingLine.setAttribute("x2", x2.toString());
    existingLine.setAttribute("y2", y2.toString());
    existingLine.setAttribute("stroke", "red");
    existingLine.setAttribute("stroke-width", "2");
  } else {
    const x1 = parseFloat(sourceCircle.getAttribute("cx"));
    const y1 = parseFloat(sourceCircle.getAttribute("cy"));
    const x2 = parseFloat(destinationCircle.getAttribute("cx"));
    const y2 = parseFloat(destinationCircle.getAttribute("cy"));

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("id", lineId);
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "2");

    const firstChild = nodeSVG.firstChild;

    nodeSVG.insertBefore(line, firstChild);
  }
}

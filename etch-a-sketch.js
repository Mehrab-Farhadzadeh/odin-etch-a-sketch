function setDimensionsOfSquareDiv(squareDivNode, canvas, maxRow, maxCol) {
  const canvasWidth = window.getComputedStyle(canvas).width.slice(0, -2);
  const canvasHeight = window.getComputedStyle(canvas).height.slice(0, -2);
  squareDivNode.style.width = `${canvasWidth / maxCol}px`;
  squareDivNode.style.height = `${canvasHeight / maxRow}px`;
}
function createGrid(maxRow, maxCol) {
  const container = document.querySelector("div.container");
  for (let row = 0; row < maxRow; row++) {
    const rowContainerDiv = document.createElement("div");
    rowContainerDiv.classList.add("row");
    rowContainerDiv.classList.add(`${row}`);
    for (let col = 0; col < maxCol; col++) {
      const colDiv = document.createElement("div");
      colDiv.classList.add("col");
      colDiv.classList.add(`${col}`);
      setDimensionsOfSquareDiv(colDiv, container, maxRow, maxCol);
      rowContainerDiv.appendChild(colDiv);
    }
    container.appendChild(rowContainerDiv);
  }
}

function addEventListenerToGridSquares(eventName, callback) {
  const squares = document.querySelectorAll("div.col");
  squares.forEach((square) => {
    square.addEventListener(eventName, callback);
  });
}
function removeEventListenerFromGridSquares(eventName, callback) {
  const squares = document.querySelectorAll("div.col");
  squares.forEach((square) => {
    square.removeEventListener(eventName, callback);
  });
}

function increaseBgColorOpacity(event = new MouseEvent()) {
  const currentBgColor = window.getComputedStyle(event.target).backgroundColor;
  if (!currentBgColor.includes("rgba")) return;
  const currentOpacity = currentBgColor.slice(-4, -1);
  event.target.style.backgroundColor = `${currentBgColor.slice(0, -4)}${
    +currentOpacity + 0.1
  })`;
}
function createAnEtchASketch(maxRow, maxCol) {
  createGrid(maxRow, maxCol);
  addEventListenerToGridSquares("mouseover", increaseBgColorOpacity);
}

function removePreviousGrid() {
  const body = document.querySelector("body");
  body.removeChild(body.firstElementChild);
  const container = document.createElement("div");
  container.classList.add("container");
  body.insertBefore(container, body.firstElementChild);
}
function getSquaresPerSideAndRebuildTheCanvas() {
  let MAX_ROW;
  let MAX_COL;
  MAX_ROW = MAX_COL = prompt(
    "Enter the number of squares per side? (MAX: 100)"
  );
  if (MAX_ROW > 100) MAX_ROW = MAX_COL = 100;
  removePreviousGrid();
  createAnEtchASketch(MAX_ROW, MAX_COL);
}

function generateARandomRGB() {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return `rgb(${R}, ${G}, ${B})`;
}
function setARandomBgColor(event) {
  event.target.style.backgroundColor = generateARandomRGB();
}
function toggleRainbowMode(event) {
  if (!event.target.classList.value.includes("active")) {
    removeEventListenerFromGridSquares("mouseover", increaseBgColorOpacity);
    addEventListenerToGridSquares("mouseover", setARandomBgColor);
  } else {
    removeEventListenerFromGridSquares("mouseover", setARandomBgColor);
    addEventListenerToGridSquares("mouseover", increaseBgColorOpacity);
  }
  event.target.classList.toggle("active");
}

function addClickEventToButton(buttonNode, callback) {
  buttonNode.addEventListener("click", callback);
}

addClickEventToButton(
  document.querySelector("button.setDensity"),
  getSquaresPerSideAndRebuildTheCanvas
);
addClickEventToButton(
  document.querySelector("button.rainbowMode"),
  toggleRainbowMode
);
createAnEtchASketch(16, 16);

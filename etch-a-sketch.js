let MAX_ROW;
let MAX_COL;

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
      setDimensionsOfSquareDiv(colDiv, container);
      rowContainerDiv.appendChild(colDiv);
    }
    container.appendChild(rowContainerDiv);
  }
}

function setDimensionsOfSquareDiv(squareDivNode, canvas) {
  const canvasWidth = window.getComputedStyle(canvas).width.slice(0, -2);
  const canvasHeight = window.getComputedStyle(canvas).height.slice(0, -2);
  squareDivNode.style.width = `${canvasWidth / MAX_COL}px`;
  squareDivNode.style.height = `${canvasHeight / MAX_ROW}px`;
}

function addEventListenerToGridSquares(eventName, callback) {
  const squares = document.querySelectorAll("div.col");
  squares.forEach((square) => {
    square.addEventListener(eventName, callback);
  });
}

function removePreviousGrid() {
  const body = document.querySelector("body");
  body.removeChild(body.firstElementChild);
  const container = document.createElement("div");
  container.classList.add("container");
  body.insertBefore(container, body.firstElementChild);
}

function getSquaresPerSideAndRebuildTheGrid() {
  MAX_ROW = MAX_COL = prompt(
    "Enter the number of squares per side? (MAX: 100)"
  );
  if (MAX_ROW > 100) MAX_ROW = MAX_COL = 100;
  removePreviousGrid();
  createGrid(MAX_ROW, MAX_COL);
  addEventListenerToGridSquares("mouseover", (event) =>
    event.target.classList.add("mouseover")
  );
}

function addClickEventToButton(buttonNode, callback) {
  buttonNode.addEventListener("click", callback);
}

addClickEventToButton(
  document.querySelector("button.setDensity"),
  getSquaresPerSideAndRebuildTheGrid
);

// getSquaresPerSideAndRebuildTheGrid();

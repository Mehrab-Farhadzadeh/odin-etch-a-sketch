const MAX_ROW = getSquaresPerSide();
const MAX_COL = MAX_ROW;

function createGrid(rowSize, colSize) {
  const container = document.querySelector("div.container");
  for (let row = 0; row < MAX_ROW; row++) {
    const rowContainerDiv = document.createElement("div");
    rowContainerDiv.classList.add("row");
    rowContainerDiv.classList.add(`${row}`);
    for (let col = 0; col < MAX_COL; col++) {
      const colDiv = document.createElement("div");
      colDiv.classList.add("col");
      colDiv.classList.add(`${col}`);
      setDimensionOfSquareDiv(colDiv, container);
      rowContainerDiv.appendChild(colDiv);
    }
    container.appendChild(rowContainerDiv);
  }
}

function getSquaresPerSide() {
  return prompt("Enter the number of squares per side? (MAX: 100)");
}

function setDimensionOfSquareDiv(squareDivNode, container) {
  const canvasWidth = window.getComputedStyle(container).width.slice(0, -2);
  const canvasHeight = window.getComputedStyle(container).height.slice(0, -2);
  squareDivNode.style.width = `${canvasWidth / MAX_COL}px`;
  squareDivNode.style.height = `${canvasHeight / MAX_ROW}px`;
}

function addEventListenerToGridSquares(eventName, callback) {
  const squares = document.querySelectorAll("div.col");
  squares.forEach((square) => {
    square.addEventListener(eventName, callback);
  });
}

function addHoverClassToEvent(event) {
  event.target.classList.add("mouseover");
}

createGrid(MAX_ROW, MAX_COL);
addEventListenerToGridSquares("mouseover", addHoverClassToEvent);

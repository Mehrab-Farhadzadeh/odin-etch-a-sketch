const MAX_ROW = 16;
const MAX_COL = 16;

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
      rowContainerDiv.appendChild(colDiv);
    }
    container.appendChild(rowContainerDiv);
  }
}

function addEventListenertoGridSquares(eventName, callback) {
  const squares = document.querySelectorAll("div.col");
  squares.forEach((square) => {
    square.addEventListener(eventName, callback);
  });
}

function addHoverClassToEvent(event) {
  event.target.classList.add("mouseover");
}

createGrid(MAX_ROW, MAX_COL);
addEventListenertoGridSquares("mouseover", addHoverClassToEvent);

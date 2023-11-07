import Player from "./player";

const elements = {
  info: document.querySelector("#info"),
  name: document.querySelector("#name"),
  boardPlacer: document.querySelector("#board-placer"),
  board1: document.querySelector("#board1"),
  board2: document.querySelector("#board2"),
};

const placeHover = (squareId) => {
  const square = document.querySelector("#" + squareId);
  const length = shipTypes[0][1];
  const id = Number(square.getAttribute("data-i"));

  const hoverPlacement = player1.hoverPlacement(id, length, horizontal);

  if (hoverPlacement !== false) {
    highlightSquares(hoverPlacement);
  } else {
    clearPlacementBoard();
  }
};

const highlightSquares = (squares) => {
  clearPlacementBoard();
  squares.forEach((s) => {
    const square = document.querySelector("#bp-" + s);
    square.classList.add("green");
  });
};

const clearPlacementBoard = () => {
  for (let i = 0; i < 8 * 8; i++) {
    const square = document.querySelector("#bp-" + i);
    square.classList.remove("green");
    square.classList.remove("red");
  }
};

const makeBoard = (callsign) => {
  const div = document.createElement("div");
  div.classList.add("board");
  for (let i = 0; i < 8 * 8; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = callsign + i;
    square.setAttribute("data-i", i);

    div.appendChild(square);

    square.addEventListener("mouseover", function () {
      placeHover(square.id);
    });
  }
  return div;
};

const shipTypes = [
  ["scout", 2],
  ["boat", 3],
  ["cruiser", 4],
  ["battleship", 4],
];

const horizontal = true;

const player1 = new Player("Player One");
const ai = new Player("ai");

elements.boardPlacer.appendChild(makeBoard("bp-"));

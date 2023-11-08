import Player from "./player";

const elements = {
  info: document.querySelector("#info"),
  name: document.querySelector("#name"),
  horizontal: document.querySelector("#horizontal-button"),
  boardPlacer: document.querySelector("#board-placer"),
  board1: document.querySelector("#board1"),
  board2: document.querySelector("#board2"),
};

const placeHover = (squareId) => {
  if (gameLoop == true) return;

  const square = document.querySelector("#" + squareId);
  const length = shipTypes[0][1];
  const id = Number(square.getAttribute("data-i"));

  const hoverPlacement = player1.hoverPlacement(id, length, horizontal);

  if (hoverPlacement !== false) {
    highlightSquares(hoverPlacement);
  } else {
    clearPlacementBoard();
  }

  return hoverPlacement;
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

    if (player1.gameboard.board[i] !== "") {
      square.classList.add("yellow");
    }
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
    square.addEventListener("click", function () {
      if (placeHover(square.id)) {
        player1.placeShip(shipTypes[0][0], i, shipTypes[0][1], horizontal);

        shipTypes.shift();
        if (shipTypes.length <= 0) {
          startGame();
        } else elements.info.textContent = "Place your " + shipTypes[0][0];
      }
    });
  }
  return div;
};

function removeAllEventListenersFromChildren(element) {
  const childNodes = element.childNodes;

  childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Clone the event listeners
      const listeners = Object.assign({}, child.__handlers);

      // Remove each event listener
      for (const eventType in listeners) {
        listeners[eventType].forEach((listener) => {
          child.removeEventListener(eventType, listener);
        });
      }
    }

    // Recursively process child elements
    removeAllEventListenersFromChildren(child);
  });
}

const startGame = () => {
  gameLoop = true;

  //get name
  const playerName = elements.name.value;
  player1.name = playerName;

  //hide new game stuff
  const newGame = document.querySelector("#new-game");
  newGame.style.display = "none";
  removeAllEventListenersFromChildren(newGame);

  //Update elements
  elements.info.textContent = "Choose a square to fire a missile at";
  const player1Name = document.querySelector("#player1-name");
  player1Name.textContent = playerName;
  const player2Name = document.querySelector("#player2-name");
  player2Name.textContent = ai.name;

  //make boards
  elements.board1.appendChild(makeBoard("b1-"));
  elements.board2.appendChild(makeBoard("b2-"));
};

const drawBoards = (board, showShips) => {};

const shipTypes = [
  ["scout", 2],
  ["boat", 3],
  ["cruiser", 4],
  ["battleship", 4],
];

let horizontal = true;
let gameLoop = false;

const player1 = new Player("Player One");
const ai = new Player("ai");

elements.boardPlacer.appendChild(makeBoard("bp-"));
elements.horizontal.addEventListener("click", () => {
  if (horizontal) {
    horizontal = false;
    elements.horizontal.textContent = "Vertical";
  } else {
    horizontal = true;
    elements.horizontal.textContent = "Horizontal";
  }
});

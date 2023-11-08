/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = new Array(8 * 8).fill(\"\");\n    this.ships = {};\n  }\n\n  shipsRemaining() {\n    let shipsLeft = 0;\n\n    for (const key in this.ships) {\n      const ship = this.ships[key];\n      if (ship.sunk === false) shipsLeft += 1;\n    }\n\n    return shipsLeft;\n  }\n\n  receiveAttack(attack) {\n    const square = this.board[attack];\n    if (square === \"hit\" || square === \"miss\") return null;\n\n    if (square === \"\") {\n      this.board[attack] = \"miss\";\n      return \"miss\";\n    } else {\n      const shipName = this.board[attack];\n      this.ships[shipName].hit();\n      this.board[attack] = \"hit\";\n      return shipName;\n    }\n  }\n\n  hoverPlacement(startSquare, length, horizontal) {\n    const squares = this.canPlaceShip(startSquare, length, horizontal);\n    if (squares == false) return false;\n\n    if (this.isShipBlocking(squares)) return false;\n\n    return squares;\n  }\n\n  placeShip(name, startSquare, length, horizontal) {\n    const squares = this.canPlaceShip(startSquare, length, horizontal);\n    if (squares == false) return false;\n\n    if (this.isShipBlocking(squares)) return false;\n\n    squares.forEach((square) => {\n      this.board[square] = name;\n    });\n\n    this.ships[name] = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, squares);\n\n    return true;\n  }\n\n  isShipBlocking(squares) {\n    return squares.some((square) => {\n      return (\n        this.board[square] !== \"\" &&\n        this.board[square] !== \"hit\" &&\n        this.board[square] !== \"miss\"\n      );\n    });\n  }\n\n  canPlaceShip(startSquare, length, horizontal) {\n    if (startSquare < 0 || startSquare > this.board.length) return false;\n\n    if (horizontal) {\n      const mod1 = startSquare % 8;\n      const mod2 = (startSquare + length - 1) % 8;\n      if (mod2 < mod1) return false;\n\n      const squares = [];\n      for (let i = 0; i < length; i++) {\n        squares.push(startSquare + i);\n      }\n      return squares;\n    }\n\n    if (horizontal == false) {\n      if (startSquare + (length - 1) * 8 < this.board.length) {\n        const squares = [];\n        for (let i = 0; i < length; i++) {\n          squares.push(startSquare + i * 8);\n        }\n        return squares;\n      }\n      return false;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nconst elements = {\n  info: document.querySelector(\"#info\"),\n  name: document.querySelector(\"#name\"),\n  horizontal: document.querySelector(\"#horizontal-button\"),\n  boardPlacer: document.querySelector(\"#board-placer\"),\n  board1: document.querySelector(\"#board1\"),\n  board2: document.querySelector(\"#board2\"),\n};\n\nconst placeHover = (squareId) => {\n  if (gameLoop == true) return;\n\n  const square = document.querySelector(\"#\" + squareId);\n  const length = shipTypes[0][1];\n  const id = Number(square.getAttribute(\"data-i\"));\n\n  const hoverPlacement = player1.hoverPlacement(id, length, horizontal);\n\n  if (hoverPlacement !== false) {\n    highlightSquares(hoverPlacement);\n  } else {\n    clearPlacementBoard();\n  }\n\n  return hoverPlacement;\n};\n\nconst highlightSquares = (squares) => {\n  clearPlacementBoard();\n  squares.forEach((s) => {\n    const square = document.querySelector(\"#bp-\" + s);\n    square.classList.add(\"green\");\n  });\n};\n\nconst clearPlacementBoard = () => {\n  for (let i = 0; i < 8 * 8; i++) {\n    const square = document.querySelector(\"#bp-\" + i);\n    square.classList.remove(\"green\");\n    square.classList.remove(\"red\");\n\n    if (player1.gameboard.board[i] !== \"\") {\n      square.classList.add(\"yellow\");\n    }\n  }\n};\n\nconst makeBoard = (callsign, placer = false, clickable = false) => {\n  const div = document.createElement(\"div\");\n  div.classList.add(\"board\");\n  for (let i = 0; i < 8 * 8; i++) {\n    const square = document.createElement(\"div\");\n    square.classList.add(\"square\");\n    square.id = callsign + i;\n    square.setAttribute(\"data-i\", i);\n\n    div.appendChild(square);\n\n    if (placer) {\n      //Add specific eventlisteners for placer board\n      square.addEventListener(\"mouseover\", function () {\n        placeHover(square.id);\n      });\n      square.addEventListener(\"click\", function () {\n        if (placeHover(square.id)) {\n          player1.placeShip(shipTypes[0][0], i, shipTypes[0][1], horizontal);\n\n          shipTypes.shift();\n          if (shipTypes.length <= 0) {\n            startGame();\n          } else elements.info.textContent = \"Place your \" + shipTypes[0][0];\n        }\n      });\n    } else if (clickable) {\n      //Add specific listeners for game board\n      square.addEventListener(\"click\", function () {\n        const moveResult = player1.move(ai, i);\n        if (moveResult == \"miss\") elements.info.textContent = \"Missile missed!\";\n        else elements.info.textContent = \"You hit a \" + moveResult;\n\n        drawBoards(\"b1-\", player1, true);\n        drawBoards(\"b2-\", ai, false);\n\n        let shipsRemaining = player1.gameboard.shipsRemaining();\n        if (shipsRemaining <= 0) endGame(player1.name + \" loses!\");\n        shipsRemaining = ai.gameboard.shipsRemaining();\n        if (shipsRemaining <= 0) endGame(ai.name + \" loses!\");\n      });\n    }\n  }\n  return div;\n};\n\nfunction endGame(text) {\n  elements.info.textContent = text;\n  removeAllEventListenersFromChildren(elements.board1);\n  removeAllEventListenersFromChildren(elements.board2);\n}\n\nfunction removeAllEventListenersFromChildren(element) {\n  const childNodes = element.childNodes;\n\n  childNodes.forEach((child) => {\n    if (child.nodeType === Node.ELEMENT_NODE) {\n      // Clone the event listeners\n      const listeners = Object.assign({}, child.__handlers);\n\n      // Remove each event listener\n      for (const eventType in listeners) {\n        listeners[eventType].forEach((listener) => {\n          child.removeEventListener(eventType, listener);\n        });\n      }\n    }\n\n    // Recursively process child elements\n    removeAllEventListenersFromChildren(child);\n  });\n}\n\nconst startGame = () => {\n  gameLoop = true;\n\n  //get name\n  const playerName = elements.name.value;\n  player1.name = playerName;\n\n  //hide new game stuff\n  const newGame = document.querySelector(\"#new-game\");\n  newGame.style.display = \"none\";\n  removeAllEventListenersFromChildren(newGame);\n\n  //Update elements\n  elements.info.textContent = \"Choose a square to fire a missile at\";\n  const player1Name = document.querySelector(\"#player1-name\");\n  player1Name.textContent = playerName;\n  const player2Name = document.querySelector(\"#player2-name\");\n  player2Name.textContent = ai.name;\n\n  //make boards\n  elements.board1.appendChild(makeBoard(\"b1-\", false, false));\n  elements.board2.appendChild(makeBoard(\"b2-\", false, true));\n\n  clearBoard(\"b1-\", player1, true);\n};\n\nconst drawBoards = (callsign, player, showShips) => {\n  clearBoard(callsign, player, showShips);\n};\n\nconst clearBoard = (callsign, player, showShips) => {\n  for (let i = 0; i < 8 * 8; i++) {\n    const square = document.querySelector(\"#\" + callsign + i);\n    square.classList.remove(\"green\");\n    square.classList.remove(\"red\");\n    square.classList.remove(\"blue\");\n    square.classList.remove(\"yellow\");\n\n    if (player.gameboard.board[i] !== \"\") {\n      if (player.gameboard.board[i] == \"hit\") square.classList.add(\"red\");\n      else if (player.gameboard.board[i] == \"miss\")\n        square.classList.add(\"green\");\n      else if (showShips) square.classList.add(\"yellow\");\n    }\n  }\n};\n\nconst shipTypes = [\n  [\"scout\", 2],\n  [\"boat\", 3],\n  [\"cruiser\", 4],\n  [\"battleship\", 4],\n];\n\nlet horizontal = true;\nlet gameLoop = false;\n\nconst player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player One\");\nconst ai = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"ai\");\nai.aiSetShips();\n\nelements.boardPlacer.appendChild(makeBoard(\"bp-\", true));\nelements.horizontal.addEventListener(\"click\", () => {\n  if (horizontal) {\n    horizontal = false;\n    elements.horizontal.textContent = \"Vertical\";\n  } else {\n    horizontal = true;\n    elements.horizontal.textContent = \"Horizontal\";\n  }\n});\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.myTurn = true;\n  }\n\n  hoverPlacement(startSquare, length, horizontal) {\n    return this.gameboard.hoverPlacement(startSquare, length, horizontal);\n  }\n\n  placeShip(name, startSquare, length, horizontal) {\n    return this.gameboard.placeShip(name, startSquare, length, horizontal);\n  }\n\n  setTurn(turn, player = null) {\n    this.myTurn = turn;\n\n    let shipsRemaining = this.gameboard.shipsRemaining();\n    if (shipsRemaining <= 0) {\n      return this.name + \" loses!\";\n    }\n\n    if (turn === true && this.name === \"ai\") {\n      this.aiMove(player);\n    }\n  }\n\n  getBoard() {\n    return this.gameboard.board;\n  }\n\n  receiveAttack(attack) {\n    return this.gameboard.receiveAttack(attack);\n  }\n\n  move(player, square) {\n    if (this.myTurn === false) return;\n\n    const moveState = player.gameboard.receiveAttack(square);\n    if (moveState === null) return;\n\n    //next players turn\n    this.setTurn(false);\n    player.setTurn(true, this);\n\n    return moveState;\n  }\n\n  aiSetShips() {\n    this.placeShip(\"boat\", 0, 2, true);\n    this.placeShip(\"scout\", 4, 3, true);\n    this.placeShip(\"cruiser\", 9, 5, false);\n    this.placeShip(\"battleship\", 58, 4, true);\n  }\n\n  aiMove(player) {\n    const board = player.getBoard();\n    let move = board[Math.floor(Math.random() * 64)];\n    let moveContains = board[move];\n    let count = 0;\n    while (moveContains === \"miss\" || moveContains === \"hit\" || count < 2000) {\n      move = Math.floor(Math.random() * 64);\n      moveContains = board[move];\n      count += 1;\n    }\n\n    const moveState = player.gameboard.receiveAttack(move);\n\n    //next players turn\n    this.setTurn(false);\n    player.setTurn(true);\n\n    return moveState;\n  }\n}\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(name, squares) {\n    this.name = name;\n    this.hits = 0;\n    this.sunk = false;\n    this.squares = squares;\n  }\n\n  hit() {\n    this.hits += 1;\n    this.isSunk();\n  }\n\n  isSunk() {\n    if (this.hits >= this.squares.length) {\n      this.sunk = true;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://odin-battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
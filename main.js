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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = new Array(8 * 8).fill(\"\");\n    this.ships = {};\n  }\n\n  shipsRemaining() {\n    let shipsLeft = 0;\n\n    for (const key in this.ships) {\n      const ship = this.ships[key];\n      if (ship.sunk === false) shipsLeft += 1;\n    }\n\n    return shipsLeft;\n  }\n\n  receiveAttack(attack) {\n    const square = this.board[attack];\n    if (square === \"hit\" || square === \"miss\") return null;\n\n    if (square === \"\") {\n      this.board[attack] = \"miss\";\n      return \"miss\";\n    } else {\n      const shipName = this.board[attack];\n      console.log(shipName);\n      this.ships[shipName].hit();\n      this.board[attack] = \"hit\";\n      return shipName;\n    }\n  }\n\n  hoverPlacement(startSquare, length, horizontal) {\n    const squares = this.canPlaceShip(startSquare, length, horizontal);\n    if (squares == false) return false;\n\n    if (this.isShipBlocking(squares)) return false;\n\n    return squares;\n  }\n\n  placeShip(name, startSquare, length, horizontal) {\n    const squares = this.canPlaceShip(startSquare, length, horizontal);\n    if (squares == false) return false;\n\n    if (this.isShipBlocking(squares)) return false;\n\n    squares.forEach((square) => {\n      this.board[square] = name;\n    });\n\n    this.ships[name] = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, squares);\n\n    return true;\n  }\n\n  isShipBlocking(squares) {\n    return squares.some((square) => {\n      return (\n        this.board[square] !== \"\" &&\n        this.board[square] !== \"hit\" &&\n        this.board[square] !== \"miss\"\n      );\n    });\n  }\n\n  canPlaceShip(startSquare, length, horizontal) {\n    if (startSquare < 0 || startSquare > this.board.length) return false;\n\n    if (horizontal) {\n      const mod = (startSquare + length - 1) % 8;\n      if (mod < length) return false;\n\n      const squares = [];\n      for (let i = 0; i < length; i++) {\n        squares.push(startSquare + i);\n      }\n      return squares;\n    }\n\n    if (horizontal == false) {\n      if (startSquare + (length - 1) * 8 < this.board.length) {\n        const squares = [];\n        for (let i = 0; i < length; i++) {\n          squares.push(startSquare + i * 8);\n        }\n        return squares;\n      }\n      return false;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://odin-battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nconst elements = {\n  info: document.querySelector(\"#info\"),\n  name: document.querySelector(\"#name\"),\n  boardPlacer: document.querySelector(\"#board-placer\"),\n  board1: document.querySelector(\"#board1\"),\n  board2: document.querySelector(\"#board2\"),\n};\n\nconst placeHover = (squareId) => {\n  const square = document.querySelector(\"#\" + squareId);\n  const length = shipTypes[0][1];\n  const id = Number(square.getAttribute(\"data-i\"));\n\n  const hoverPlacement = player1.hoverPlacement(id, length, horizontal);\n\n  if (hoverPlacement !== false) {\n    highlightSquares(hoverPlacement);\n  } else {\n    clearPlacementBoard();\n  }\n};\n\nconst highlightSquares = (squares) => {\n  clearPlacementBoard();\n  squares.forEach((s) => {\n    const square = document.querySelector(\"#bp-\" + s);\n    square.classList.add(\"green\");\n  });\n};\n\nconst clearPlacementBoard = () => {\n  for (let i = 0; i < 8 * 8; i++) {\n    const square = document.querySelector(\"#bp-\" + i);\n    square.classList.remove(\"green\");\n    square.classList.remove(\"red\");\n  }\n};\n\nconst makeBoard = (callsign) => {\n  const div = document.createElement(\"div\");\n  div.classList.add(\"board\");\n  for (let i = 0; i < 8 * 8; i++) {\n    const square = document.createElement(\"div\");\n    square.classList.add(\"square\");\n    square.id = callsign + i;\n    square.setAttribute(\"data-i\", i);\n\n    div.appendChild(square);\n\n    square.addEventListener(\"mouseover\", function () {\n      placeHover(square.id);\n    });\n  }\n  return div;\n};\n\nconst shipTypes = [\n  [\"scout\", 2],\n  [\"boat\", 3],\n  [\"cruiser\", 4],\n  [\"battleship\", 4],\n];\n\nconst horizontal = true;\n\nconst player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player One\");\nconst ai = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"ai\");\n\nelements.boardPlacer.appendChild(makeBoard(\"bp-\"));\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nclass Player {\n  constructor(name) {\n    this.name = name;\n    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.myTurn = true;\n  }\n\n  hoverPlacement(startSquare, length, horizontal) {\n    return this.gameboard.hoverPlacement(startSquare, length, horizontal);\n  }\n\n  placeShip(name, startSquare, length, horizontal) {\n    return this.gameboard.placeShip(name, startSquare, length, horizontal);\n  }\n\n  setTurn(turn, player = null) {\n    this.myTurn = turn;\n\n    let shipsRemaining = this.gameboard.shipsRemaining();\n    if (shipsRemaining <= 0) {\n      console.log(this.name + \" loses!\");\n    }\n\n    if (turn === true && this.name === \"ai\") {\n      this.aiMove(player);\n    }\n  }\n\n  getBoard() {\n    return this.gameboard.board;\n  }\n\n  receiveAttack(attack) {\n    return this.gameboard.receiveAttack(attack);\n  }\n\n  move(player, square) {\n    if (this.myTurn === false) return;\n\n    const moveState = player.gameboard.receiveAttack(square);\n    if (moveState === null) return;\n\n    //next players turn\n    this.setTurn(false);\n    player.setTurn(true);\n\n    return moveState;\n  }\n\n  aiMove(player) {\n    const board = player.getBoard();\n    let move = board[Math.floor(Math.random() * 64)];\n    let moveContains = board[move];\n    let count = 0;\n    while (moveContains === \"miss\" || moveContains === \"hit\" || count < 2000) {\n      move = Math.floor(Math.random() * 64);\n      moveContains = board[move];\n      count += 1;\n    }\n\n    const moveState = player.gameboard.receiveAttack(move);\n\n    //next players turn\n    this.setTurn(false);\n    player.setTurn(true);\n\n    return moveState;\n  }\n}\n\n\n//# sourceURL=webpack://odin-battleship/./src/player.js?");

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
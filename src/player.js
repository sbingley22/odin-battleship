import Gameboard from "./gameboard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.myTurn = true;
  }

  hoverPlacement(startSquare, length, horizontal) {
    return this.gameboard.hoverPlacement(startSquare, length, horizontal);
  }

  placeShip(name, startSquare, length, horizontal) {
    return this.gameboard.placeShip(name, startSquare, length, horizontal);
  }

  setTurn(turn, player = null) {
    this.myTurn = turn;

    let shipsRemaining = this.gameboard.shipsRemaining();
    if (shipsRemaining <= 0) {
      return this.name + " loses!";
    }

    if (turn === true && this.name === "ai") {
      this.aiMove(player);
    }
  }

  getBoard() {
    return this.gameboard.board;
  }

  receiveAttack(attack) {
    return this.gameboard.receiveAttack(attack);
  }

  move(player, square) {
    if (this.myTurn === false) return;

    const moveState = player.gameboard.receiveAttack(square);
    if (moveState === null) return;

    //next players turn
    this.setTurn(false);
    player.setTurn(true, this);

    return moveState;
  }

  aiSetShips() {
    this.placeShip("boat", 0, 2, true);
    this.placeShip("scout", 4, 3, true);
    this.placeShip("cruiser", 9, 5, false);
    this.placeShip("battleship", 58, 4, true);
  }

  aiMove(player) {
    const board = player.getBoard();
    let move = board[Math.floor(Math.random() * 64)];
    let moveContains = board[move];
    let count = 0;
    while (moveContains === "miss" || moveContains === "hit" || count < 2000) {
      move = Math.floor(Math.random() * 64);
      moveContains = board[move];
      count += 1;
    }

    const moveState = player.gameboard.receiveAttack(move);

    //next players turn
    this.setTurn(false);
    player.setTurn(true);

    return moveState;
  }
}

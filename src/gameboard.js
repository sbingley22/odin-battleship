import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = new Array(8 * 8).fill("");
    this.ships = {};
  }

  shipsRemaining() {
    let shipsLeft = 0;

    for (const key in this.ships) {
      const ship = this.ships[key];
      if (ship.sunk == false) shipsLeft += 1;
    }

    return shipsLeft;
  }

  receiveAttack(attack) {
    const square = this.board[attack];
    if (square === "hit" || square === "miss") return null;

    if (square === "") {
      this.board[attack] = "miss";
      return "miss";
    } else {
      const shipName = this.board[attack];
      this.ships[shipName].hit(attack);
      this.board[attack] = "hit";
      return shipName;
    }
  }

  placeShip(name, startSquare, length, horizontal) {
    const squares = this.canPlaceShip(startSquare, length, horizontal);
    if (squares == false) return false;

    if (this.isShipBlocking(squares)) return false;

    squares.forEach((square) => {
      this.board[square] = name;
    });

    this.ships[name] = new Ship(name, squares);

    return true;
  }

  isShipBlocking(squares) {
    return squares.some((square) => {
      return (
        this.board[square] !== "" &&
        this.board[square] !== "hit" &&
        this.board[square] !== "miss"
      );
    });
  }

  canPlaceShip(startSquare, length, horizontal) {
    if (startSquare < 0 || startSquare > this.board.length) return false;

    if (horizontal) {
      const mod = (startSquare + length - 1) % 8;
      if (mod < length) return false;

      const squares = [];
      for (let i = 0; i < length; i++) {
        squares.push(startSquare + i);
      }
      return squares;
    }

    if (horizontal == false) {
      if (startSquare + (length - 1) * 8 < this.board.length) {
        const squares = [];
        for (let i = 0; i < length; i++) {
          squares.push(startSquare + i * 8);
        }
        return squares;
      }
      return false;
    }
  }
}

export default class Gameboard {
  constructor() {
    this.board = new Array(8 * 8).fill("");
  }

  canPlaceShip(name, startSquare, length, horizontal) {
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

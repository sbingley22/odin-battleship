export default class Ship {
  constructor(name, squares) {
    this.name = name;
    this.hits = 0;
    this.sunk = false;
    this.squares = squares;
  }

  hit(missile) {
    this.squares.forEach((square) => {
      if (square === missile) {
        this.hits += 1;
        this.isSunk();
      }
    });
  }

  isSunk() {
    if (this.hits >= this.squares.length) {
      this.sunk = true;
    }
  }
}

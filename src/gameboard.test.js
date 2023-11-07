import Gameboard from "./gameboard";

const gameboard = new Gameboard();

describe("test ship placement", () => {
  it("tests horizontal placement as false", () => {
    expect(gameboard.canPlaceShip(6, 3, true)).toBe(false);
  });
  it("tests horizontal placement as valid", () => {
    expect(gameboard.canPlaceShip(5, 3, true)).toEqual([5, 6, 7]);
  });

  it("tests vertical placement as false", () => {
    expect(gameboard.canPlaceShip(55, 3, false)).toBe(false);
  });
  it("tests vertical placement as valid", () => {
    expect(gameboard.canPlaceShip(47, 3, false)).toEqual([47, 55, 63]);
  });

  it("places ship ontop of another", () => {
    gameboard.board[3] = "ship";
    expect(gameboard.isShipBlocking([1, 2, 3])).toBe(true);
  });
  it("places ship ontop of another", () => {
    gameboard.board[3] = "ship";
    expect(gameboard.placeShip("cruise", 1, 3, true)).toBe(false);
  });
  it("places ship ontop of another", () => {
    gameboard.board[3] = "ship";
    gameboard.placeShip("cruise", 1, 3, true);
    expect(gameboard.board[3]).toEqual("ship");
  });

  it("places ship near another", () => {
    gameboard.board[(3, 11)] = "ship";
    expect(gameboard.placeShip("cruise", 1, 3, false)).toBe(true);
  });
  it("places ship near another", () => {
    gameboard.board[(3, 11)] = "ship";
    gameboard.placeShip("cruise", 1, 3, false);
    expect(gameboard.board[1] == "cruise");
  });
});

describe("ship attacks", () => {
  it("recieves attack that misses", () => {
    expect(gameboard.receiveAttack(7)).toBe("miss");
  });

  it("recieves attack that hits", () => {
    gameboard.placeShip("battle", 4, 4, true);
    expect(gameboard.receiveAttack(7)).toBe("battle");
  });
});

describe("sunken ships", () => {
  beforeEach(() => {
    gameboard.placeShip("battle", 4, 3, true);
    gameboard.placeShip("boat", 1, 2, true);
  });

  it("returns 2 ships left", () => {
    expect(gameboard.shipsRemaining()).toBe(2);
  });

  it("returns 2 ships left", () => {
    gameboard.receiveAttack(1);
    expect(gameboard.shipsRemaining()).toBe(2);
  });

  it("returns 1 ship left", () => {
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(2);
    expect(gameboard.shipsRemaining()).toBe(1);
  });

  it("returns 1 ship left", () => {
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(2);
    gameboard.receiveAttack(3);
    gameboard.receiveAttack(4);
    gameboard.receiveAttack(5);
    expect(gameboard.shipsRemaining()).toBe(0);
  });
});

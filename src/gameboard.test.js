import Gameboard from "./gameboard";

const gameboard = new Gameboard();

describe("test ship placement", () => {
  it("tests horizontal placement as false", () => {
    expect(gameboard.canPlaceShip("boat", 6, 3, true)).toBe(false);
  });
  it("tests horizontal placement as valid", () => {
    expect(gameboard.canPlaceShip("boat", 5, 3, true)).toEqual([5, 6, 7]);
  });

  it("tests vertical placement as false", () => {
    expect(gameboard.canPlaceShip("boat", 55, 3, false)).toBe(false);
  });
  it("tests vertical placement as valid", () => {
    expect(gameboard.canPlaceShip("boat", 47, 3, false)).toEqual([47, 55, 63]);
  });
});

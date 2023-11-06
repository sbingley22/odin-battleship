//const Ship = require("./ship");
import Ship from "./ship";

describe("ship functions", () => {
  let testCarrier;

  beforeEach(() => {
    testCarrier = new Ship("carrier", [0, 1, 2, 3]);
  });

  it("accepts a hit", () => {
    testCarrier.hit(1);
    expect(testCarrier.hits).toBe(1);
  });

  it("rejects a hit", () => {
    testCarrier.hit(9);
    expect(testCarrier.hits).toBe(0);
  });

  it("accepts 4 hits", () => {
    testCarrier.hit(0);
    testCarrier.hit(1);
    testCarrier.hit(2);
    testCarrier.hit(3);
    expect(testCarrier.hits).toBe(4);
  });

  it("gets sunk", () => {
    testCarrier.hit(0);
    testCarrier.hit(1);
    testCarrier.hit(2);
    testCarrier.hit(3);
    expect(testCarrier.sunk).toBeTruthy();
  });
});

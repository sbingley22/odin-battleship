import Player from "./player";

describe("player misses", () => {
  let player;
  let ai;

  beforeEach(() => {
    player = new Player("Player One");
    ai = new Player("Ai");
  });

  it("fires a miss at Ais board", () => {
    expect(player.move(ai, 6)).toBe("miss");
  });

  it("fires a miss at Players board", () => {
    expect(ai.aiMove(player, 62)).toBe("miss");
  });
});

describe("player hits", () => {
  let player;
  let ai;

  beforeEach(() => {
    player = new Player("Player One");
    ai = new Player("Ai");

    player.placeShip("scout", 5, 2, true);
    player.placeShip("carrier", 15, 4, false);

    ai.placeShip("scout", 1, 2, true);
    ai.placeShip("carrier", 25, 4, false);
  });

  it("fires a hit at Ais board", () => {
    expect(player.move(ai, 1)).toBe("scout");
  });

  it("fires a legal shot at Players board", () => {
    expect(ai.aiMove(player)).not.toBeNull();
  });
});

const Gameboard = (function () {
  const CELLS = 9;

  const board = Array(CELLS).fill(null);
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const player1 = createPlayer("sinskiy", "x");
const player2 = createPlayer("kilwinta", "o");

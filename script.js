const gameboard = (function () {
  return {};
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  return {};
})();

const player1 = createPlayer("1", "x");
const player2 = createPlayer("2", "o");
console.log({ player1, player2 });

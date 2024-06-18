const Gameboard = (function () {
  const CELLS = 9;

  const board = Array(CELLS).fill(null);

  let players = [];
  let active = 0;

  const playGame = (player1, player2) => {
    players = [player1, player2];
    while (true) {
      playRound();
    }
  };

  const playRound = () => {
    let choice = -1;
    while (isInvalidChoice()) {
      choice = Number(prompt("choice")) - 1;
    }

    markCell(players[active].mark, choice);
    switchPlayerTurn();

    function isInvalidChoice() {
      return isNaN(choice) || choice < 0 || choice > 8;
    }

    function markCell(playerMark, cellPosition) {
      board[cellPosition] = playerMark;
    }
    function switchPlayerTurn() {
      const lastPlayerIndex = players.length - 1;
      if (active === lastPlayerIndex) {
        active = 0;
      } else {
        active++;
      }
    }
    console.log(board);
  };

  return { playGame };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const player1 = createPlayer("sinskiy", "x");
const player2 = createPlayer("kilwinta", "o");
Gameboard.playGame(player1, player2);

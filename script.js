const gameboard = (function () {
  const gameboard = Array(9).fill(null);
  let players = [];
  let player = 0;
  const startGame = (...newPlayers) => {
    players = newPlayers;
    while (getWinner() === null) {
      const playerObj = players[player];
      const choicePrompt = `${playerObj.name} choice ${gameboard.join()}`;

      let choice = -1;
      while (incorrectChoice()) {
        // arrays are zero-indexed
        choice = Number(prompt(choicePrompt)) - 1;
      }

      markPosition(playerObj.mark, choice);
      passToNextPlayer();

      function incorrectChoice() {
        return isNaN(choice) || choice < 0 || choice > 8 || gameboard[choice];
      }
    }
  };
  function passToNextPlayer() {
    if (player === players.length - 1) {
      player = 0;
    } else {
      player++;
    }
  }
  function markPosition(mark, position) {
    gameboard[position] = mark;
  }
  const getWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      ) {
        return gameboard[a];
      }
    }
    return null;
  };
  return { startGame, getWinner };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  return {};
})();

const player1 = createPlayer("1", "x");
const player2 = createPlayer("2", "o");
gameboard.startGame(player1, player2);

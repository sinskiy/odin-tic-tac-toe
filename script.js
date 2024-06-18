const gameboard = (function () {
  const /* localPlayer1,
    localPlayer2, */
    gameboard = Array(9).fill(null);
  const startGame = (...players) => {
    let currentPlayer = 0;
    // localPlayer1 = player1;
    // localPlayer2 = player2;
    while (getWinner() === null) {
      alert(players[currentPlayer].name);

      passToNextPlayer();
    }
    function passToNextPlayer() {
      if (currentPlayer === players.length - 1) {
        currentPlayer = 0;
      } else {
        currentPlayer++;
      }
    }
  };
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

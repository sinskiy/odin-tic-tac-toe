const gameboard = (function () {
  const BOARD_LENGTH = 9;

  const squares = Array(BOARD_LENGTH).fill(null);
  let players = [];
  let player = 0;
  const startGame = (...newPlayers) => {
    players = newPlayers;
    while (getWinner() === null) {
      const playerObj = players[player];
      const choicePrompt = `${playerObj.name} choice ${squares.join()}`;

      let choice = -1;
      while (incorrectChoice()) {
        // arrays are zero-indexed
        choice = Number(prompt(choicePrompt)) - 1;
      }

      markPosition(playerObj.mark, choice);
      passToNextPlayer();

      function incorrectChoice() {
        return isNaN(choice) || choice < 0 || choice > 8 || squares[choice];
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
    squares[position] = mark;
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
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  return { BOARD_LENGTH, startGame, getWinner };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  let board;
  function createBoard() {
    board = document.createElement("div");
    board.classList.add("board");

    for (let i = 0; i < gameboard.BOARD_LENGTH; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
    }
    document.body.append(board);
  }
  return {
    createBoard,
  };
})();

const player1 = createPlayer("1", "x");
const player2 = createPlayer("2", "o");
displayController.createBoard();
// gameboard.startGame(player1, player2);

const gameboard = (function () {
  const CELLS = 9;

  const board = Array(CELLS).fill(null);

  let players = [];
  let active = 0;

  const playGame = (...newPlayers) => {
    players = newPlayers;
    while (getWinner() === null) {
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
  };

  function getWinner() {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return { board, playGame };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  const boardDiv = document.querySelector(".board");

  function updateBoard() {
    boardDiv.textContent = "";

    for (const i of gameboard.board) {
      const cell = gameboard.board[i];

      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.position = i;

      boardDiv.appendChild(cellButton);
    }
  }

  return { updateBoard };
})();

const player1 = createPlayer("sinskiy", "x");
const player2 = createPlayer("kilwinta", "o");
displayController.updateBoard();

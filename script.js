const gameboard = (function () {
  const CELLS = 9;

  const board = Array(CELLS).fill(null);

  let players = [createPlayer("sinskiy", "x"), createPlayer("kilwinta", "o")];
  let active = 0;

  const playRound = (cellPosition) => {
    console.log(getWinner());
    if (getWinner() !== null) return;

    markCell(players[active].mark, cellPosition);
    switchPlayerTurn();

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

  return { board, players, playRound };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  const boardDiv = document.querySelector(".board");

  function updateBoard() {
    boardDiv.textContent = "";

    for (const i in gameboard.board) {
      const cellMark = gameboard.board[i];

      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.position = Number(i);
      cellButton.innerText = cellMark ?? "";
      cellButton.addEventListener("click", (e) => {
        if (e.currentTarget.innerText) return;

        gameboard.playRound(e.currentTarget.dataset.position);
        updateBoard();
      });

      boardDiv.appendChild(cellButton);
    }
  }

  return { updateBoard };
})();

displayController.updateBoard();

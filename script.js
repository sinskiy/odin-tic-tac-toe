const gameboard = (function () {
  const CELLS = 9;

  const board = Array(CELLS).fill(null);

  let players = [createPlayer("sinskiy", "x"), createPlayer("kilwinta", "o")];
  let active = 0;
  const getActive = () => active;

  const playRound = (cellPosition) => {
    const winner = getWinner();
    if (winner) return winner;
    if (isDraw()) return "draw";

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
  function isDraw() {
    return board.every((cell) => cell);
  }

  return { board, players, getActive, playRound };
})();

function createPlayer(name, mark) {
  return { name, mark };
}

const displayController = (function () {
  const turnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  function updateDOM() {
    boardDiv.textContent = "";

    for (const i in gameboard.board) {
      const cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.position = Number(i);
      cellButton.addEventListener("click", updateCell);

      boardDiv.appendChild(cellButton);
    }
    updateTurn();

    function updateCell(e) {
      const cellPosition = Number(e.currentTarget.dataset.position);
      const result = gameboard.playRound(cellPosition);
      if (result) return;

      const cellMark = gameboard.board[cellPosition];

      e.currentTarget.innerText = cellMark;

      updateTurn();
    }

    function updateTurn() {
      turnDiv.textContent = `${
        gameboard.players[gameboard.getActive()].name
      }'s turn`;
    }
  }

  return { updateDOM };
})();

displayController.updateDOM();

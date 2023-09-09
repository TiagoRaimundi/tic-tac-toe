document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const status = document.getElementById("status");
  const resetButton = document.getElementById("reset-button");

  let currentPlayer = "X";
  let gameOver = false;

  const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  function highlightWinningCells(a, b, c) {
      cells[a].style.backgroundColor = "#90EE90"; // por exemplo, cor de destaque verde claro
      cells[b].style.backgroundColor = "#90EE90";
      cells[c].style.backgroundColor = "#90EE90";
  }

  function checkWinner() {
      for (const combo of winningCombos) {
          const [a, b, c] = combo;
          if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
              highlightWinningCells(a, b, c);
              return cells[a].textContent;
          }
      }

      if ([...cells].every(cell => cell.textContent)) {
          return "Tie";
      }

      return null;
  }

  function handleCellClick(cell) {
      if (cell.textContent || gameOver) return;

      cell.textContent = currentPlayer;

      const winner = checkWinner();

      if (winner) {
          gameOver = true;
          status.textContent = winner === "Tie" ? "Empate!" : `Jogador ${winner} venceu!`;
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          status.textContent = `Jogador ${currentPlayer} vez`;
      }
  }

  function resetGame() {
      cells.forEach(cell => {
          cell.textContent = "";
          cell.style.backgroundColor = "";  // Resetar a cor de destaque das células
      });
      currentPlayer = "X";
      gameOver = false;
      status.textContent = "Jogador X começa";
  }

  cells.forEach(cell => cell.addEventListener("click", () => handleCellClick(cell)));
  resetButton.addEventListener("click", resetGame);
  resetGame();
});

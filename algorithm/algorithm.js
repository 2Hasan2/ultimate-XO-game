let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  
  function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== ""));
  }
  
  function evaluate(board) {
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
        return board[i][0];
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
        return board[0][i];
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
      return board[0][2];
    }
    return null; // No winner
  }
  
  function minimax(board, depth, isMaximizing) {
    const winner = evaluate(board);
  
    if (winner !== null) {
      return winner === "X" ? -1 : 1;
    }
  
    if (isBoardFull(board)) {
      return 0;
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "O";
            const score = minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "X";
            const score = minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  
  function bestMove() {
    let bestScore = -Infinity;
    let move;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O";
          const score = minimax(board, 0, false);
          board[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
  
    return move;
  }

  function computerMove(player){
    let move = bestMove();
    board[move.i][move.j] = player;
  }
/**
 * 
 */
class Computer_XO {
    constructor(board = [], player = "O") {
      this.board = board
      this.player = player
    }
  
    setPlayer(player) {
        this.player = player;
    }
    setBoard(board) {
        this.board = board;
    }
    
    input(board, player = this.player) {
        this.setBoard(board);
        this.setPlayer(player);
        return this.allBestMoves()
    }

    isBoardFull() {
      return this.board.every(row => row.every(cell => cell !== ""));
    }
  
    evaluate() {
      // Check rows for a winner
      for (let i = 0; i < 3; i++) {
        if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== "") {
          return { winner: this.board[i][0], line: `Row ${i + 1}` };
        }
      }
  
      // Check columns for a winner
      for (let i = 0; i < 3; i++) {
        if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== "") {
          return { winner: this.board[0][i], line: `Column ${i + 1}` };
        }
      }
  
      // Check diagonals for a winner
      if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== "") {
        return { winner: this.board[0][0], line: "Diagonal (Top-left to Bottom-right)" };
      }
      if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== "") {
        return { winner: this.board[0][2], line: "Diagonal (Top-right to Bottom-left)" };
      }
  
      return null; // No winner
    }
  
    minimax(depth, isMaximizing) {
      const winner = this.evaluate();
  
      if (winner !== null) {
        return winner.winner === "X" ? -1 : 1;
      }
  
      if (this.isBoardFull()) {
        return 0;
      }
  
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === "") {
              this.board[i][j] = "O";
              const score = this.minimax(depth + 1, false);
              this.board[i][j] = "";
              bestScore = Math.max(score, bestScore);
            }
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === "") {
              this.board[i][j] = "X";
              const score = this.minimax(depth + 1, true);
              this.board[i][j] = "";
              bestScore = Math.min(score, bestScore);
            }
          }
        }
        return bestScore;
      }
    }
  
    allBestMoves() {
      let bestMoves = [];
      let bestScore = -Infinity;
  
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === "") {
            this.board[i][j] = "O";
            const score = this.minimax(0, false);
            this.board[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              bestMoves = [{ i, j }];
            } else if (score === bestScore) {
              bestMoves.push({ i, j });
            }
          }
        }
      }
  
      return bestMoves;
    }

  }

  
  board = [
    ["O", "", "X"],
    ["", "X", ""],
    ["O", "", ""]
  ];

  const computer = new Computer_XO();
  computer.setPlayer("O");
  

  console.log(computer.input(board,"O"));
const boardElement = document.getElementById('board');

// Add cells to the board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', cellClick);
        boardElement.appendChild(cell);
    }
}

function cellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Check if the cell is empty
    if (board[row][col] === "") {
        // Make a move for the player
        board[row][col] = "X";
        updateBoard();
        
        // Check for a winner or a tie
        const winner = evaluate(board);
        if (winner !== null) {
            alert(`${winner} wins!`);
            resetGame();
            return;
        } else if (isBoardFull(board)) {
            alert("It's a tie!");
            resetGame();
            return;
        }

        // Make a move for the computer
        computerMove("O");
        updateBoard();

        // Check for a winner or a tie again
        const newWinner = evaluate(board);
        if (newWinner !== null) {
            alert(`${newWinner} wins!`);
            resetGame();
            return;
        } else if (isBoardFull(board)) {
            alert("It's a tie!");
            resetGame();
            return;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
    });
}

function resetGame() {
    // Clear the board
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    
    // Update the displayed board
    updateBoard();
}

const boardElement = document.getElementById('board');
let overGame= false
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

const resetBtn = document.getElementById('reset')
resetBtn.onclick= () => resetGame()
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
    if (overGame) return;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Check if the cell is empty
    if (board[row][col] === "") {
        // Make a move for the player
        board[row][col] = "X";
        updateBoard()
        
        // Make a move for the computer
        Algorithm(board,"O");
        updateBoard();
      
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
    });
    checkWinOrTie()
}

function checkWinOrTie(){
    const newWinner = evaluate(board);
    if (newWinner !== null) {
        overGame = true
        setTimeout(()=>{
            alert(`${newWinner} wins!`);
        },10)
        return;
    } else if (isBoardFull(board)) {
        overGame = true
        alert("It's a tie!");
        resetGame();
        return;
    }
}

function resetGame() {
    // Clear the board
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    overGame = false
    // Update the displayed board
    updateBoard();
}

const boardElement = document.getElementById('board');
const resetBtn = document.getElementById('reset')
const scoreElement = document.getElementById('score')
let score = getScore()

let overGame= false
let startWith = Math.floor(Math.random() * 2) === 0 ? "X" : "O";
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// Create a computer player with the minimax algorithm
const computer_XO = new Computer_XO()
Computer_XO.board = board;
computer_XO.player = "O";

scoreElement.textContent = `X: ${score.X} - O: ${score.O}`

resetBtn.onclick= () => {
    if (overGame) {
        resetGame()
    }
}

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

// Start the game
if (startWith === "O") {
    computer_XO.input(board)
    let {i, j} = computer_XO.move()
    board[i][j] = "O";
    updateBoard();
}

// Handle a cell click
function cellClick(event) {
    if (overGame) return;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Check if the cell is empty
    if (board[row][col] === "") {
        // Make a move for the player
        board[row][col] = "X";
        updateBoard()


        // computer move
        if (overGame) return;
        computer_XO.input(board)
        let {i, j} = computer_XO.move()
        board[i][j] = "O";
        updateBoard();
    }
}

// Update the board
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col];
    });
    checkWinOrTie()
}

// Check if the game is over
function checkWinOrTie() {
    const checkLine = (a, b, c) => a === b && b === c && a !== "";

    for (let i = 0; i < 3; i++) {
        if (
            checkLine(board[i][0], board[i][1], board[i][2]) ||
            checkLine(board[0][i], board[1][i], board[2][i])) {
            overGame = true
            return updateScore(board[i][i]);
        }
    }

    if (
        checkLine(board[0][0], board[1][1], board[2][2]) ||
        checkLine(board[0][2], board[1][1], board[2][0])) {
        overGame = true

        return updateScore(board[1][1]);
    }

    return board.flat().includes("") ? null : overGame = true;
}

// Update the score
function updateScore(winner) {
    score[winner] += 1;
    scoreElement.textContent = `X: ${score.X} - O: ${score.O}`;
    localStorage.setItem('score-xo', JSON.stringify(score))
}

// get score
function getScore() {
    const score = localStorage.getItem('score-xo')
    if (score) {
        return JSON.parse(score)
    }
    return {
        X: 0,
        O: 0
    }
}

// reset the game
function resetGame() {
    // Clear the board
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    overGame = false
    updateBoard();
}

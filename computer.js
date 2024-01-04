const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function computerMove(gameBoard) {

    const gameBoard2D=[
        gameBoard.slice(0,3),
        gameBoard.slice(3,6),
        gameBoard.slice(6,9),
    ]

    if (checkToWin(gameBoard)) {
        return(checkToWin(gameBoard))
    }
    else if (checkToBlock(gameBoard) != null) {
        return(checkToBlock(gameBoard))
    } else if (gameBoard[4] == "") {
        return(4)
    } else if (nextStep(gameBoard2D).len == 2) {
        let cells = [...checkEmptyRows_2(gameBoard), ...checkEmptyCols_2(gameBoard)];
        return(cells[Math.floor(Math.random() * cells.length)])
    } else if (nextStep(gameBoard2D) == false && gameBoard[4] == 'O') {
        let cells = [...checkEmpty(gameBoard).Corners, ...checkEmpty(gameBoard).Sides];
        return(cells[Math.floor(Math.random() * cells.length)])
    } else if (typeof nextStep(gameBoard2D) == 'object') {
        return(nextStep(gameBoard2D).row * 3 + nextStep(gameBoard2D).cell)
    } else if (gameBoard[4] == 'X' && checkEmpty(gameBoard).num == 8) {
        return(checkEmpty(gameBoard).Corners[Math.floor(Math.random() * checkEmpty(gameBoard).Corners.length)]);
    } else {
        let cells = [...checkEmpty(gameBoard).Corners, ...checkEmpty(gameBoard).Sides];
        return(cells[Math.floor(Math.random() * cells.length)])
    }
}

function checkToWin(gameBoard) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if ((gameBoard[a] == gameBoard[b] && gameBoard[a] == 'O' && gameBoard[c] == '') || (gameBoard[a] == gameBoard[c] && gameBoard[a] == 'O' && gameBoard[b] == '') || (gameBoard[b] == gameBoard[c] && gameBoard[b] == 'O' && gameBoard[a] == '')) {
            return pattern[[gameBoard[a], gameBoard[b], gameBoard[c]].indexOf('')];
        }
    }
    return null;
}


function nextStep(gameBoard2D) {
    let connection = []
    function checkRows(board) {
        let rows = [];
        board.forEach((row, i) => {
            row.join("") == 'X' ? rows.push({ i, row }) : null
        })
        return rows;
    }
    function checkColumns(board) {
        let columns = [];
        board.forEach((column, i) => {

            column.join("") == 'X' ? columns.push({ i, column }) : null
        })
        return columns;

    };
    // create prototype method name "rotate()" rotating 90 to right 
    Array.prototype.rotate = function () {
        const numRows = this.length;
        const numCols = this[0].length;

        const rotatedMatrix = []
        this[0].forEach((_, col) => {
            const newRow = []
            this.forEach(row => {
                newRow.push(row[col])
            });
            rotatedMatrix.push(newRow)
        })

        return rotatedMatrix;
    }
    let rows = checkRows(gameBoard2D)
    let cols = checkColumns(gameBoard2D.rotate())
    rows.forEach(row => {
        cols.forEach(col => {
            col.column[row.i] == "X" ? false : connection.push({ row, col })
        })
    })

    if (connection.length == 1) {
        return { row: connection[0].row.i, cell: connection[0].col.i }
    } else if (connection.length == 2) {
        return { len: connection.length, connection }
    } else {

        return false
    }
}

// check empty cells
function checkEmpty(gameBoard) {
    let Sides = [1, 3, 5, 7].filter((cell) => {
        return gameBoard[cell] == ""
    })
    let Corners = [0, 2, 6, 8].filter((cell) => {
        return gameBoard[cell] == ""

    })
    return { Corners, Sides, num: [...Sides, ...Corners].length };
}

function checkEmptyRows_2(gameBoard) {
    let Array = [];
    [[0, 1, 2], [3, 4, 5], [6, 7, 8],].forEach((row) => {
        let rows = [gameBoard[row[0]], gameBoard[row[1]], gameBoard[row[2]]];
        if (rows.includes("") && rows.includes("O") && !rows.includes('X')) {
            if ([0, 2, 6, 8].includes(row[rows.indexOf('')])) {
                Array.push(row[rows.indexOf("")])
            } else {
                Array.push(row[rows.lastIndexOf("")])
            }
        }
    })
    return Array;
}

function checkEmptyCols_2(gameBoard) {
    let Array = [];
    [[0, 3, 6], [1, 4, 7], [2, 5, 8],].forEach((col) => {
        let cols = [gameBoard[col[0]], gameBoard[col[1]], gameBoard[col[2]]];
        if (cols.includes("") && cols.includes("O") && !cols.includes('X')) {
            if ([0, 2, 6, 8].includes(col[cols.indexOf('')])) {
                Array.push(col[cols.indexOf("")])
            } else {
                Array.push(col[cols.lastIndexOf("")])
            }

        }
    })
    return Array;
}

function checkToBlock(gameBoard) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if ((gameBoard[a] != '' && gameBoard[a] == gameBoard[b] != '' && gameBoard[c] == '') || (gameBoard[a] != '' && gameBoard[a] == gameBoard[c] != '' && gameBoard[b] == '') || (gameBoard[b] != '' && gameBoard[b] == gameBoard[c] && gameBoard[a] == '')) {
            return pattern[[gameBoard[a], gameBoard[b], gameBoard[c]].indexOf('')];
        }
    }
    return null;
}

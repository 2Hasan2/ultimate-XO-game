const arrays = [];

for (let i = 0; i < 9; i++) {
    const array = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    arrays.push(array);
}

let player = "X"
let board = 0;

function switchPlayer(){
    player = player === "X" ? "O" : "X";
}

function play(event,board_index) {
    if (board_index !== board) return;
    if (event.target.innerText !== "") return;
    const { row, col } = event.target.dataset;
    event.target.innerText = player;
    console.log(board, +row, +col);
    arrays[board][+row][+col] = player;
    console.log(arrays[board]);
    board = +row * 3 + +col;
    switchPlayer();
}

// function render() {
//     console.log(arrays[board]);
//     boxes.forEach((index, box) => {
//         const [row, col] = index.split("-");
//         box.innerText = arrays[board][row][col];
//     });
// }
const container = document.querySelector('.box-container')
const boxes = document.querySelectorAll('.box');
const arrays = [];

const win_patterns = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Cross
    [0, 4, 8],
    [2, 4, 6],
];


Resize();
function Resize(){
    const size = Math.min(window.innerWidth, window.innerHeight);
    container.style.width = size + 'px';
    container.style.height = size + 'px';
}
window.addEventListener('resize', () => {Resize()})


boxes.forEach((box,index) => {
    box.id = index;
   for(let i = 0; i < 9; i++){
        const div = document.createElement('div');
        div.classList.add('XO-box');
        div.dataset.row = Math.floor(i / 3);
        div.dataset.col = i % 3;
        box.appendChild(div);
        div.addEventListener('click', (e) => {
           play(e, index)
        })
   }
})

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
    arrays[board][+row][+col] = player;
    if (checkWin()) {
       freeze(board); 
    }
    board = +row * 3 + +col;
    switchPlayer();
    render();
}

function render() {
    boxes.forEach((box, index) => {
        box = [...box.children];
        box.forEach((cell) => {
            const { row, col } = cell.dataset;
            cell.innerText = arrays[index][+row][+col];
        });
    });
}

function checkWin() {
    const array = arrays[board];
    for (let i = 0; i < win_patterns.length; i++) {
        const [a, b, c] = win_patterns[i];
        if (array[Math.floor(a / 3)][a % 3] !== "" && array[Math.floor(a / 3)][a % 3] === array[Math.floor(b / 3)][b % 3] && array[Math.floor(a / 3)][a % 3] === array[Math.floor(c / 3)][c % 3]) {
            return array[Math.floor(a / 3)][a % 3];
        }
    }
    return null;
}

function freeze(board) {
    boxes[board].classList.add('freeze');
    [...boxes[board].children].forEach((cell, i) => {
        const { row, col } = cell.dataset;
        const array = arrays[board];
        for (let i = 0; i < win_patterns.length; i++) {
            const [a, b, c] = win_patterns[i];
            if (array[Math.floor(a / 3)][a % 3] !== "" && array[Math.floor(a / 3)][a % 3] === array[Math.floor(b / 3)][b % 3] && array[Math.floor(a / 3)][a % 3] === array[Math.floor(c / 3)][c % 3]) {
                if (a === +row * 3 + +col || b === +row * 3 + +col || c === +row * 3 + +col) {
                    cell.classList.add('win');
                }
            }
        }
    })   
}

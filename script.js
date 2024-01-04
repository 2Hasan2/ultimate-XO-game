const container = document.querySelector('.box-container')
const boxes = document.querySelectorAll('.box');
const arrays = [];


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
    console.log(arrays[board]);
    board = +row * 3 + +col;
    render();
    switchPlayer();
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
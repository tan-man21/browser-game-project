//Establish Rows and Columns
let rows = 6;
let columns = 7;
let playerRed = 'R';
let playerBlack = 'B';
let currentPlayer = getCurrentPlayer();

let board;
let gameOver = false;


window.onload = async () => {
    setUpGame()
}
async function selectPlayer(){
    let gameBoard = document.getElementById('board')
    let startContainer = document.getElementById('start_container')
    gameBoard.style.opacity = 1
    await getCurrentPlayer()
    startContainer.remove()
}

function setUpGame() {
    board = []
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
            row.push(' ');

            let slot = document.createElement('div');
            slot.id = r.toString() + '-' + c.toString();
            slot.classList.add('slot');
            slot.addEventListener('click', playerTurn)
            document.getElementById('board').append(slot)
        }
        board.push(row);
    }
    console.log(board)
}

//get current player
function getCurrentPlayer() {
    let ele = document.getElementsByName('playerSelection');

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            if(ele[i].value === 'redPlayer'){
                currentPlayer = playerRed
            } else if(ele[i].value === 'blackPlayer'){
                currentPlayer = playerBlack
            }
        }
    }
}

function playerTurn(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    console.log(r + ',' + c)
}
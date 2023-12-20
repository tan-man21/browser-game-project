//Establish Rows and Columns
let rows = 6;
let columns = 7;
let playerRed = 'R';
let playerYellow = 'Y';
let currentPlayer = getCurrentPlayer();
let currentColumns;

let board;
let gameOver = false;


// window.onload = async () => {
//     setUpGame()
// }
async function selectPlayer(){
    let gameBoard = document.getElementById('board')
    let startContainer = document.getElementById('start_container')
    let title = document.getElementById('title')
    gameBoard.style.opacity = 1
    await getCurrentPlayer()
    console.log(currentPlayer)
    await startContainer.remove()
    await title.remove()
    setUpGame()
}

function setUpGame() {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

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
}

//get current player
function getCurrentPlayer() {
    let ele = document.getElementsByName('playerSelection');

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            if(ele[i].value === 'redPlayer'){
                currentPlayer = playerRed
            } else if(ele[i].value === 'yellowPlayer'){
                currentPlayer = playerYellow
            }
        }
    }
}
//Iterating through each turn until winner is found
function playerTurn(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    if(r < 0){
        return;
    }

    board[r][c] = currentPlayer;
    let slot = document.getElementById(r.toString() + '-' + c.toString());
    if(currentPlayer === playerYellow){
        slot.classList.add('yellow-piece')
        currentPlayer = playerRed
    } else if(currentPlayer === playerRed){
        slot.classList.add('red-piece')
        currentPlayer = playerYellow
    }

    r -= 1;
    currentColumns[c] = r;

    // checkWinner()
}
//Checking for winner function
function checkWinner(){

}

//clear board with restart button
function clearBoard(){
    let spots = document.getElementsByClassName('slot');

    for(i = 0; spots.length; i++){
        let spot = spots[i]

        if(spot.classList.contains('yellow-piece')){
            spot.classList.remove('yellow-piece')
        }else if(spot.classList.contains('red-piece')){
            spot.classList.remove('red-piece')
        }
}
}
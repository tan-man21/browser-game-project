//Establish Rows and Columns
let rows = 6;
let columns = 7;
let playerRed = 'Red';
let playerYellow = 'Yellow';
let currentPlayer = getCurrentPlayer();
let currentColumns;

let board;
let gameOver = false;
let restart = false;


// window.onload = async () => {
//     setUpGame()
// }
async function selectPlayer(){
    let gameBoard = document.getElementById('board')
    let startContainer = document.getElementById('start_container')
    let title = document.getElementById('title')
    gameBoard.style.opacity = 1
    await getCurrentPlayer()
    startContainer.style.display = 'none';
    title.style.display = 'none';
    
    if(restart === false){
        setUpGame();
        restart = true;
    }
}

async function turnDisplay(){
    let redTurn = document.getElementById('red_turn');
    let yellowTurn = document.getElementById('yellow_turn');

    await getCurrentPlayer()

    if(currentPlayer === playerRed){
        redTurn.style.visibility = 'visible'
        yellowTurn.style.visibility = 'hidden'
    }else if(currentPlayer === playerYellow){
        yellowTurn.style.visibility = 'visible'
        redTurn.style.visibility = 'hidden'
    }
}

async function setUpGame() {
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

    turnDisplay()
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
    let redTurn = document.getElementById('red_turn');
    let yellowTurn = document.getElementById('yellow_turn')
    if(gameOver){
        return;
    }

    if(currentPlayer === playerRed){
        yellowTurn.style.visibility = 'visible'
        redTurn.style.visibility = 'hidden'
    }else if(currentPlayer === playerYellow){
        redTurn.style.visibility = 'visible'
        yellowTurn.style.visibility = 'hidden'
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

    checkWinner()
}
//Checking for winner function
function checkWinner(){
    //check horizantally
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    };
    //check vertically
    for(let c = 0; c < columns; c++){
        for(let r = 0; r < rows - 3; r++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    };
    //check diagonally up and to right
    for(let r = 3; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    };
    //check diagonally down and to right
    for(let r = 0; r < rows - 3; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    };
}

function createRedWinner(){
    let popUp = document.createElement('div');
    popUp.classList.add('popup');
    popUp.id = 'red-popup';
    popUp.textContent = 'Red Wins!'
    document.body.append(popUp)
}

function createYellowWinner(){
    let popUp = document.createElement('div');
    popUp.classList.add('popup');
    popUp.id = 'yellow-popup';
    popUp.textContent = 'Yellow Wins'
    document.body.append(popUp)
}

function setWinner(r, c){
    if(board[r][c] == playerRed){
        createRedWinner()
    }else{
        createYellowWinner()
    }

    gameOver = true;
}

//clear board with restart button
async function clearBoard(){
    let spots = document.getElementsByClassName('slot');
    let startContainer = document.getElementById('start_container');
    let title = document.getElementById('title');

    for(i = 0; i < spots.length; i++){
        let spot = spots[i]

        if(spot.classList.contains('yellow-piece')){
            spot.classList.remove('yellow-piece')
        }else if(spot.classList.contains('red-piece')){
            spot.classList.remove('red-piece')
        }
    }
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    let redTurn = document.getElementById('red_turn');
    let yellowTurn = document.getElementById('yellow_turn');

    if(currentPlayer === playerRed){
        redTurn.style.visibility = 'hidden'
    }else if(currentPlayer === playerYellow){
        yellowTurn.style.visibility = 'hidden'
    }

    startContainer.style.display = 'flex';
    title.style.display = 'flex';

    let redPopUp = document.getElementById('red-popup');
    if(redPopUp){
        redPopUp.remove();
    }
    let yellowPopUp = document.getElementById('yellow-popup')
    if(yellowPopUp){
        yellowPopUp.remove();
    }

    gameOver = false;
}

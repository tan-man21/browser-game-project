//Establish Rows and Columns
let rows = 6
let columns = 7

let board = []

window.onload = async () => {
    setUpGame()
}
function selectPlayer(){
    let gameBoard = document.getElementById('board')
    let startContainer = document.getElementById('start_container')
    gameBoard.style.opacity = 1
    startContainer.remove()

}

function setUpGame() {
    for(let i = 0; i < rows; i++){
        let newRowDiv = document.createElement('div')
        newRowDiv.classList = 'slot'
        newRowDiv.id = `0 - ${[i]}`
        document.getElementById('board').appendChild(newRowDiv)
        for(let j = 1; j < columns; j++){
            let newColDiv = document.createElement('div')
            newColDiv.classList = 'slot'
            newColDiv.id = `${[i]} - ${[j+1]}`
            document.getElementById('board').appendChild(newColDiv)
        }
    }
}
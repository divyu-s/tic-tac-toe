const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["","","","","","","","",""];

const winningMessage = ()=> `Player ${currentPlayer} has won!`;

const drawMessage = () => `Game ended in a draw`;

const currentPlayerTurn = ()=> `Its's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
         gameState[clickedCellIndex] = currentPlayer;
         clickedCell.innerHTML = currentPlayer;
}
const winingConditions = [
   [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],

];
function handleResultValidation(){
    let roundWon = false;
    for(let i=0;i<winingConditions.length;i++){
        let condition = winingConditions[i];
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];
        if(a==="" || b==="" || c===""){
            continue;
        }
        if(a===b && b===c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive=false;
        return;
    }
    //handle draw condition
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange(){
         currentPlayer=currentPlayer==="X"?"0":"X";
         statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick (clickCellEvent){
       const clickedCell = clickCellEvent.target;
       const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
       if(gameState[clickedCellIndex]!=="" || !gameActive){
           return;
       }
     //if everything is fine
     
     //change the state of cell
     //check if somebody won after that click
     handleCellPlayed(clickedCell,clickedCellIndex);
     handleResultValidation();
}

function handleRestartGame (){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=>cell.innerHTML="");
}
document
      .querySelectorAll(".cell")
          .forEach((cell)=>cell.addEventListener("click",handleCellClick));

document.querySelector(".game--restart").addEventListener("click",handleRestartGame);




let text = document.getElementById('text');
let restartBtn = document.getElementById('btn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winner = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_letter = "O";
const X_letter = "X";

let currentPlayer = X_letter;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerWon() !== false){
            text.innerHTML =`${currentPlayer} has WON !`;
            let winningBlocks = playerWon();
            winningBlocks.map(box => boxes[box].style.backgroundColor=winner);
            return ;
        }

        currentPlayer = currentPlayer == X_letter ? O_letter : X_letter;
    }
    if(noWinner() == true){
        text.innerHTML =`No Winner!`;
        return;
    }
}

function noWinner(){
    let len=0;
    spaces.forEach((element)=> {
        if(element !== null){
            len++;
        }
    });
    if(len==9){
        return true;
    }
    return false;
    
}

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


function playerWon(){
    for(let condition of winCombos){
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[b] == spaces[c])){
            return [a,b,c];
        }
    }
    return false;
}

restartBtn.addEventListener('click',()=>{
    location.reload();
})

startGame();

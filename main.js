//initial variables
const playerRed = 'R',
playerYellow = 'Y';

let currentPlayer = playerRed;
let gameOver = false;
let board;
const currentColumns = [5,5,5,5,5,5,5];


const rows = 6,
columns = 7;

//loading the game page
window.onload = function(){
    setGame();
};

function setGame() {
    board = [];
    // currentColumns = [5,5,5,5,5,5,5];

    for (let r = 0; r< rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ') // JS
            //DOM "HTML" part <div id='0-0' class='tile'></div>
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.getElementById('board').append(tile);
        }
        board.push(row);
    };
};

function setPiece(){
    if (gameOver){
        return;
    }

    let coords = this.id.split('-');  //'0-0' -> ['0','0']

    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    if (r < 0){
        return;
    }

    board[r][c] = currentPlayer;
   
    let tile = document.getElementById(r.toString() + '-' + c.toString());

    if(currentPlayer === playerRed){
        tile.classList.add('red-piece');
        document.getElementById('turn').innerText ="Yellow";
        document.getElementById('turn').style.color ="yellow";
        currentPlayer = playerYellow;
    } else {
        tile.classList.add('yellow-piece');
        document.getElementById('turn').innerText ="Red";
        document.getElementById('turn').style.color ="red";
        currentPlayer = playerRed;
    }

    r -= 1;  //updating the row height for the column
    currentColumns[c] = r; //updating the array
    checkWinner();
};

function checkWinner() {
    //checking horizontally
    for (let r = 0; r< rows; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' '){
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]){
                    setWinner(r,c);
                    return;
                };
            };
        };
    };

    //checking vertically
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 3; r++){
            if (board[r][c] != ' '){
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]){
                    setWinner(r,c);
                    return;
                };
            };
        };
    };

    // checking anti diagonally
    for (let r = 0;r < rows -3; r++){
        for (let c = 0;c < columns - 3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                };
            };
        };
    };

    //checking diagonally
    for (let r= 0; r < rows; r++){
        for (let c= 0; c < columns -3; c++){
            if (board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                };
            };
        };
    };
};

function setWinner(r,c){
    const winner = document.getElementById('winner');
    if(board[r][c] == playerRed){
        winner.innerText = 'Red wins 🔴 🎉';
        
    } else  {
        winner.innerText = 'Yellow wins 🟡 🎉 ';
    } 

    gameOver = true;
    setTimeout(function(){
        window.location.reload();  
        }, 5000);
   
};
const ticTacToe = document.querySelector("#tic-tac-toe");
const newGameButton = document.querySelector("#new-game");
const playerButton = document.querySelector("#change-player");
const playerButtonSpan = playerButton.querySelector("#change-value");

const originalItemBg = getComputedStyle(document.documentElement).getPropertyValue("--tictactoe-item-bg").trim();
const playOrder = [true, false, true, false, true, false, true, false, true];

let gameCount = 0;
let currentPlayer = localStorage.getItem("player") || "✖️";
let currentBot = currentPlayer === "✖️" ? "⭕" : "✖️";
let gameStarted = false;
let gameEnded = false;

let finalMessage = "OOOO, meu lençol dobrado";

Array.from(ticTacToe.children).forEach(child => {
    child.addEventListener("mouseenter", () => mouseEnter(child));
    child.addEventListener("mouseleave", () => mouseLeave(child));
});

Array.from(ticTacToe.children).forEach(child => {
    child.addEventListener("click", () => {
        if(child.clicked && child.clicked === "true") return;
        if(playOrder[gameCount] === false) return;

        play(child, currentPlayer);
        botPlay();
    });
});

newGameButton.addEventListener("click", () => clear());

playerButton.addEventListener("click", () => changePlayer());

playerButtonSpan.textContent = ` ${currentBot}`;

function getNumber(length){
    return Math.floor(Math.random() * length);
}

function mouseEnter(child){
    if(child.clicked && child.clicked === "true") return;

    child.style.backgroundColor = currentPlayer === "✖️" ? "blue" : "red";
}

function mouseLeave(child){
    if(child.clicked && child.clicked === "true") return;

    child.style.backgroundColor = originalItemBg;
}

function getWinner(value){
    if(value === currentPlayer){
        alert("Player won!");
    } else if(value === currentBot) {
        alert("Bot won!");
    } else {
        alert("Tie!");
    }

    gameEnded = true;
}

function verify(){
    const elements = Array.from(ticTacToe.children).map(cell => cell.textContent.trim());

    let board = [
        elements.slice(0, 3),
        elements.slice(3, 6),
        elements.slice(6, 9)
    ];

    for (let linha of board) {
        if (linha[0] === linha[1] && linha[1] === linha[2] && linha[0] !== "") {
            getWinner(linha[0]);
            return;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            getWinner(board[0][i]);
            return;
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        getWinner(board[0][0]);
        return;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        getWinner(board[0][2]);
        return;
    }

    if(gameCount >= playOrder.length){
        getWinner();
        return;
    }

    return;
}

function play(child, mark){
    child.textContent = mark;
    child.clicked = "true";
    gameStarted = true;
    child.removeEventListener("mouseenter", mouseEnter);
    child.removeEventListener("mouseleave", mouseLeave);
    child.style.backgroundColor = originalItemBg;
    gameCount++;

    verify()

    if(gameEnded){
        clear();
        gameEnded = false;
    }
}

function botPlay(){
    if(playOrder[gameCount] === true) return;

    let ids = [];
    Array.from(ticTacToe.children).forEach(child => {
        if(child.clicked === "true") return;
        ids.push(parseInt(child.id));
    });

    const id = ids[getNumber(ids.length)];
    const element = document.getElementById(id.toString());
    play(element, currentBot);
}

function clear(){
    Array.from(ticTacToe.children).forEach(child => {
        child.textContent = "";
        child.clicked = "false";
    });

    gameCount = 0;
    gameStarted = false;
}

function changePlayer(){
    if(gameStarted) return;

    if(currentPlayer === "✖️") currentPlayer = "⭕";
    else currentPlayer = "✖️";

    currentBot = currentPlayer === "✖️" ? "⭕" : "✖️";
    localStorage.setItem("player", currentPlayer);
    playerButtonSpan.textContent = ` ${currentBot}`;
}
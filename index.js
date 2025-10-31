const ticTacToe = document.querySelector("#tic-tac-toe");
const newGameButton = document.querySelector("#new-game");
const playerButton = document.querySelector("#change-player");

const originalItemBg = document.querySelector(":")

let currentPlayer = localStorage.getItem("player") || "✖️";
let gameStarted = false;

Array.from(ticTacToe.children).forEach(child => {
    child.addEventListener("mouseenter", () =>{
        if(child.clicked && child.clicked === "true") return;

        child.style.backgroundColor = currentPlayer === "✖️" ? "blue" : "red";
    });

    child.addEventListener("mouseleave", () =>{
        if(child.clicked && child.clicked === "true") return;

        child.style.backgroundColor = originalBG;
    });
});

Array.from(ticTacToe.children).forEach(child => {
    child.addEventListener("click", () => {
        if(child.clicked && child.clicked === "true") return;

        child.textContent = currentPlayer;
        gameStarted = true;
        child.clicked = "true";
        child.removeEventListener("mouseenter");
        child.removeEventListener("mouseleave");
        child.style.backgroundColor = ;
    });
});

newGameButton.addEventListener("click", () => {
    Array.from(ticTacToe.children).forEach(child => {
        child.textContent = "";
    });
});

function changePlayer(){
    if(isDuringMatch()) return;

    if(currentPlayer === "✖️") currentPlayer = "⭕";
    else currentPlayer = "✖️";
    localStorage.setItem("player", currentPlayer);
}
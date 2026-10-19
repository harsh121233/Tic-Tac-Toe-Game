let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector('#reset-button');
let winner = document.querySelector('#winner');

let turnX = true;
let count = 0;
const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    winner.classList.add("hide");
};

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.textContent = "X";
            turnX = false;
        } else {
            box.textContent = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});
const showDraw = () => {
    winner.textContent = "Game is a Draw";
    winner.classList.remove("hide");
};

const showWinner = (winnerName) => {
    winner.textContent = `Winner is ${winnerName}`;
    winner.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].textContent;
        let pos2 = boxes[pattern[1]].textContent;
        let pos3 = boxes[pattern[2]].textContent;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};
resetButton.addEventListener("click", resetGame);
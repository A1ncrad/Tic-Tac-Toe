const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
const restartBtn = document.getElementById("restart-btn");
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;

let drawing = new Audio();
drawing.preload = "auto";
drawing.src = "sounds/drawing.wav";

let gameEnd = new Audio();
gameEnd.preload = "auto";
gameEnd.src = "sounds/game-end.wav";

initializeGame();

function initializeGame() {
	cells.forEach(cell => cell.addEventListener("click", cellClicked));
	restartBtn.addEventListener("click", restartGame);
	statusText.textContent = `${currentPlayer}'s turn`;
	running = true;
}

function cellClicked() {
	const cellIndex = this.getAttribute("data-index");

	if (options[cellIndex] != "" || !running) {
		return;
	}

	updateCell(this, cellIndex);
	chekWinner();
}

function updateCell(cell, index) {
	options[index] = currentPlayer;
	cell.textContent = currentPlayer;
	if(currentPlayer == "X"){
		cell.style.color = "#f88";
	}
	else{
		cell.style.color = "#88f"
	}
	drawing.play();
}

function changePlayer() {
	currentPlayer = (currentPlayer == "X") ? "O" : "X";
	statusText.textContent = `${currentPlayer}'s turn`;
}

function chekWinner() {
	let roundWon = false;

	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const cellA = options[condition[0]];
		const cellB = options[condition[1]];
		const cellC = options[condition[2]];

		if (cellA == "" || cellB == "" || cellC == "") {
			continue;
		}

		if (cellA == cellB && cellB == cellC) {
			roundWon = true;
			break;
		}
	}

	if (roundWon) {
		statusText.textContent = `${currentPlayer} wins!`;
		running = false;
		gameEnd.play();
	}

	else if (!options.includes("")) {
		statusText.textContent = `Draw!`;
		running = false;
		gameEnd.play();
	}

	else {
		changePlayer();
	}
}

function restartGame() {
	currentPlayer = "O";
	options = ["", "", "", "", "", "", "", "", ""];
	statusText.textContent = `${currentPlayer}'s turn`;
	cells.forEach(cell => cell.textContent = "");
	running = true;
}
/* Gameplay
1. Computer to generate a random secret code
2. Player to select the colour pegs
2.1 Selected colour pegs will reflect on the main peg board
2.2 Player to click on the check button once 4 coloured pegs are selected
2.3 Check button to push the selected colours into player selection board array and check for winning conditions
3. If player's coloured pegs includes the colour but is in the wrong position, side peg to turn black.
3.1 If player's coloured pegs is the right colour in the right position, side peg to turn red
4. Player to continue the game until winning condition is met or guess is more than 10.
5. Once player wins/lose, output div to unhide gameMessage class and winning message is reflected to player
6. Player to click on reset game button to reset the game board, game message and secret code.
*/

/*----- constants -----*/
const COLOURS = ["red", "yellow", "blue", "green"];

/*----- state variables -----*/
const game = {
  secretCode: [],
  boardMainPeg: [],
  boardSidePeg: [],
  playerSelection: [],
  message: "",
};

/*----- cached elements  -----*/
const gameMainBoard = document.querySelectorAll(".mainPegs > div");
const gameSideBoard = document.querySelectorAll(".sidePegs > div");
const gameMessage = document.querySelector("#gameMessage");

const checkSelection = document.querySelector("#check");

/*----- event listeners -----*/

// redPegSelection.addEventListener("click", handleRedPeg);
// yellowPegSelection.addEventListener("click", handleYellowPeg);
// bluePegSelection.addEventListener("click", handleBluePeg);
// greenPegSelection.addEventListener("click", handleGreenPeg);

/*----- functions -----*/

// function handleRedPeg(event) {
//   let selectedPeg = renderMainPegs();
//   selectedPeg.style.color = "red";
// }

const renderBoard = () => {
  gameMainBoard.innerHTML = "";
  gameSideBoard.innerHTML = "";

  gameMainBoard.forEach((mainPeg) => {
    mainPeg.style.color = "white";
  });

  gameSideBoard.forEach((sidePeg) => {
    sidePeg.style.color = "white";
  });
};

const renderMessage = () => {
  gameMessage.innerText = game.message;
};

const render = () => {
  renderBoard();
  renderMessage();
};

const init = () => {
  game.secretCode = [null, null, null, null];

  game.boardMainPeg = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  game.boardSidePeg = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  game.playerSelection = [null, null, null, null];
};

const generateRandomCode = () => {
  return Math.floor(Math.random() * 4);
};

const computerSecretCode = () => {
  game.secretCode.forEach((item, index) => {
    if (item === null) {
      game.secretCode.splice(index, 1, generateRandomCode());
    }
  });
  return;
};

const main = () => {
  init();
  computerSecretCode();
  render();
};

main();

//Control flow:
console.log("Computer Secret Code: " + game.secretCode);

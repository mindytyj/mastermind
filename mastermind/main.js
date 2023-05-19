/* Gameplay
1. Computer to generate a random secret code
2. Player to select the colour pegs
2.1 Selected colour pegs will reflect on the main peg board
2.2 Player to click on the check button once 4 coloured pegs are selected
2.3 Check button to push the selected colours into board array and check for winning conditions
3. If player's coloured pegs includes the colour but is in the wrong position, side peg to turn black.
3.1 If player's coloured pegs is the right colour in the right position, side peg to turn red
4. Player to continue the game until winning condition is met.
5. Once player wins/lose, output div to unhide gameMessage class and winning message is reflected to player
6. Player to click on reset game button to reset the game board, game message and secret code.
*/

/*----- constants -----*/

/*----- state variables -----*/
const game = {
  secretCode: [],
  board: [],
  message: "",
};

/*----- cached elements  -----*/
const gameBoard = document.querySelector("#gameBoard");

const checkSelection = document.querySelector("#check");

/*----- event listeners -----*/

/*----- functions -----*/

const render = () => {
  renderBoard();
  renderMessage();
};

const init = () => {
  game.secretCode = [null, null, null, null];

  game.board = [
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
};

main();

//Control flow:
console.log("Computer Secret Code: " + game.secretCode);

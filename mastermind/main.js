/*----- constants -----*/

/*----- state variables -----*/
const game = {
  board: [],
  turn: null,
  winner: null,
  message: "",
};

/*----- cached elements  -----*/
const gameBoard = document.querySelector("#gameBoard");

const checkSelection = document.querySelector("#check");

/*----- event listeners -----*/

/*----- functions -----*/
function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  gameBoard.innerHTML = "";
}

function init() {
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

  turn = "player";

  winner = null;

  render();
}

function main() {
  init();
  render();
}

main();

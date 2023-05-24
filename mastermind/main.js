/*----- constants -----*/
const MAIN_COLOURS = {
  0: "red",
  1: "yellow",
  2: "blue",
  3: "green",
  null: "white",
};

const SIDE_COLOURS = {
  black: "black",
  red: "red",
  null: "white",
};

/*----- state variables -----*/
const game = {
  secretCode: [],
  boardMainPeg: [],
  boardSidePeg: [],
  playerSelection: [],
  colIndex: 0,
  rowIndex: 0,
  sideColIndex: 0,
  sideRowIndex: 0,
  winner: "",
  message: "",
};

/*----- cached elements  -----*/
const gameMainBoard = document.querySelectorAll(".mainPegs > div");
const gameSideBoard = document.querySelectorAll(".sidePegs > div");
const gameMessage = document.querySelector("#gameMessage");

const pegSelection = document.querySelectorAll(".selectionPegs > div");
const redPeg = document.querySelector("#redPeg");
const yellowPeg = document.querySelector("#yellowPeg");
const bluePeg = document.querySelector("#bluePeg");
const greenPeg = document.querySelector("#greenPeg");

const checkSelection = document.querySelector("#check");
const resetGame = document.querySelector("#resetGame");

/*----- event listeners -----*/

const selectionPegs = () => {
  pegSelection.forEach((pegSelector) => {
    pegSelector.addEventListener("click", handlePegSelection);
  });
};

checkSelection.addEventListener("click", handleCheckSelection);
resetGame.addEventListener("click", handleResetGame);

/*----- functions -----*/

function handlePegSelection(event) {
  if (game.playerSelection.length > 3) {
    return;
  }

  if (event.target === redPeg) {
    reflectSelectedPegs(0);
    game.playerSelection.push(0);
  } else if (event.target === yellowPeg) {
    reflectSelectedPegs(1);
    game.playerSelection.push(1);
  } else if (event.target === bluePeg) {
    reflectSelectedPegs(2);
    game.playerSelection.push(2);
  } else if (event.target === greenPeg) {
    reflectSelectedPegs(3);
    game.playerSelection.push(3);
  }
}

function reflectSelectedPegs(selection) {
  if (game.rowIndex > 3) {
    game.rowIndex = 0;
  }

  game.boardMainPeg[game.colIndex][game.rowIndex] = selection;
  game.rowIndex += 1;

  renderMainBoard();
}

function handleCheckSelection() {
  if (game.playerSelection.length < 4) {
    return;
  }

  return winningConditions();
}

function winningConditions() {
  if (
    game.playerSelection[0] === game.secretCode[0] &&
    game.playerSelection[1] === game.secretCode[1] &&
    game.playerSelection[2] === game.secretCode[2] &&
    game.playerSelection[3] === game.secretCode[3]
  ) {
    game.winner = "Win";
    return winningMessage();
  } else if (game.colIndex > 9) {
    game.winner = "Lose";
    return winningMessage();
  }

  return toggleSidePegs();
}

function toggleSidePegs() {
  if (game.sideRowIndex > 3) {
    game.sideRowIndex = 0;
    return handleNextTurn();
  }

  return sidePegConditions();
}

function sidePegConditions() {
  game.playerSelection.forEach((item, index) => {
    if (item === game.secretCode[index]) {
      game.boardSidePeg[game.sideColIndex][game.sideRowIndex] =
        SIDE_COLOURS.red;
      game.sideRowIndex += 1;
    } else if (game.secretCode.indexOf(item) !== -1) {
      game.boardSidePeg[game.sideColIndex][game.sideRowIndex] =
        SIDE_COLOURS.black;
      game.sideRowIndex += 1;
    } else if (game.secretCode.indexOf(item) === -1) {
      game.sideRowIndex += 1;
    }
  });

  renderSideBoard();
  return toggleSidePegs();
}

function handleNextTurn() {
  game.playerSelection.splice(0, 4);
  game.colIndex += 1;
  game.sideColIndex += 1;

  if (game.sideColIndex === 10) {
    return winningConditions();
  }
}

function winningMessage() {
  if (game.winner === "Win") {
    game.message = "Congratulations! You have guessed the secret code!";
  } else if (game.winner === "Lose") {
    game.message =
      "You did not guess the secret code! Reset the game to try again!";
  }

  renderMessage();
  return game.message;
}

function handleResetGame() {
  game.colIndex = 0;
  game.rowIndex = 0;
  game.sideColIndex = 0;
  game.sideRowIndex = 0;
  game.winner = "";
  game.message = "";
  main();
}

function renderMainBoard() {
  gameMainBoard.innerHTML = "";

  game.boardMainPeg.forEach(function (colArr, colIndex) {
    colArr.forEach(function (colorValue, rowIndex) {
      const pegId = `col${colIndex}row${rowIndex}`;
      const selectedPeg = document.getElementById(pegId);
      selectedPeg.style.color = MAIN_COLOURS[colorValue];
    });
  });
}

function renderSideBoard() {
  gameSideBoard.innerHTML = "";

  game.boardSidePeg.forEach(function (colArr, colIndex) {
    colArr.forEach(function (colorValue, rowIndex) {
      const sidePegId = `side${colIndex}row${rowIndex}`;
      const selectedSidePeg = document.getElementById(sidePegId);
      selectedSidePeg.style.color = SIDE_COLOURS[colorValue];
    });
  });
}

function renderBoard() {
  renderMainBoard();
  renderSideBoard();
}

function renderMessage() {
  gameMessage.innerText = game.message;
}

function render() {
  renderBoard();
  renderMessage();
}

function init() {
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

  game.playerSelection = [];
}

function generateRandomCode() {
  return Math.floor(Math.random() * 4);
}

function computerSecretCode() {
  game.secretCode.forEach((item, index) => {
    if (item === null) {
      game.secretCode.splice(index, 1, generateRandomCode());
    }
  });
}

function main() {
  init();
  computerSecretCode();
  selectionPegs();
  winningMessage();
  render();
}

main();

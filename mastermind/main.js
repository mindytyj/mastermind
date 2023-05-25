/*----- constants -----*/
const MAIN_COLOURS = {
  0: "rgb(225, 18, 15)",
  1: "rgb(9, 169, 55)",
  2: "rgb(240, 150, 189)",
  3: "rgb(24, 65, 154)",
  4: "rgb(248, 190, 16)",
  5: "rgb(238, 131, 12)",
  null: "white",
};

const SIDE_COLOURS = {
  black: "black",
  red: "red",
  null: "white",
};

/*----- state variables -----*/
const game = {
  screen: "startScreen",
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
const gameRulesInfo = document.querySelector("#gameRulesInfo");

const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const gamePanel = document.querySelector("#gamePanel");
const resetGameScreen = document.querySelector("#resetGameScreen");

const pegSelection = document.querySelectorAll(".selectionPegs > div");
const redPeg = document.querySelector("#redPeg");
const greenPeg = document.querySelector("#greenPeg");
const pinkPeg = document.querySelector("#pinkPeg");
const bluePeg = document.querySelector("#bluePeg");
const yellowPeg = document.querySelector("#yellowPeg");
const orangePeg = document.querySelector("#orangePeg");

const startButton = document.querySelector("#startButton");
const checkSelection = document.querySelector("#check");
const gameRulesButton = document.querySelector("#gameRules");
const hideGameRules = document.querySelector("#hideGameRules");
const resetGame = document.querySelector("#resetGame");

/*----- event listeners -----*/

function selectionPegs() {
  pegSelection.forEach((pegSelector) => {
    pegSelector.addEventListener("click", handlePegSelection);
  });
}

startButton.addEventListener("click", handleGameStart);
checkSelection.addEventListener("click", handleCheckSelection);
gameRulesButton.addEventListener("click", handleGameRules);
hideGameRules.addEventListener("click", handleHideGameRules);
resetGame.addEventListener("click", handleResetGame);

/*----- functions -----*/

function handleGameStart() {
  game.screen = "gameScreen";
  renderScreen();
}

function handleGameRules() {
  gameRulesInfo.classList.remove("hide");
}

function handleHideGameRules() {
  gameRulesInfo.classList.add("hide");
}

function handlePegSelection(event) {
  if (game.playerSelection.length > 3) {
    return;
  }

  if (event.target === redPeg) {
    reflectSelectedPegs(0);
    game.playerSelection.push(0);
  } else if (event.target === greenPeg) {
    reflectSelectedPegs(1);
    game.playerSelection.push(1);
  } else if (event.target === pinkPeg) {
    reflectSelectedPegs(2);
    game.playerSelection.push(2);
  } else if (event.target === bluePeg) {
    reflectSelectedPegs(3);
    game.playerSelection.push(3);
  } else if (event.target === yellowPeg) {
    reflectSelectedPegs(4);
    game.playerSelection.push(4);
  } else if (event.target === orangePeg) {
    reflectSelectedPegs(5);
    game.playerSelection.push(5);
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

  if (game.colIndex === 10) {
    return winningConditions();
  }
}

function winningMessage() {
  if (game.winner === "Win") {
    game.screen = "resetGameScreen";
    game.message = "Wahoooo! You correctly guessed Masterio's secret code!";
  } else if (game.winner === "Lose") {
    game.screen = "resetGameScreen";
    game.message =
      "Oh no! You did not guess Masterio's secret code! It's-a okay to reset and try again!";
  }

  renderScreen();
  renderMessage();
  return game.message;
}

function handleResetGame() {
  game.screen = "startScreen";
  game.colIndex = 0;
  game.rowIndex = 0;
  game.sideColIndex = 0;
  game.sideRowIndex = 0;
  game.winner = "";
  game.message = "";
  main();
}

function renderScreen() {
  startScreen.classList.add("hide");
  gameScreen.classList.add("hide");
  resetGameScreen.classList.add("hide");

  if (game.screen === "gameScreen") {
    gamePanel.classList.remove("hide");
  } else if (game.screen !== "gameScreen") {
    gamePanel.classList.add("hide");
  }

  document.querySelector(`#${game.screen}`).classList.remove("hide");
}

function renderMainBoard() {
  // Reference to Unit 1 Week 1 Day 5 Connect Four Code Along Lab

  game.boardMainPeg.forEach(function (colArr, colIndex) {
    colArr.forEach(function (colorValue, rowIndex) {
      const pegId = `col${colIndex}row${rowIndex}`;
      const selectedPeg = document.getElementById(pegId);
      selectedPeg.style.color = MAIN_COLOURS[colorValue];
    });
  });
}

function renderSideBoard() {
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
  renderScreen();
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
  return Math.floor(Math.random() * 6);
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

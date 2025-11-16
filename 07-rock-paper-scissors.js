let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function playGame(playerMove) {
  let results = "";
  let computerMove = pickComputerMove();

  if (playerMove === "Scissors") {
    if (computerMove === "Scissors") {
      results = "Tie.";
    } else if (computerMove === "Paper") {
      results = "You Win.";
    } else if (computerMove === "Rock") {
      results = "You Lose.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      results = "Tie.";
    } else if (computerMove === "Rock") {
      results = "You Win.";
    } else if (computerMove === "Scissors") {
      results = "You Lose.";
    }
  } else {
    if (computerMove === "Rock") {
      results = "Tie.";
    } else if (computerMove === "Paper") {
      results = "You Lose.";
    } else if (computerMove === "Scissors") {
      results = "You Win.";
    }
  }

  if (results === "You Win.") {
    score.wins++;
  } else if (results === "You Lose.") {
    score.losses++;
  } else if (results === "Tie.") {
    score.ties++;
  }

  document.querySelector(".js-result").innerText = `${results}`;

  document.querySelector(
    ".js-YouPick-ComputerPick"
  ).innerHTML = `You picked <p class="you-picked">${playerMove},</p>Computer picked <p class="computer-picked">    ${computerMove}</p>`;

  updateScoreElement();

  //this DOM will disappear the reset message when play game

  document.querySelector(".js-total-played").innerText = `Total played : ${
    score.wins + score.losses + score.ties
  }`;

  localStorage.setItem("score", JSON.stringify(score));
}

function updateScoreElement() {
  document.querySelector(".js-wins").innerText = `${score.wins}`;
  document.querySelector(".js-losses").innerText = `${score.losses}`;
  document.querySelector(".js-ties").innerText = `${score.ties}`;
}

function resetScore() {
  localStorage.removeItem("score");
  score.wins === 0 && score.losses === 0 && score.ties === 0
    ? ((document.querySelector(
        ".resetScore"
      ).innerText = `The score is already reset.`),
      setTimeout(() => {
        document.querySelector(".resetScore").innerText = ``;
      }, 3000))
    : ((score = {
        wins: 0,
        losses: 0,
        ties: 0,
      }),
      (document.querySelector(
        ".resetScore"
      ).innerText = `The score has been reset successfully.`),
      setTimeout(() => {
        document.querySelector(".resetScore").innerText = ``;
      }, 3000));

  document.querySelector(".js-result").innerText = "";

  document.querySelector(".js-total-played").innerText = ``;
  document.querySelector(
    ".js-YouPick-ComputerPick"
  ).innerHTML = `You choose one; the computer chooses one.`;
}

//This function for picking value randomly

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

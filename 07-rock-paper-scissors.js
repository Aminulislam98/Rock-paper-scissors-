let remainingPlays = "";
let playerName = "";
let setNumber = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function playGame(playerMove) {
  let results = "";
  const computerMove = pickComputerMove();
  if (remainingPlays > 0) {
    remainingPlays--;
    document.querySelector(
      ".js-remaining"
    ).innerHTML = `Remaining: ${remainingPlays}`;
  }

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
  let totalScore = score.wins + score.ties + score.losses;
  if (totalScore === setNumber) {
    if (score.wins >= 3 && score.wins < 5) {
      alert(
        `You won ${score.wins} out of ${setNumber}\nWell done ${playerName}`
      );
    } else if (score.wins >= 5 && score.wins <= 10) {
      alert(
        `You won ${score.wins} out of ${setNumber}\nExcellent ${playerName}!`
      );
    } else if (score.wins > 10) {
      alert(
        `Amazing!\nYou won ${score.wins} out of ${setNumber}\nYou're so lucky ${playerName}!`
      );
    } else {
      alert(
        `Win:${score.wins}\nLosses:${score.losses}\nTies: ${score.ties} \nAim to win at least 3 times, Mr. ${playerName}`
      );
    }

    resetScore();
    return;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  document.querySelector(".js-result").innerText = `${results}`;

  document.querySelector(".js-YouPick").innerHTML = `You chose
        <img src="${playerMove}-emoji.png" class="icon-move"/>
          `;

  document.querySelector(".js-ComputerPick").innerHTML = `Computer
      <img src="${computerMove}-emoji.png" class="icon-move"/>
      `;
  //this DOM will disappear the reset message when play game
  document.querySelector(".resetScore").innerText = "";

  document.querySelector(".js-total-played").innerText = `Total played : ${
    score.wins + score.losses + score.ties
  }`;
}

function updateScoreElement() {
  document.querySelector(".js-score");
  const scoreElement = document.querySelector(".js-score");

  scoreElement.innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
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

  document.querySelector(".js-YouPick").innerHTML = ``;

  document.querySelector(".js-ComputerPick").innerHTML = ``;

  document.querySelector(".js-result").innerText = "";
  document.querySelector(".js-score").innerHTML = "";

  document.querySelector(".js-total-played").innerText = ``;

  document.querySelector(".js-confirm-button").innerHTML = "Confirm";
  document.querySelector(".js-name-confirm-button").innerHTML = "Confirm name";

  document.querySelector(".js-set-goal").value = "";
  document.querySelector(".js-name").value = "";

  document.querySelector(".js-remaining").innerHTML = ``;

  remainingPlays = "";
  playerName = "";
  setNumber = "";
}

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

function setGoal() {
  setNumber = Number(document.querySelector(".js-set-goal").value);
  if (setNumber) {
    document.querySelector(".js-confirm-button").innerHTML = "Confirmed";
    document.querySelector(".js-set-goal").classList.remove("is-named");

    remainingPlays = setNumber;
    document.querySelector(
      ".js-remaining"
    ).innerHTML = `You have set: ${remainingPlays}`;
  } else if (!setNumber || isNaN(setNumber)) {
    alert("Number required");
    document.querySelector(".js-set-goal").value = "";
  } else {
    alert("Set a number first, then confirm!");
  }
}

function setName() {
  playerName = document.querySelector(".js-name").value;
  if (playerName.length > 5 && setNumber) {
    document.querySelector(".js-name-confirm-button").innerHTML =
      " Name Confirmed";
    document.querySelector(
      ".js-person-name"
    ).innerHTML = `Welcome, ${playerName}! Your goal and name are set, time to jump into the game. Good luck!`;

    setTimeout(() => {
      document.querySelector(".js-person-name").innerHTML = ``;
    }, 8000);
  } else if (!setNumber) {
    alert("Please set a number first, then confirm your name..");
    document.querySelector(".js-set-goal").classList.add("is-named");
  } else if (playerName.length <= 5) {
    alert("Name must be at least 5 characters long.");
  }
}

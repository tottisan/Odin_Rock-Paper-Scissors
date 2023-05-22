const score = document.querySelector("#score");
const cpuScore = document.querySelector("#cpuScore");
const article = document.querySelector("article");
const gameBtn = document.querySelectorAll(".game-btn");
const rules = document.querySelector("#rules");
const body = document.querySelector("body");
let playerScore = 0;
let computerScore = 0;
let draw = 0;

const modal = document.querySelector("#modal");

/* Computer choose an option and plays */
const computerPlay = () => {
  const words = ["rock", "paper", "scissors"];
  const randomWord = words[Math.floor(Math.random() * words.length)];

  return randomWord;
};

/* Determinate who's the winner */
const playRound = (player) => {
  let computer = computerPlay();

  if (gameLogic(player, computer) == "player") {
    playerScore++;
    gameWinner();

    setTimeout(() => {
      score.textContent = playerScore;
      createBtn(computer);
      playAgain("You win");
    }, 700);
  } else if (gameLogic(player, computer) == "computer") {
    computerScore++;
    gameWinner();

    setTimeout(() => {
      cpuScore.textContent = computerScore;
      createBtn(computer);
      playAgain("You lose");
    }, 700);
  } else if (gameLogic(player, computer) == "draw") {
    draw++;
    gameWinner();

    setTimeout(() => {
      createBtn(computer);
      playAgain("It's a draw");
    }, 700);
  }
};

/* Game Logic */
const gameLogic = (player, computer) => {
  if (player === computer) {
    return "draw";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  } else {
    return "computer";
  }
};

/* Check who's the winner */
const gameWinner = () => {
  if (draw === 5) {
    winnerModal("It's a draw!");
  } else if (playerScore === 5) {
    winnerModal("Player win!");
  } else if (computerScore === 5) {
    winnerModal("Computer win!");
  }
};

gameBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    completeGame();
  });
});

/* Create dom element based in player & computer choose */
const createBtn = (e) => {
  const template = `
        <section class="column">
          <header class="game-header">
              <h2 class="game-title">You picked</h2>
          </header>
          <div class="game-btn ${e}-panel btn-match" id="${e}">
              <div class="game-panel">
                <img
                  src="./images/icon-${e}.svg"
                  class="game-img"
                  alt="${e} image"
                />
              </div>
          </div>
        </section>`;

  article.classList.add("game-round");

  article.insertAdjacentHTML("beforeend", template);
};

/* Create a retry button to play again */
const playAgain = (message) => {
  const template = `
      <section class="column mb-again">
        <header class="game-header">
          <h2 class="game-title mb-title">${message}</h2>
          <a href="#" class="game-repeat mb-btn" id="repeat">Play again</a>
        </header>
      </section>
  `;

  setTimeout(() => {
    if (article.hasChildNodes) {
      article.firstElementChild.insertAdjacentHTML("afterend", template);
    }
  }, 710);
};

/* Replay game listener from the parent */
article.addEventListener("click", (e) => {
  if (e.target.classList.contains("game-repeat")) {
    updateDom();
    inicialGame();
  }
});

/* Remove elements from article */
const updateDom = () => {
  while (article.firstChild) {
    article.removeChild(article.firstChild);
  }

  document.querySelector("main").style.background = "unset";
};

/* Template to reset the DOM to his original state  */
const inicialGame = () => {
  const template = `
  <div class="game-btn paper-panel" id="paper">
          <div class="game-panel">
            <img
              src="./images/icon-paper.svg"
              class="game-img"
              alt="paper image"
            />
          </div>
        </div>
        <div class="game-btn scissors-panel" id="scissors">
          <div class="game-panel">
            <img
              src="./images/icon-scissors.svg"
              class="game-img"
              alt="scissors image"
            />
          </div>
        </div>
        <div class="game-btn rock-panel" id="rock">
          <div class="game-panel">
            <img src="./images/icon-rock.svg" class="game-img" alt="rock image" />
          </div>
        </div>
  `;

  article.insertAdjacentHTML("beforeend", template);

  article.classList.remove("game-round");

  document.querySelector("main").style.background =
    "url(./images/bg-triangle.svg) no-repeat center";
};

/* Get the player choose to play a round */
const completeGame = () => {
  article.addEventListener("click", (e) => {
    if (e.target.classList.contains("game-btn")) {
      updateDom();

      let gameId = e.target.id;

      updateDom();

      setTimeout(() => {
        createBtn(gameId);
      }, 700);

      gameId ? playRound(gameId) : null;
    }
  });
};

/* Open and close modal */
rules.addEventListener("click", () => {
  createModal();
});

/* Create modal and append to the dom */
const createModal = () => {
  const template = `
      <dialog class="modal" id="modal">
          <header class="header-modal">
              <h2>Rules</h2>
              <img src="./images/icon-close.svg" class="close-modal" alt="close-icon" id="close" />
          </header>
          <div class="rules-model">
            <img
              src="./images/image-rules.svg"
              class="rules-img"
              alt="rules-image"
            />
          </div>
      </dialog>
 `;

  document.querySelector("body").insertAdjacentHTML("beforeend", template);
  document.querySelector("dialog").showModal();
};

/* Close modal from the parent element body */
body.addEventListener("click", (e) => {
  if (e.target.id === "close") {
    document.querySelector("dialog").close();
  }
});

/* Modal to show a winner */
const winnerModal = (winner) => {
  const template = `
      <dialog class="modal" id="modal">
          <header class="header-modal">
              <h2>Winner</h2>
              <img src="./images/icon-close.svg" class="close-modal" alt="close-icon" id="close" />
          </header>
          <div class="rules-model">
            <h2>${winner}</h2>
          </div>
      </dialog>
 `;

  document.querySelector("body").insertAdjacentHTML("beforeend", template);
  document.querySelector("dialog").showModal();
};

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
    removeModals();
    updateDom();
    inicialGame();
    scoreReset();
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
          <div class="rules-modal winner-modal">
            <h2 class="winner">${winner}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>party-popper</title><path d="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z" fill="currentColor"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>party-popper</title><path d="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z" fill="currentColor"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>party-popper</title><path d="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z" fill="currentColor"/></svg>
          </div>
      </dialog>
 `;

  document.querySelector("body").insertAdjacentHTML("beforeend", template);
  document.querySelector("dialog").showModal();
};

/* Remove last modal create */
const removeModals = () => {
  while (body.lastElementChild.classList.contains("modal")) {
    body.removeChild(body.lastElementChild);
  }
};

/* Reset scores */
const scoreReset = () => {
  playerScore = 0;
  score.textContent = playerScore;
  computerScore = 0;
  cpuScore.textContent = computerScore;
  draw = 0;
};

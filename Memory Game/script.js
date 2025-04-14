const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let gameStarted = false;

// Items array
const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

// Game state variables
let seconds = 0, minutes = 0, movesCount = 0, winCount = 0, errorsCount = 0;

// Time generator for the timer
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

// Move counter
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Lépések:</span>${movesCount}`;
};

// Error counter (when player picks the wrong pair)
const errorCounter = () => {
  errorsCount += 1;
  result.innerHTML = `<h4>Hibák: ${errorsCount}</h4>`;
};

// Randomly generate card pairs for the game
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

// Matrix generator for the grid of cards
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  
  cardValues.forEach((card, index) => {
    gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${card.name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${card.image}" class="image"/>
        </div>
      </div>
    `;
  });
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  cards = document.querySelectorAll(".card-container");

  // Set up event delegation for card clicks
  gameContainer.addEventListener("click", (event) => {
    if (event.target.closest(".card-container")) {
      handleCardClick(event.target.closest(".card-container"));
    }
  });
};

// Handle card click (flip card and match check)
const handleCardClick = (card) => {
  if (gameStarted && !card.classList.contains("matched") && !card.classList.contains("flipped")) {
    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      firstCardValue = card.getAttribute("data-card-value");
    } else {
      movesCounter();
      secondCard = card;
      let secondCardValue = card.getAttribute("data-card-value");

      if (firstCardValue === secondCardValue) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        winCount += 1;
        if (winCount === Math.floor(cards.length / 2)) {
          result.innerHTML = `<h2>Nyertél!</h2><h4>Lépések: ${movesCount} Hibák: ${errorsCount}</h4>`;
          stopGame();
        }
        firstCard = false;
      } else {
        errorCounter();
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard = false;
          secondCard = false;
        }, 1000);
      }
    }
  }
};

// Start the game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  errorsCount = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  initializer();
});

// Stop the game
stopButton.addEventListener("click", () => stopGame());

const stopGame = () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
};

// Initialize the game
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let size = 4;  // Default size for the grid
  let cardValues = generateRandom(size);
  matrixGenerator(cardValues);
  gameStarted = true;

  // Show all cards for 3-5 seconds
  setTimeout(() => {
    cards.forEach((card) => card.classList.add("flipped"));
    setTimeout(() => {
      cards.forEach((card) => card.classList.remove("flipped"));
    }, 3000); // Cards visible for 3 seconds
  }, 1000); // Wait 1 second before showing all cards
};

// Level selection feature (if implemented)
const setLevel = (level) => {
  let size = level === "easy" ? 4 : level === "medium" ? 6 : 8;
  let cardValues = generateRandom(size);
  matrixGenerator(cardValues, size);
};

// Call the level setup based on user selection (you would add a UI for level selection)

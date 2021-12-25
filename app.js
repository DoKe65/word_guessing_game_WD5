// Global Variables
const startScreen = document.getElementById("overlay");
const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phrasesUl = phrase.firstElementChild;
const hearts = document.querySelectorAll(".tries");
const lostHearts = `<img src="images/faded-rose.png" height="60px" width="auto">`;
let missed = 0;

// Array with phrases to guess
const phrases = [
  "Sleep is the mother of great ideas",
  "I love to code",
  "Live each day as if it were the last",
  "Step by step towards the goal",
  "Learning to code is fun",
  "Lifelong learners are more content",
  "Stay on your feet",
  "Make the best out of what you have",
  "Be patient with your brain",
  "Cherish your inner child"
];

// Chose a random phrase to be displayed from an array with phrases
function getRandomPhraseAsArray(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const phraseToDisplay = arr[index].toUpperCase().split("");
  return phraseToDisplay;
}

// Display the randomly chosen array inside the phrases section
function addPhraseToDisplay(arr) {

  for (let i = 0; i < arr.length; i++) {

    const li = document.createElement("li");
    li.textContent = arr[i];
    phrasesUl.appendChild(li);

    if (arr[i] === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
    }
  }
}

// Check if a letter pressed inside the keyboard display is present in the phrase to guess
function checkLetter(charBtn) {
  let phraseToCheck = phrasesUl.getElementsByClassName("letter");
  let char = null;
  for (let i = 0; i < phraseToCheck.length; i++) {
    if (phraseToCheck[i].textContent === charBtn.textContent.toUpperCase()) {
      phraseToCheck[i].classList.add("show");
      charBtn.setAttribute("disabled", true);
      char = charBtn.textContent;
    }
  }
  return char;
}


function clearGame () {
  // reset missed lives
  missed = 0;
  // delete the previously displayed phrase
  phrasesUl.innerHTML = "";
  // remove the attribute "disabled" and the class "chosen" from used keys
  const quertyKeys = keyboard.querySelectorAll(".chosen");
  for (let i = 0; i < quertyKeys.length; i++) {
    quertyKeys[i].removeAttribute("disabled");
    quertyKeys[i].classList.remove("chosen");
  }
  // replace lost hearts with live hearts
  const ol = document.querySelector("ol");
  const lives = ol.querySelectorAll("img");
  for (let i = 0; i < lives.length; i++) {
    lives[i].setAttribute('src', 'images/rose.png');
  }
}

function checkWin () {
  const foundLettersLength = phrasesUl.querySelectorAll(".show").length;
  const phraseLength = phrasesUl.querySelectorAll(".letter").length;
  const titel = startScreen.querySelector(".title");
  const startBtn = startScreen.querySelector(".btn__reset");

  if(foundLettersLength === phraseLength) {
    clearGame();
    startScreen.className = "win";
    startScreen.style.display = "flex";
    titel.textContent = "Congratulations, you're a champ!";
    startBtn.textContent = "I want to play again!";
  } else if (missed >= 5) {
    clearGame();
    startScreen.className = "lose";
    startScreen.style.display = "flex";
    titel.textContent = "Oh no, you lost! Want to try again?";
    startBtn.textContent = "Yes! Start again!";
  }
}

// Keyboard event listener - should only apply to buttons pressed inside the keyboard display
keyboard.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    target.setAttribute("disabled", "true");
    target.className = "chosen";
    if(!target.getAttribute.disabled) {
      const letterFound = checkLetter(target);
      if (letterFound === null) {
        missed++;
        hearts[missed-1].innerHTML = lostHearts;
      }
    }
  }
  checkWin();
});

// Hide the start overlay when clicking the Start button
startScreen.addEventListener("click", (event) => {
  if(event.target.className === "btn__reset") {
    startScreen.style.display = "none";
    document.querySelector(".header").style.backgroundColor = "#4e5e3aa6";
    // clear what was before
    const phraseToDisplay = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseToDisplay);
  }
});

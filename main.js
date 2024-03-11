// All Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
const hangman = `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
=========`;
let lives = 6;
// Get Array FromLetters
const lettersArray = Array.from(letters);
lettersArray.push(' ');
const keyBoard = document.querySelector(".key-board");
const progressLives = document.querySelector('.progress span');
const heart = document.querySelector('.level .heart i');
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let text = document.createTextNode(letter);
  span.setAttribute("class", "c-flex");
  span.setAttribute("data-key", letter);
  span.appendChild(text);
  keyBoard.appendChild(span);
});
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Wiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

const category = document.querySelector(".category h1");
const result = document.querySelector(".result");
const categories = Object.keys(words);
const selectedCategory =
  categories[Math.floor(Math.random() * categories.length)];
category.textContent = selectedCategory;
const selectedList = words[selectedCategory];
const selectedItem =
  selectedList[Math.floor(Math.random() * selectedList.length)];
const selectedLetters = Array.from(selectedItem.toLowerCase());

let guessed = [];
selectedLetters.forEach((letter) => {
  let span = document.createElement("span");
  let text = document.createTextNode("_");
  span.setAttribute("class", "c-flex");
  guessed.push('_');
  span.appendChild(text);
  result.appendChild(span);
});
console.log(selectedLetters);
if (document.querySelector(".result span")) {
  const spans = document.querySelectorAll(".result span");
  const btns = document.querySelectorAll(".key-board span");
  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.classList.contains("selected")) {
        return
      } else {
        this.classList.add("selected");
      }
      let value = e.target.dataset.key;
      if (selectedLetters.indexOf(value) === -1) {
        lives--;
        let width = lives * 20;
        if (lives == 3) {
          progressLives.style.backgroundColor = 'brown';
          heart.style.color = 'brown';
        }
        if (lives <= 2) {
          progressLives.style.backgroundColor = 'red';
          heart.style.color = 'red';
        }
        progressLives.style.width = `${width}px`; 
        if (lives < 1 && guessed.indexOf('_') !== -1) {
          console.log("You lose!")
          console.log(hangman);
          result.innerHTML = '<img width=250 src="hang_man.png" alt="hangman">';
          playAgain(keyBoard);
          return;
        }
      } else {
        for (let i = 0; i < selectedLetters.length; i++) {
          if (selectedLetters[i] === value) {
            spans[i].textContent = value;
            spans[i].classList.add("filled-field");
            this.classList.add("selected");
            guessed[i] = value;
          }
        }
        if (lives >= 1 && guessed.indexOf('_') === -1) {
          console.log("You win!");
          result.innerHTML = '<img width=250 src="win.png" alt="win">'
          playAgain(keyBoard);
          return;
        }
      }
    });
  });
}


function playAgain(el) {
  el.innerHTML = "<button class='restart' onclick='window.location.reload()'>restart</button>"
}

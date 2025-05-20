const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const questionAmount = document.querySelector('.question-amount');
const difficulty = document.querySelector('.span');
const question = document.querySelector('.question-div p');
let count = 0;
const first = document.querySelector(".first");
const second = document.querySelector('.second');
const third = document.querySelector('.third');
const fourth = document.querySelector('.fourth');
const indexDetection = ["first", 'second', 'third', 'fourth'];
let score = 0;
const points = document.querySelector('.pt');
const answers = document.querySelectorAll('.answer');
let check = false;
let data;
let random;

async function questionDisplay() {
  try {
    let api = await fetch(URL);
    if (api.ok) {
      data = await api.json();
      console.log("length of data keys: " + Object.keys(data.results).length);
      eachQuestion()
      console.log(random);
      detectAnswer(answers, indexDetection, data);
    } else {
      throw new Error('something gose wrong!');
    }

  } catch (error) {
    console.log(error);
  }


}
questionDisplay();

function eachQuestion() {
  check = false;
  answers.forEach((answer) => {
    answer.style.color = '#4e342e'
  });
  console.log(data.results[count]);
  questionAmount.innerHTML = `${count + 1}/10`;
  difficultyOfQuestion(data, difficulty);
  question.innerHTML = `${data.results[count].question}`;
  let rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  random = rand;
  console.log(random);
  console.log(rand);

  correct_incorrect(rand, data, count, first, second, third, fourth);
  // count++;
}

function difficultyOfQuestion(data, dif) {
  let difficulty = data.results[count].difficulty;
  dif.innerText = `${difficulty.toUpperCase()}`;
  if (difficulty == 'easy') {
    dif.setAttribute('style', 'color: green');
  } else if (difficulty == 'medium') {
    dif.setAttribute('style', 'color: yellow');
  } else {
    dif.setAttribute('style', 'color: red');
  }
}

let info = document.querySelector('.info img');
let rules = document.querySelector('.rules');

info.addEventListener('mouseenter', () => {
  rules.setAttribute('style', 'display: flex');
});
info.addEventListener('mouseout', () => {
  rules.setAttribute('style', 'display: none');
});



function correct_incorrect(rand, data, count, first, second, third, fourth) {
  if (rand == 1) {
    first.innerHTML = `A) ${data.results[count].correct_answer}`;
    second.innerHTML = `B) ${data.results[count].incorrect_answers[0]}`;
    third.innerHTML = `C) ${data.results[count].incorrect_answers[1]}`;
    fourth.innerHTML = `D) ${data.results[count].incorrect_answers[2]}`;
  } else if (rand == 2) {
    first.innerHTML = `A) ${data.results[count].incorrect_answers[0]}`;
    second.innerHTML = `B) ${data.results[count].correct_answer}`;
    third.innerHTML = `C) ${data.results[count].incorrect_answers[1]}`;
    fourth.innerHTML = `D) ${data.results[count].incorrect_answers[2]}`;
  } else if (rand == 3) {
    first.innerHTML = `A) ${data.results[count].incorrect_answers[0]}`;
    second.innerHTML = `B) ${data.results[count].incorrect_answers[1]}`;
    third.innerHTML = `C) ${data.results[count].correct_answer}`;
    fourth.innerHTML = `D) ${data.results[count].incorrect_answers[2]}`;
  } else if (rand == 4) {
    first.innerHTML = `A) ${data.results[count].incorrect_answers[0]}`;
    second.innerHTML = `B) ${data.results[count].incorrect_answers[1]}`;
    third.innerHTML = `C) ${data.results[count].incorrect_answers[2]}`;
    fourth.innerHTML = `D) ${data.results[count].correct_answer}`;
  }
}

const scoreSystem = {
  ['HARD']: 150,
  ['MEDIUM']: 100,
  ['EASY']: 50
};

async function detectAnswer(answers, index, data) {

  answers.forEach((answer) => {
    answer.addEventListener('click', (event) => {
      

      check = true;
      let element = event.target;
      console.log(element.classList[1]);


      let dif = data.results[count].difficulty;
      console.log(dif);
      if (index[random - 1] == element.classList[1]) {
        element.style.color = "#6b8e23";
        score += scoreSystem[dif.toUpperCase()];
        points.innerHTML = `Point: ${score}`;

      } else {
        element.style.color = "#a0522d";
        document.querySelector(`.${index[random - 1]}`).style.color = '#6b8e23';
      }
      if (Object.keys(data.results).length - 1 > count) {
        setTimeout(eachQuestion, 2000);
        count++;

      }
      
    });
  });
}


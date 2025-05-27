let URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const questionAmount = document.querySelector('.question-amount');
let newQuestions = [];
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
const gameSetting = document.querySelector('.start-game');
const play = document.querySelector('.start');

play.addEventListener('click', (e) => {
  e.preventDefault();
  const obj = new FormData(gameSetting);

  const settings = Object.fromEntries(obj.entries());
  console.log(settings);
  changeURL(settings);
  console.log(URL);
  main.style.display = 'block';
  header.style.display = 'flex';
  gameSetting.style.display = 'none';
  questionDisplay();
})

function changeURL(formData){
  for (const key in formData) {
    if(formData[key] != ""){
      URL += `&${key}=${formData[key]}`;
      console.log(key);
      console.log(formData[key]);
    }
  }
}

async function questionDisplay() {
  try {
    let api = await fetch(URL);
    if (api.ok) {
      data = await api.json();
      newQuestions.push(...data.results);
      console.log(newQuestions);
      points.innerHTML = `Point: ${score}`;
      console.log("length of data keys: " + Object.keys(newQuestions).length);
      eachQuestion()
      console.log(random);
      
      detectAnswer(answers, indexDetection, newQuestions);
    } else {
      throw new Error('something gose wrong!');
    }

  } catch (error) {
    console.log(error);
    // alert(error)
  }


}
// questionDisplay();

function eachQuestion() {
  check = false;
  answers.forEach((answer) => {
    answer.style.color = '#4e342e'
  });
  // console.log(data.results[count]);
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

const main = document.querySelector('main');
const header = document.querySelector('header');
const restart = document.querySelector('.restart');
const endGame = document.querySelector('.end-game');

function detectAnswer(answers, index, data) {

  answers.forEach((answer) => {
    answer.addEventListener('click', (event) => {
      if (check) return;
      check = true;
      let element = event.target;
      console.log(element.classList[1]);

      console.log("Clicked question: ", data[count].question);

      let dif = data[count].difficulty;
      console.log(dif);
      if (index[random - 1] == element.classList[1]) {
        element.style.color = "#6b8e23";
        score += scoreSystem[dif.toUpperCase()];
        points.innerHTML = `Point: ${score}`;
      } else {
        element.style.color = "#a0522d";
        document.querySelector(`.${index[random - 1]}`).style.color = '#6b8e23';
      }
      if (Object.keys(data).length - 1 > count) {
        setTimeout(eachQuestion, 2000);
        count++;
      } else {
        setTimeout(() => {
          main.style.display = 'none';
          header.style.display = 'none';
          endGame.style.display = 'flex';
          yourScore.innerText = `YOUR SCORE: ${score}`;
        }, 2000);

      }

    });
  });
}


const yourScore = document.querySelector('.your-score');
restart.addEventListener('click', () => {
  main.style.display = 'block';
  header.style.display = 'flex';
  endGame.style.display = 'none';
  count = 0;
  score = 0;
  newQuestions = [];
  console.log(count);
  questionDisplay();
})


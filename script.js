const URL = "https://opentdb.com/api.php?amount=10&type=multiple";

const questionAmount = document.querySelector('.question-amount');
const difficulty = document.querySelector('.span');
const question = document.querySelector('.question-div p');
let count = 0;

async function firstQuestion() {
  try {
    let api = await fetch(URL);
    if (api.ok) {
      let data = await api.json();
      console.log(data.results[0]);
      questionAmount.innerText = `${count + 1}/10`;
      difficultyOfQuestion(data, difficulty);
      question.innerText = `${data.results[0].question}`
    } else {
      throw new Error('something gose wrong!');
    }

  } catch (error) {
    console.log(error);
  }


}

firstQuestion();

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
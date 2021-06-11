const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext = document.getElementById("progresstext");
const scoretext = document.getElementById('score');
const progressbarfull = document.getElementById('progressbarfull');
let currentquestion = {};
let acceptinganswers = false;
let score = 0;
let questioncounter = 0;
let availablequestions = [];

let questions = [
  {
    question: "What is a productive cough?",
    choice1: "One that makes you feel better immediately",
    choice2: "One that results in cancer",
    choice3: "One that helps expel phlegm from the body",
    choice4: "One that causes other symptoms to appear",
    answer: 3
  },
  {
    question: "What are rales?",
    choice1: "Crossbars on a train track",
    choice2: "Abnormal lung sounds you can hear through a stethoscope",
    choice3: "Definitive indicators of lung cancer ",
    choice4: "Spasms of coughing",
    answer: 2
  },
  {
    question: "Who among these options is most likely to suffer from chronic bronchitis?",
    choice1: "People with childhood asthma",
    choice2: "People with deformed lungs",
    choice3: "People who have survived tuberculosis",
    choice4: "Smokers",
    answer: 4
  },
  {
    question: "What is another name for pertussis?",
    choice1: "Tuberculosis",
    choice2: "Whooping cough",
    choice3: "Bronchitis ",
    choice4: "Pneumonia",
    answer: 2
  },
  {
    question: "Perhaps unexpectedly, which of the following condition can be diagnosed because of a cough? ",
    choice1: "Gastrointestinal reflux disease",
    choice2: "Epilepsy",
    choice3: "Kidney disease",
    choice4: "Gout",
    answer: 1
  }

];




const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questioncounter = 0;
  score = 0;
  availablequestions = [...questions];
  console.log(availablequestions);
  getquestion();
};
getquestion = () => {
  if (availablequestions.length == 0 || questioncounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostrecentscore", score);
    return window.location.assign("end.html");
  }
  questioncounter++;
  progresstext.innerText = `Question ${questioncounter}/${MAX_QUESTIONS}`;
  progressbarfull.style.width = `${(questioncounter / MAX_QUESTIONS) * 100}%`;
  const questionindex = Math.floor(Math.random() * availablequestions.length);
  currentquestion = availablequestions[questionindex];
  question.innerText = currentquestion.question;
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentquestion['choice' + number];
  });
  availablequestions.splice(questionindex, 1);
  console.log(availablequestions);
  acceptinganswers = true;
};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptinganswers) return;
    acceptinganswers = false;
    const selectedchoice = e.target;
    const selectedanswer = selectedchoice.dataset["number"];

    const classtoapply = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect';
    if (classtoapply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedchoice.parentElement.classList.add(classtoapply);
    setTimeout(() => {
      selectedchoice.parentElement.classList.remove(classtoapply);
      getquestion();
    }, 1000);
  });
});
incrementScore = num => {
  score += num;
  scoretext.innerText = score;
};
startGame();

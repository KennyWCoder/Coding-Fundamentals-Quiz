var timerElement = document.querySelector(".timer");
var startButton = document.querySelector(".start-quiz");
var welcomePage = document.querySelector(".main-box");
var quizContainer = document.querySelector(".quiz-topic");
var quizButtons = document.querySelector(".quiz-option");
var resultBar = document.querySelector(".result");
var finalPage = document.querySelector(".final-page");
var finalScore = document.querySelector(".final-score");
var submitButton = document.querySelector(".submit-button");

var timer;
var timerCount;

//create questions arrays
var questions = [
    {
        question: "Commonly used data types DO Not Include: ",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
        correctAnswer: "3. alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with _________.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parenthesis",
        answer4: "4. square brackets",
        correctAnswer: "3. parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above",
        correctAnswer: "4. all of the above",
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curly brackets",
        answer3: "3. quotes",
        answer4: "4. parenthesis",
        correctAnswer: "3. quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        answer1: "1. JavaScript",
        answer2: "2. terminal/bash",
        answer3: "3. for loops",
        answer4: "4. console.log",
        correctAnswer: "4. console.log",
    },
];

//event listenr when user click the start quiz button to call startquiz function
startButton.addEventListener("click", startQuiz);

//the startquiz function is called when the start quiz button is clicked
function startQuiz() {
    timerElement.textContent = 75;
    timerCount = 75;
    startTimer();
    renderQuestions();
}

//start time after button was clicked
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0 || questionNum === 5) {
            clearInterval(timer);
            quizContainer.setAttribute("style", "display: none");
            quizButtons.setAttribute("style", "display: none");
            finalPage.setAttribute("style", "display: block;")
            finalScore.textContent = timerCount;

        }
    }, 1000);
}

var question = document.getElementById("quiz-quest");
var answer1 = document.getElementById("answer-one");
var answer2 = document.getElementById("answer-two");
var answer3 = document.getElementById("answer-three");
var answer4 = document.getElementById("answer-four");

var questionNum = 0;

function renderQuestions() {
    //display the hidden divs
    welcomePage.setAttribute("style", "display: none");
    quizContainer.setAttribute("style", "display: block");
    quizButtons.setAttribute("style", "display: block");
    //to get the question and answer into the container and answer buttons
    var currentQuestion = questions[questionNum];
    question.textContent = currentQuestion.question;
    answer1.textContent = currentQuestion.answer1;
    answer2.textContent = currentQuestion.answer2;
    answer3.textContent = currentQuestion.answer3;
    answer4.textContent = currentQuestion.answer4;
}

//grab all the option-button
var buttonSelect = document.querySelectorAll(".option-button");

//for-loop for click any option to react for the result.
for (var i = 0; i < buttonSelect.length; i++) {
    buttonSelect[i].addEventListener("click", function(event) {
        event.stopPropagation();
        if (event.currentTarget.innerText === questions[questionNum].correctAnswer) {
            resultBar.setAttribute("style", "display: block");
            resultBar.textContent = "Last Question was Correct!";
        }else {
            resultBar.setAttribute("style", "display: block");
            resultBar.textContent = "Last Question was Wrong!";
            timerCount = timerCount - 10;
        }
        questionNum++;

        if (questionNum < 5) {
            renderQuestions();
        }
    })
}

var inputBox = document.getElementById("input-box");

//get the highscores, or the initial value  of empty
var highscores = JSON.parse(localStorage.getItem("highscores"))|| [];

submitButton.addEventListener("click", function(event) {
    event.stopPropagation();
    var initials = inputBox.value;
    var finalResult = {initials, timerCount};
    console.log(finalResult);

    highscores.push(finalResult);
    //store the scores
    localStorage.setItem("highscores", JSON.stringify(highscores));
})

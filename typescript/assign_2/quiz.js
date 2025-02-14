var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.currentIndex = 0;
        this.score = 0;
        this.questions = questions;
    }
    Quiz.prototype.getCurrentQuestion = function () {
        return this.questions[this.currentIndex];
    };
    Quiz.prototype.checkAnswer = function (answer) {
        if (answer === this.getCurrentQuestion().correctAnswer) {
            this.score++;
            return true;
        }
        return false;
    };
    Quiz.prototype.nextQuestion = function () {
        this.currentIndex++;
        return this.currentIndex < this.questions.length;
    };
    Quiz.prototype.getScore = function () {
        return this.score;
    };
    return Quiz;
}());
var questions = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4",
    },
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
    },
];
var quiz = new Quiz(questions);
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var nextButton = document.getElementById("next-btn");
var scoreContainer = document.getElementById("score-container");
var scoreElement = document.getElementById("score");
function loadQuestion() {
    var currentQuestion = quiz.getCurrentQuestion();
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", function () { return selectAnswer(choice); });
        choicesElement.appendChild(button);
    });
    nextButton.classList.add("hidden");
}
function selectAnswer(answer) {
    quiz.checkAnswer(answer);
    nextButton.classList.remove("hidden");
}
nextButton.addEventListener("click", function () {
    if (quiz.nextQuestion()) {
        loadQuestion();
    }
    else {
        showScore();
    }
});
function showScore() {
    document.getElementById("question-container").classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreElement.textContent = quiz.getScore().toString();
}
loadQuestion();

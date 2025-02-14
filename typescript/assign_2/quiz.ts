interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

class Quiz {
  private questions: Question[];
  private currentIndex: number = 0;
  private score: number = 0;

  constructor(questions: Question[]) {
    this.questions = questions;
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  checkAnswer(answer: string): boolean {
    if (answer === this.getCurrentQuestion().correctAnswer) {
      this.score++;
      return true;
    }
    return false;
  }

  nextQuestion(): boolean {
    this.currentIndex++;
    return this.currentIndex < this.questions.length;
  }

  getScore(): number {
    return this.score;
  }
}

const questions: Question[] = [
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

const quiz = new Quiz(questions);
const questionElement = document.getElementById("question")!;
const choicesElement = document.getElementById("choices")!;
const nextButton = document.getElementById("next-btn")! as HTMLButtonElement;
const scoreContainer = document.getElementById("score-container")!;
const scoreElement = document.getElementById("score")!;

function loadQuestion() {
  const currentQuestion = quiz.getCurrentQuestion();
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(choice));
    choicesElement.appendChild(button);
  });
  nextButton.classList.add("hidden");
}

function selectAnswer(answer: string) {
  quiz.checkAnswer(answer);
  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  if (quiz.nextQuestion()) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("question-container")!.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreElement.textContent = quiz.getScore().toString();
}

loadQuestion();

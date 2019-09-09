const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let	currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: "What is my Name?",
		choice1: "Abdulsalam",
		choice2: "Abdulrahman",
		choice3: "Muhammed",
		choice4: "Mubarak",
		answer:1
	},
	{
		question:"How old am I?",
		choice1: "17",
		choice2: "22",
		choice3: "19",
		choice4: "20",
		answer:4
	},
	{
		question: "What is my complexion?",
		choice1: "White",
		choice2: "Dark",
		choice3: "Midnight",
		choice4: "Fair",
		answer:2
	}

];

// CONSTANTS

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();	
};


getNewQuestion = () => {
	questionCounter++;
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);
};

startGame();
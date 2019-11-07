const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById("game");


let	currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
	"https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestions => {
    	const formattedQuestions = {
    		question: loadedQuestions.question
    	};

    	const answerChoices = [...loadedQuestions.incorrect_answers];

    	formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
    	answerChoices.splice(formattedQuestions.answer - 1, 
    		0, 
    		loadedQuestions.correct_answer
    		);

    	answerChoices.forEach((choice, index) => {
    		formattedQuestions['choice' + (index + 1)] = choice;
    	});

    	return formattedQuestions;
    });

    startGame();
  })
  .catch( err => {
  	console.log(err);
  });

// CONSTANTS
const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
	// console.log(availableQuestions);	
	game.classList.remove("hidden");
    loader.classList.add("hidden");
};

  
getNewQuestion = () => {

	if( availableQuestions.length === 0 || questionCounter >= maxQuestions ) {
		//local storage
		localStorage.setItem('mostRecentScore', score);
		//end page
		return window.location.assign("end.html");
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;

	//Update the progress Bar
	progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice => {
		const number = choice.dataset["number"];
		choice.innerText = currentQuestion["choice" + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		// const classToApply = "incorrect";
		// if (selectedAnswer == currentQuestion.answer) {
		// 	classToApply = "correct"
		// }

		const classToApply =
		 selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		// console.log(classToApply);

		if (classToApply === "correct") {
			incrementScore(correctBonus);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
		getNewQuestion();
			
		}, 1000);

		// console.log(selectedAnswer, currentQuestion.answer);
	});
});

incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

// startGame();

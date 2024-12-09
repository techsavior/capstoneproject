const questions = [
	{
		question: "Which is the best way to adapt to new technology?",
		answers:[
			{text: "Through a friend", correct: false},
			{text: "Youtube Videos.", correct: true},
			{text: "Wall Murals.", correct: false},
			{text: "Graffiti.", correct: false},
		]
	},
	{
		question: "Adapting to new technology is easy.",
		answers:[
			{text: "True", correct: false},
			{text: "False", correct: true},
		]
	},
	{
		question: "There are many ways to learn about new technologies.",
		answers:[
			{text: "True", correct: true},
			{text: "False", correct: false},
		]
	},
	{
		question: "What is bluetooth named after?",
		answers:[
			{text: "A viking king.", correct: true},
			{text: "A ceo.", correct: false},
			{text: "Bob.", correct: false},
			{text: "A professor in technology.", correct: false},
		]
	},
	{
		question: "Why should you adapt to new technology?",
		answers:[
			{text: "To become a professor.", correct: false},
			{text: "To help create new technology.", correct: false},
			{text: "To make a new app. ", correct: false},
			{text: "To help keep yourself safe", correct: true},
		]
	},
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "NEXT";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButton.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	})
}


function resetState(){
	nextButton.style.display = "none";
	while(answerButton.firstChild){
		answerButton.removeChild(answerButton.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButton.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = "true";
	});
	nextButton.style.display = "flex";
}

function showScore(){
	resetState();
	questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "TRY AGAIN?";
	nextButton.style.display = "flex"
}
function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}


nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
})
startQuiz();
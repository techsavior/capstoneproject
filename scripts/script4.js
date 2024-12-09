const questions = [
	{
		question: "What is the digital divide?",
		answers:[
			{text: "The difference between the amount of people who do have access to technology and the internet and those who do not.", correct: true},
			{text: "A computer cut in half.", correct: false},
			{text: "The difference bewtween the amount of technology in the world.", correct: false},
			{text: "A made up thing.", correct: false},
		]
	},
	{
		question: "How do you combat the digital divide?",
		answers:[
			{text: "Giving computer access to those who do not currently have it.", correct: true},
			{text: "Taking away the computer access from those who already have it.", correct: false},
			{text: "You don't, the digital divide is what brings competition.", correct: false},
			{text: "There is no digital divide.", correct: false},
		]
	},
	{
		question: "What can the digital divide help save?",
		answers:[
			{text: "Big Corporations.", correct: false},
			{text: "There is no digital divide", correct: false},
			{text: "News Stations.", correct: false},
			{text: "Jobs and Education", correct: true},
		]
	},
	{
		question: "What do you miss out on with a lack of technology?",
		answers:[
			{text: "Access to Information.", correct: true},
			{text: "Meeting New People", correct: true},
			{text: "Jobs", correct: true},
			{text: "Education", correct: true},
		]
	},
	{
		question: "The digital divide is the most important form of digital literacy.",
		answers:[
			{text: "True", correct: false},
			{text: "False", correct: true},
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
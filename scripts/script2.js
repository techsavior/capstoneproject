const questions = [
	{
		question: "What is information literacy?",
		answers:[
			{text: "Graphs and Charts.", correct: false},
			{text: "Checking Sources.", correct: false},
			{text: "Spreading Misinformation.", correct: false},
			{text: "The ability to understand and use information you are given.", correct: true},
		]
	},
	{
		question: "What must you do with the information you find?",
		answers:[
			{text: "Check Your Sources.", correct: true},
			{text: "Spread Misinformation.", correct: false},
			{text: "Check For Bias.", correct: false},
			{text: "Create a Research Paper.", correct: false},
		]
	},
	{
		question: "Information found on the internet can be false.",
		answers:[
			{text: "True", correct: true},
			{text: "False", correct: false},
		]
	},
	{
		question: "All news station tell the truth.",
		answers:[
			{text: "True", correct: false},
			{text: "False", correct: true},
		]
	},
	{
		question: "You must always check your sources.",
		answers:[
			{text: "True", correct: true},
			{text: "False", correct: false},
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
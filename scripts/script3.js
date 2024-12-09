const questions = [
	{
		question: "Which is a type of virus?",
		answers:[
			{text: "Xenoworm.", correct: false},
			{text: "BlackFlare.", correct: false},
			{text: "Trojan Horse.", correct: true},
			{text: "Echo.", correct: false},
		]
	},
	{
		question: "Which is something you can get viruses from?",
		answers:[
			{text: "Files.", correct: true},
			{text: "Calls.", correct: false},
			{text: "Your Own Website.", correct: false},
			{text: "The store.", correct: false},
		]
	},
	{
		question: "There aren't any tools to help spot viruses.",
		answers:[
			{text: "True", correct: false},
			{text: "False", correct: true},
		]
	},
	{
		question: "Who of the following is most likely to have a virus?",
		answers:[
			{text: "Bob who's computer is working completely fine.", correct: false},
			{text: "James who's computer just started slowing down. ", correct: false},
			{text: "Sarah who's computer is bringing up random pop ups.", correct: true},
			{text: "Jessica who just installed an antivirus software.", correct: false},
		]
	},
	{
		question: "There are multiple types of viruses.",
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
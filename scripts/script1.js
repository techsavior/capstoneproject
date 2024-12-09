const questions = [
	{
		question: "What should you do if you spot someone being bullied online?",
		answers:[
			{text: "Join in on the bullying because bullying is fun.", correct: false},
			{text: "Bully the Bully.", correct: false},
			{text: "Report the bullying.", correct: true},
			{text: "Nothing.", correct: false},
		]
	},
	{
		question: "Companies can find everything you have done online with a simple google search.",
		answers:[
			{text: "True", correct: true},
			{text: "False", correct: false},
		]
	},
	{
		question: "All hacking is considered illegal.",
		answers:[
			{text: "True", correct: false},
			{text: "False", correct: true},
		]
	},
	{
		question: "Who is considered addicted to the internet?",
		answers:[
			{text: "Bob who casually uses the internet to watch cat videos.", correct: false},
			{text: "Sarah who skips work and school to browse internet forums.", correct: true},
			{text: "James who makes internet memes.", correct: false},
			{text: "Jessica who doesn't go on the internet.", correct: false},
		]
	},
	{
		question: "What is one right you have as an internet user?",
		answers:[
			{text: "Right to property.", correct: true},
			{text: "Right to bully", correct: false},
			{text: "Right to do whatver you want.", correct: false},
			{text: "Right to hack.", correct: false},
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
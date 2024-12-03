const questions = [
    {
        question: "When and who founded hack club??",
        answers: [
            { text: "Bjarne Stroustrup, 2015", correct: false},
            { text: "Larry Page, 2013", correct: false},
            { text: "Zach Latta, 2014", correct: true},
            { text: "Cristopher Pop, 2016", correct: false},
        ]
    },
    {
        question: "What was the first programming language in history?",
        answers: [
            { text: "Plankalkul", correct: true},
            { text: "Assembly", correct: false},
            { text: "C", correct: false},
            { text: "Rust", correct: false},
        ]
    },
    {
        question: "Who owns GitHub?",
        answers: [
            { text: "Google", correct: false},
            { text: "Microsoft", correct: true},
            { text: "Apple", correct: false},
            { text: "Amazon", correct: false},
        ]
    },
    {
        question: "What is Apple's programming language?",
        answers: [
            { text: "xCode ", correct: false},
            { text: "Swift", correct: true},
            { text: "Java", correct: false},
            { text: "Bash", correct: false},
        ]
    },
    {
        question: "Who developed the Python programming language?",
        answers: [
            { text: "James Gosling", correct: false },
            { text: "Guido van Rossum", correct: true },
            { text: "Brendan Eich", correct: false },
            { text: "Dennis Ritchie", correct: false },
        ]
    },
    {
        question: "What programming language is Minecraft written in?",
        answers: [
            { text: "Python", correct: false},
            { text: "Java", correct: true},
            { text: "Javascript", correct: false},
            { text: "C#", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a primitive data type in Java?",
        answers: [
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "char", correct: false },
            { text: "String", correct: true },
        ]
    },
    {
        question: "Which of the following is used for version control?",
        answers: [
            { text: "Docker", correct: false },
            { text: "Git", correct: true },
            { text: "Webpack", correct: false },
            { text: "Node.js", correct: false },
        ]
    },
    {
        question: "What is the primary role of an API?",
        answers: [
            { text: "To store data", correct: false },
            { text: "To provide an interface for interaction between software components", correct: true },
            { text: "To define the layout of web pages", correct: false },
            { text: "To compile code", correct: false },
        ]
    },
    {
    question: "Which symbol is used for comments in Python?",
    answers: [
        { text: "//", correct: false },
        { text: "#", correct: true },
        { text: "/*", correct: false },
        { text: "<!-- -->", correct: false },
    ]
}
];

const questionElement = document.getElementById('question');
const questionCounterElement = document.getElementById('question-counter');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    shuffle(questions); 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionCounterElement.innerHTML = `Question ${questionNo} of ${questions.length}`;

    shuffle(currentQuestion.answers); 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score: ${score}/${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length ){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
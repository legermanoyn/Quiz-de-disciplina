const questions = [

    {
        question: "Qual linguagem é responsável pela estrutura de uma página web?",

        answers: [
            "CSS",
            "HTML",
            "JavaScript",
            "Python"
        ],

        correct: 1,

        explanation:
            "HTML organiza o conteúdo e a estrutura da página."
    },

    {
        question: "Qual linguagem usamos principalmente para estilizar uma página?",

        answers: [
            "Java",
            "SQL",
            "CSS",
            "C++"
        ],

        correct: 2,

        explanation:
            "CSS controla cores, fontes, espaçamentos e layout."
    },

    {
        question: "Qual comando seleciona um elemento pelo ID no JavaScript?",

        answers: [
            "document.getElementById()",
            "console.log()",
            "Math.random()",
            "alertAll()"
        ],

        correct: 0,

        explanation:
            "getElementById() busca um elemento pelo seu atributo id."
    },

    {
        question: "Qual símbolo é usado para comentários de uma linha em JavaScript?",

        answers: [
            "##",
            "<!--",
            "//",
            "**"
        ],

        correct: 2,

        explanation:
            "Duas barras (//) iniciam um comentário de uma linha."
    },

    {
        question: "O que significa DOM?",

        answers: [
            "Data Object Mode",
            "Document Object Model",
            "Digital Output Method",
            "Design Online Main"
        ],

        correct: 1,

        explanation:
            "DOM é a representação da página que o JavaScript pode acessar e modificar."
    }

];

const quizScreen = document.querySelector("#quizScreen");

const resultScreen = document.querySelector("#resultScreen");

const questionElement = document.querySelector("#question");

const answersElement = document.querySelector("#answers");

const feedback = document.querySelector("#feedback");

const nextButton = document.querySelector("#nextButton");

const questionNumber = document.querySelector("#questionNumber");

const progressPercent = document.querySelector("#progressPercent");

const progressBar = document.querySelector("#progressBar");

let currentQuestion = 0;

let score = 0;

let answered = false;


function showQuestion() {

    answered = false;

    const item = questions[currentQuestion];

    const number = currentQuestion + 1;

    const percent = Math.round(
        (number / questions.length) * 100
    );

    questionNumber.textContent =
        `PERGUNTA ${String(number).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

    progressPercent.textContent = `${percent}%`;

    progressBar.style.width = `${percent}%`;

    questionElement.textContent = item.question;

    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        number === questions.length
            ? "Ver resultado →"
            : "Próxima pergunta →";

    answersElement.innerHTML = "";

    item.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.type = "button";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            chooseAnswer(index);
        });

        answersElement.append(button);

    });

}


function chooseAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];

    const buttons = [
        ...answersElement.querySelectorAll("button")
    ];

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === item.correct) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            index !== item.correct
        ) {
            button.classList.add("wrong");
        }

    });

    if (selectedIndex === item.correct) {

        score++;

        feedback.textContent =
            `✓ Muito bem! ${item.explanation}`;

        feedback.style.color = "#28774c";

    } else {

        feedback.textContent =
            `Não foi dessa vez. ${item.explanation}`;

        feedback.style.color = "#b34c4c";

    }

    nextButton.disabled = false;

}


function showResult() {

    quizScreen.hidden = true;

    resultScreen.hidden = false;

    document.querySelector("#finalScore").textContent =
        `${score}/${questions.length}`;

    const percentage =
        (score / questions.length) * 100;

    let message;

    if (percentage === 100) {

        message =
            "Incrível! Você acertou todas as perguntas!";

    } else if (percentage >= 60) {

        message =
            "Muito bem! Você está no caminho certo.";

    } else {

        message =
            "Continue praticando. Cada tentativa é aprendizado!";

    }

    document.querySelector("#finalMessage").textContent =
        message;

}


nextButton.addEventListener("click", () => {

    if (!answered) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

});


document.querySelector("#restartButton").addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    quizScreen.hidden = false;

    resultScreen.hidden = true;

    showQuestion();

});


showQuestion();

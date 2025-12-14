let districts = document.querySelectorAll(".district");
let currentAnswer = "";

function startGame() {
    score=0;
    nextQuestion();
    alert("The game has started! Guess the district.");
}

function nextQuestion() {
    let randomIndex = Math.floor(Math.random() * districts.lenght);
    currentAnswer = districts[randomIndex].id;

    console.log("answer:", currentAnswer);
}

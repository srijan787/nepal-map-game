let districts = document.querySelectorAll(".district");
let currentAnswer = "";
let score = 0;
let districtQueue =[];
let gameRunning= false;

const gameBtn= document.getElementById("startBtn");
gameBtn.addEventListener("click",()=>{

if(!gameRunning){
    startGame();
}else{
    restartGame();
}
});

function startGame() {
    gameRunning=true;
    score=0;
    districts.forEach(district => district.classList.remove("correct","wrong"));

    document.getElementById("question").textContent="Game started.";
    document.getElementById("score").textContent="Score:0";

    shuffled();
    nextQuestion();

    gameBtn.textContent = "Restart";
}

function restartGame(){
    gameRunning=false;
    startGame();
}

function shuffled(){
    districtQueue=Array.from(districts);

    for(let i=districtQueue.length-1;i>0;i--){
        let j= Math.floor(Math.random() * (i+1));
        [districtQueue[i],districtQueue[j]] = [districtQueue[j],districtQueue[i]];
    }
}

function nextQuestion() {

    if(districtQueue.length===0){
    document.getElementById("question").textContent=
    "Game over!";
    document.getElementById("score").textContent=
    "Final Score:"+score;
    gameRunning=false;
    gameBtn.textContent="Start Game.";
    currentAnswer="";
    return;
    }

    let nextDistrict=districtQueue.pop();
    currentAnswer=nextDistrict.id;
    
    document.getElementById("question").textContent=
    "Find this :"+ currentAnswer;
}
districts.forEach(district => {

    district.addEventListener("click",() =>{

        if(district.id === currentAnswer){
            district.classList.add("correct");
            score++;
            document.getElementById("score").textContent="Score:"+score;
        }
        else{
            document.getElementById(currentAnswer).classList.add("wrong");
        }
        nextQuestion();
    });
});
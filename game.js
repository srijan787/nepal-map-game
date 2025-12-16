let districts = [];
let currentAnswer = "";
let score = 0;
let districtQueue =[];
let gameRunning= false;
let currentDistrict=null;
let skipCount=0;
const MAX_SKIPS=10;

const gameBtn= document.getElementById("startBtn");
const skipBtn= document.getElementById("skipBtn");

skipBtn.addEventListener("click", () =>{
    if(!gameRunning || !currentDistrict)
        return;
    if(skipCount>=MAX_SKIPS)
        return;

    skipCount++;
     districtQueue.unshift(currentDistrict);
    nextQuestion();
    updateSkip();
});

fetch("map.svg")
.then(res => res.text())
.then(svg =>{
    const container=document.getElementById("mapContainer");
    container.innerHTML=svg;
    
    districts=container.querySelectorAll(".district");
    attachDistrictEvents();
})
.catch(err =>{
    console.error(err);
    document.getElementById("question").textContent =
    "Failed to load map!";
});

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
    skipCount=0;

    skipBtn.disabled=false;

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
    gameBtn.textContent="Restart";
    currentAnswer="";
    currentDistrict=null;
    return;
    }

    currentDistrict=districtQueue.pop();
    currentAnswer=currentDistrict.dataset.name;
    
    document.getElementById("question").textContent=
    "Find this: "+ currentAnswer;
}
function attachDistrictEvents(){
  districts.forEach(district => {

    district.addEventListener("click",() =>{

        if(!gameRunning || !currentDistrict)
        return;

        if(
            district.classList.contains("correct") ||
            district.classList.contains("wrong")
        ) return;

        if(district.dataset.name === currentAnswer){
            district.classList.add("correct");
            score++;
            document.getElementById("score").textContent="Score:"+score;
        }
        else{
            document.querySelector(`[data-name="${currentAnswer}"]`).classList.add("wrong");
        }
        nextQuestion();
    });
});  
}
function updateSkip(){
    const remaining = MAX_SKIPS-skipCount;
    skipBtn.textContent=`Skip(${remaining})`;
    if(skipCount>=MAX_SKIPS){
        skipBtn.disabled=true;
        document.getElementById("skipDone").textContent="No skips left!";
    }
}
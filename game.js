let districts = [];
let currentAnswer = "";
let score = 0;
let districtQueue =[];
let gameRunning = false;
let currentDistrict = null;
let skipCount = 0;
const MAX_SKIPS = 10;
let districtMap = {};

fetch("districts.json")
.then( res => res.json())
.then( data =>{
    districtMap = data;
})
.catch(err => console.error("Failed to load districts",err));

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
    skipBtn.textContent=`Skip(${MAX_SKIPS})`;
    document.getElementById("skipDone").textContent="";

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
    localStorage.setItem("latestScore",score);

    return window.location.assign("end.html");
    }

    currentDistrict=districtQueue.pop();
    currentAnswer=districtMap[currentDistrict.id];
    
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

        if(district === currentDistrict){
            district.classList.add("correct");
            score++;
            document.getElementById("score").textContent="Score:"+score;
        }
        else{
            currentDistrict.classList.add("wrong");
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
const districtMap = {
  d1: "Achham",
  d2: "Banke",
  d3: "Bhaktapur",
  d4: "Chitwan",
  d5: "Dailekh",
  d6: "Dhading",
  d7: "Gorkha",
  d8: "Gulmi",
  d9: "Ilam",
  d10: "Kabhrepalanchok",
  d11: "Kanchanpur",
  d12: "Kapilbastu",
  d13: "Lalitpur",
  d14: "Makwanpur",
  d15: "Nawalparasi East",
  d16: "Nawalparasi West",
  d17: "Nuwakot",
  d18: "Palpa",
  d19: "Sindhuli",
  d20: "Sindhupalchok",
  d21: "Surkhet",
  d22: "Syangja",
  d23: "Tanahun",
  d24: "Udayapur",
  d25: "Arghakhanchi",
  d26: "Baitadi",
  d27: "Bajhang",
  d28: "Bajura",
  d29: "Bhojpur",
  d30: "Dadeldhura",
  d31: "Darchula",
  d32: "Dhankuta",
  d33: "Dolakha",
  d34: "Dolpa",
  d35: "Doti",
  d36: "Humla",
  d37: "Jajarkot",
  d38: "Jumla",
  d39: "Kalikot",
  d40: "Khotang",
  d41: "Lamjung",
  d42: "Manang",
  d43: "Mugu",
  d44: "Mustang",
  d45: "Myagdi",
  d46: "Okhaldhunga",
  d47: "Panchthar",
  d48: "Parbat",
  d49: "Pyuthan",
  d50: "Ramechhap",
  d51: "Rasuwa",
  d52: "Rolpa",
  d53: "Rukum East",
  d54: "Rukum West",
  d55: "Salyan",
  d56: "Sankhuwasabha",
  d57: "Solukhumbu",
  d58: "Taplejung",
  d59: "Terhathum",
  d60: "Jhapa",
  d61: "Morang",
  d62: "Sunsari",
  d63: "Saptari",
  d64: "Bardiya",
  d65: "Kailali",
  d66: "Dhanusha",
  d67: "Siraha",
  d68: "Mahottari",
  d69: "Sarlahi",
  d70: "Kathmandu",
  d71: "Rautahat",
  d72: "Bara",
  d73: "Parsa",
  d74: "Kaski",
  d75: "Baglung",
  d76: "Rupandehi",
  d77: "Dang"
};

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
let districts = document.querySelectorAll(".district");
let currentAnswer = "";
let score = 0;
let districtQueue =[];

function startGame() {
    score=0;
    districts.forEach(district => district.classList.remove("correct","wrong"));

    shuffled();
    nextQuestion();
}

function shuffled(){
    districtQueue=Array.from(districts);

    for(let i=districtQueue.length-1;i>0;i--){
        let j= Math.floor(Math.random() * (i+1));
        [districtQueue[i],districtQueue[j]] = [districtQueue[j],districtQueue[i]];
    }
}

function nextQuestion() {
    let nextDistrict=districtQueue.pop();
    currentAnswer=nextDistrict.id;

    document.getElementById("question").textContent=
    "Find this :"+ currentAnswer;

    if(districtQueue.length===0){
    document.getElementById("score").textContent=
    "Final Score:"+score;
    return;
    }
}
districts.forEach(district => {

    district.addEventListener("click",() =>{

        if(district.id === currentAnswer){
            district.classList.add("correct");
            score++;
        }
        else{
            document.getElementById(currentAnswer).classList.add("wrong");
        }
        nextQuestion();
    });
});
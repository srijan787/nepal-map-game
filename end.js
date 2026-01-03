const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const finalScore = document.getElementById("finalScore");
const latestScore = localStorage.getItem("latestScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HS = 3;

finalScore.innerText = latestScore;

username.addEventListener("keyup", ()=>{
    saveScoreBtn.disabled = !username.value;
});

saveScore = e =>{
    console.log("clicked save button!");
    e.preventDefault();

    const score = {
        score : latestScore,
        name : username.value
    };

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score );
    highScores.splice(3);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
};

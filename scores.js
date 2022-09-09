var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var clearScores = document.getElementById("clear-button");
var scorePrinting = document.querySelector(".score-list");

//when window load, print highs scores
window.addEventListener("load", function(){printHighScores()});

//function to create the list of scores and sort function added
function printHighScores() {
    for (var i = 0; i < highscores.length; i++) {
        highscores = sorting(highscores, "score");
        var list = document.createElement("li");
        var text = document.createTextNode(highscores[i].initials + ": " + highscores[i].timerCount);
        list.appendChild(text);
        scorePrinting.appendChild(list);
    }
}

//sort the highscores list
function sorting(array, key) {
    return array.sort(function(a,b) {
        if (a.timerCount < b.timerCount) {
            return 1;
        }
        return -1;
    })
}
//clear highscore
clearScores.addEventListener("click", function() {
    localStorage.removeItem("highscores");
    window.location.reload();
})
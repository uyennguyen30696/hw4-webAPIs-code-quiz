var olEl = document.querySelector("#highscores");

function printHighscores() {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Sort highscores in descending order
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscores.forEach(score => {
        var liEl = document.createElement("li");
        liEl.textContent = score.player + ": " + score.score;
        olEl.appendChild(liEl);
    });
};

printHighscores();

$("#clear-highscores").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    window.location.reload();
});
// Variables
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// From index.html
var countdownButton = document.querySelector(".countdown-button");


// From questions.html
// Time clock
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var timeUpDisplay = document.querySelector("#time-up");

var totalSeconds = 60;
var secondsElapse = 0;

// User score
var score = 0;

// Questions
var h2QuestionEl = document.querySelector("#question");
var choicesEl = document.querySelector(".choices");

// Create buttons for answers in each question
var choiceA = document.createElement("button");
choiceA.setAttribute("class", "choiceBtn");
choiceA.setAttribute("id", "btnA");

var choiceB = document.createElement("button");
choiceB.setAttribute("class", "choiceBtn");
choiceB.setAttribute("id", "btnB");

var choiceC = document.createElement("button");
choiceC.setAttribute("class", "choiceBtn");
choiceC.setAttribute("id", "btnC");

var currentIndex = 0;
var feedback = [];

var inputName = document.querySelector("#input-name");

// Countdown timer
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// These two functions are to make sure there's a leading 0 before minutes and seconds when they are <10 (for styling purpose only)
function getFormattedMinutes() {

    var secondsLeft = totalSeconds - secondsElapse;

    var minutesLeft = Math.floor(secondsLeft / 60);

    if (minutesLeft < 10) {
        var formattedMinutes = "0" + minutesLeft + ":";
    }
    else {
        formattedMinutes = minutesLeft;
    }
    return formattedMinutes;
};

function getFormattedSeconds() {

    var secondsLeft = (totalSeconds - secondsElapse) % 60;

    if (secondsLeft < 10) {
        var formattedSeconds = "0" + secondsLeft;
    }
    else {
        formattedSeconds = secondsLeft;
    }
    return formattedSeconds;

};

// Set time to work when "Press to start" button is clicked
function setTime() {
    var timerInterval = setInterval(function () {
        secondsElapse++;
        minutesDisplay.textContent = getFormattedMinutes();
        secondsDisplay.textContent = getFormattedSeconds();

        if (totalSeconds - secondsElapse <= 0) {
            timeUpDisplay.removeAttribute("class", "hide");
            
            setTimeout(function () {
                clearInterval(timerInterval);
                endGame();
            }, 1000);
        }
    }, 1000);
};


// Questions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// When click start button, setTime() runs to countdown time and questions are presented
countdownButton.addEventListener("click", function () {

    $(".countdown-button").addClass("hide");

    setTime();

    // Load next question after user has chosen an answer
    loadQuestion(currentIndex);

    $(".choiceBtn").on("click", function (event) {

        let userChoice = event.target.innerHTML;
        console.log(userChoice);
        console.log(questions[currentIndex].answer);

        if (userChoice === questions[currentIndex].answer) {
            score++;
            $("#score").text(score + " / " + questions.length);
            console.log("Score: " + score);
            $("#feedback").text("Yeah baby!");

        } else if (userChoice !== questions[currentIndex].answer) {
            secondsElapse += 5;
            $("#score").text(score + " / " + questions.length);
            $("#feedback").text("Wrong baka!");
        }

        setTimeout(function () {
            $("#feedback").text("");
            currentIndex++;
            loadQuestion(currentIndex);
        }, 1000);
    });

});

function loadQuestion(currentIndex) {

    console.log("Current question : " + currentIndex);

    if (currentIndex < questions.length) {
        // Present question 
        h2QuestionEl.textContent = questions[currentIndex].question;
    }
    else {
        endGame();
    }

    // Append answer buttons for each question
    choicesEl.appendChild(choiceA);
    choicesEl.appendChild(choiceB);
    choicesEl.appendChild(choiceC);

    // Present choices
    choiceA.textContent = questions[currentIndex].choices[0];
    choiceB.textContent = questions[currentIndex].choices[1];
    choiceC.textContent = questions[currentIndex].choices[2];
};

// When game ended
function endGame() {
    $(".image-wrapper").addClass("hide");
    $(".time-left").addClass("hide");
    $(".score-box").addClass("hide");
    $(".question-wrapper").addClass("hide");
    $("#game-over").text("GAME OVER!");
    $("#end-game-score").text("Your score is: " + score + " out of " + questions.length);
    $("#save-score-btn").removeClass("hide");
    $(".restart-button-box").removeClass("hide");

    if (score === questions.length) {
        $("#image-victory-wrapper").removeClass("hide");
    }
    else if (score < questions.length) {
        $("#image-prisoner-wrapper").removeClass("hide");
    }
};

// Save score and user's name to local storage
$("#save-score-btn").on("click", function (event) {
    event.preventDefault();

    $(".game-over-section").addClass("hide");

    // Ask for user's name
    $(".user-name-form").removeClass("hide");
});

$("#save-btn").on("click", function (event) {
    event.preventDefault();

    // get saved scores from localstorage, or if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    if (inputName.value === "") {
        inputName.value = "Anonymous"
    };
    
    var newScore = {
        player: inputName.value,
        score: score
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
}); 

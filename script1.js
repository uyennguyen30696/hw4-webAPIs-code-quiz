// Countdown timer
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Variables

// From index.html
var countdownButton = document.querySelector(".countdown-button");

// From questions.html
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var score = 0;
var totalSeconds = 60;
var secondsElapse = 0;

// These two functions are to make sure there's a leading 0 before minutes and seconds when they are <10 (for styling purpose only)
function getFormattedMinutes() {

    var secondsLeft = totalSeconds - secondsElapse; 

    var minutesLeft = Math.floor(secondsLeft / 60);

    if (minutesLeft < 10) {
        var formattedMinutes = "0" + minutesLeft;
    }
    else {
        formattedMinutes = minutesLeft;
    }
    return formattedMinutes;
}

function getFormattedSeconds() {

    var secondsLeft = (totalSeconds - secondsElapse) % 60; 

    if (secondsLeft < 10) {
        var formattedSeconds = "0" + secondsLeft;
    }
    else {
        formattedSeconds = secondsLeft;
    }
    return formattedSeconds;

}

// Set time to work when "Let's go" button is clicked
function setTime() {
    var timerInterval = setInterval (function() {
        secondsElapse++;
        minutesDisplay.textContent = getFormattedMinutes();
        secondsDisplay.textContent = getFormattedSeconds();

        console.log(totalSeconds - secondsElapse);

        if (totalSeconds - secondsElapse <= 0) {
            clearInterval(timerInterval);
            console.log("Time's Up!");
        }

    },1000); 
}

// Questions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var questions = [
    {
        question: "What is the first element on the periodic table?",
        choices: ["A. Hydrogen", "B. Helium", "C. Carbon"],
        answer: "C. Carbon"
    },
    {
        question: "Acid has pH above 7",
        choices: ["A. True", "B. False", "C. pH = 7"],
        answer: "B. False"
    },
    {
        question: "Chemical symbol for gold is:",
        choices: ["A. Au", "B. Cu", "C. Gu"],
        answer: "Au"
    },
    {
        question: "What is the charge of an electron?",
        choices: ["A. Neutral", "B. Positive", "C. Negative"],
        answer: "C. Negative"
    },
    {
        question: "In human, antibiotic is used to treat what kind of infection?",
        choices: ["A. Viral", "B. Bacterial", "C. Both viral and bacterial"],
        answer: "B. Bacterial"
    },
]




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

// countdownButton.addEventListener("click", function() {
//     setTime();
// });

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
// From questions.html
var questionWrapperEl = document.querySelector(".question-wrapper");
var h1QuestionEl = document.querySelector("#question");

// Store body as a variable
var body = document.body;

// Create buttons for answers in each question
var choiceA = document.createElement("button");
// body.questionWrapperEl.children[1].children[0].createElement("button") = choiceA;
choiceA.setAttribute("class", "btn");
choiceA.setAttribute("id", "choiceA");

var choiceB = document.createElement("button");
choiceB.setAttribute("class", "btn");
choiceB.setAttribute("id", "choiceB");

var choiceC = document.createElement("button");
choiceC.setAttribute("class", "btn");
choiceC.setAttribute("id", "choiceC");

// When click start button, setTime() runs to countdown time and questions are presented
countdownButton.addEventListener("click", function() {
    setTime();

    // First question presented
    for (i= 0; i < questions.length; i++) {
        body.appendChild(choiceA);
        body.appendChild(choiceB);
        body.appendChild(choiceC);
        // Present question
        h1QuestionEl.textContent = questions[i].question;
        // Present choices
        choiceA.textContent = questions[i].choices[0];
        choiceB.textContent = questions[i].choices[1];
        choiceC.textContent = questions[i].choices[2];

        // When user clicked to make choices
        $("#choiceA").on("click", function() {
            loadNextQuestion();
        });
        $("#choiceB").on("click", function() {
            loadNextQuestion();
        });
        $("#choiceC").on("click", function() {
            loadNextQuestion();
        });
        
        // Load next question function
        function loadNextQuestion() {
            for (i= 0; i < questions.length; i++) {
                // Get user choice
                var userChoice = this.innerHTML;

                // If correct answer is selected
                // Plus one score for one correct answer
                if (userChoice === questions[i].answer) {
                    score++;
                    i++;

                    // Present question
                    h1QuestionEl.textContent = questions[i].question;
                    // Present choices
                    choiceA.textContent = questions[i].choices[0];
                    choiceB.textContent = questions[i].choices[1];
                    choiceC.textContent = questions[i].choices[2];
                }
                // If incorrect answer is selected (else)
                // Subtract 5 sec in the countdown timer for each incorrect answer
                else if (userChoice !== questions[i].answer) {
                    secondsElapse -= 5;
                    i++;

                    // Present question
                    h1QuestionEl.textContent = questions[i].question;
                    // Present choices
                    choiceA.textContent = questions[i].choices[0];
                    choiceB.textContent = questions[i].choices[1];
                    choiceC.textContent = questions[i].choices[2];
                }
            }
        }
    }
     
});

// When game ended
// If timer over
// If reach the last question before time is over

// Enter name and save score

// Reset button at the end of the game




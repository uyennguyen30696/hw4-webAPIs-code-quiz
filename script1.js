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
    var timerInterval = setInterval(function () {
        secondsElapse++;
        minutesDisplay.textContent = getFormattedMinutes();
        secondsDisplay.textContent = getFormattedSeconds();

        // console.log(totalSeconds - secondsElapse);

        if (totalSeconds - secondsElapse <= 0) {
            clearInterval(timerInterval);
            console.log("Time's Up!");
        }

    }, 1000);
}


// Questions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// From questions.html
var h1QuestionEl = document.querySelector("#question");
var choicesEl = document.querySelector(".choices");
// let result = document.querySelector(".result");
let h3element = document.querySelector(".result");

// Create buttons for answers in each question
var choiceA = document.createElement("button");
choiceA.setAttribute("class", "btn");
choiceA.setAttribute("id", "btnA");
// choiceA.setAttribute("value", choiceA);

var choiceB = document.createElement("button");
choiceB.setAttribute("class", "btn");
choiceB.setAttribute("id", "btnB");
// choiceB.setAttribute("value", choiceB);

var choiceC = document.createElement("button");
choiceC.setAttribute("class", "btn");
choiceC.setAttribute("id", "btnC");
// choiceB.setAttribute("value", choiceC);


// When click start button, setTime() runs to countdown time and questions are presented
countdownButton.addEventListener("click", function () {
    setTime();

    // Load first question
    loadQuestion(0);

    var currentIndex = 0;
    
    $(".btn").on("click", function (event) {
        let userChoice = event.target.innerHTML;
        console.log(userChoice);
        console.log(questions[currentIndex].answer);
    
        if (userChoice === questions[currentIndex].answer) {
            score++;
            h3element.textContent = "Yeah baby";
        } else {
            console.log("Wrong Baka!!!");
            h3element.textContent = "Wrong Bbay";
        }
        
        if (currentIndex === questions.length - 1) {
            console.log("Questions are finished Baka!!!");
            console.log("Your score is: " + score  + " out of " + questions.length);


        } else {
            currentIndex++; 
            loadQuestion(currentIndex);
        }
    });

    // function sleepFor(sleepDuration) {
    //     var now = new Date().getTime();
    //     while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }   
    // }

    function loadQuestion(questionId) {
        // sleepFor(2000);
        console.log("Uyen QuestionId is : " + questionId);
        // Present question 
        h1QuestionEl.textContent = questions[questionId].question;

        // Append answer buttons for each question
        choicesEl.appendChild(choiceA);
        choicesEl.appendChild(choiceB);
        choicesEl.appendChild(choiceC);

        // Present choices
        choiceA.textContent = questions[questionId].choices[0];
        choiceB.textContent = questions[questionId].choices[1];
        choiceC.textContent = questions[questionId].choices[2];

        // h3element.textContent = "";
    }
        // When user clicked to make choices

        // Get user choice


        /* for (var i = 0; i < questions.length; i++) {
            console.log("QUESTIONS.LENGTH: ", questions.length);

            // let userChoice = choicesEl.onclick;
            // let userChoice = this.innerHTML;

            // If correct answer is selected
            // Plus one score for one correct answer
            if (userChoice === questions[i].answer) {
                score++;
                i++;
                console.log(userChoice)
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

                i++;
                console.log(userChoice)
                // Present question
                h1QuestionEl.textContent = questions[i].question;
                // Present choices
                choiceA.textContent = questions[i].choices[0];
                choiceB.textContent = questions[i].choices[1];
                choiceC.textContent = questions[i].choices[2];
            }
        }
        */
}); 


// When game ended
// If timer over
// If reach the last question before time is over

// Enter name and save score

// Reset button at the end of the game








/*




*/
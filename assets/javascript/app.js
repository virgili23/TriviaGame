// ----------------------------------------- PSEUDO CODE ---------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// -------------------------------------- GLOBAL VARIABLES ----------------------------------------------

var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var playerSelect;



// Array for questions and their respective answers -------------
var questions = [
    {
        question: "What color are bananas?",
        choices: ["red","blue", "green", "yellow"],
        answer: 3
    },

    {
        question: "What color are oranges?",
        choices: ["red", "green", "orange", "blue"],
        answer: 2
    },

    {
        question: "What color are apples?",
        choices: ["red", "green", "orange", "blue"],
        answer: 0
    },

    {
        question: "What color are pears?",
        choices: ["red", "green", "orange", "blue"],
        answer: 1
    },

    {
        question: "What color are strawberries?",
        choices: ["red", "green", "orange", "blue"],
        answer: 0
    }

];

// ----------------- Testing Log Station ------------------------------------------
////////////////////////////////////////////////////////////////////////////////////
//console.log(questions[0].question);

// $().();
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// Messages to appear for answers and end of quiz

var messages = {
	correct: "Yes, that's correct!",
	incorrect: "Sorry, that's incorrect!",
	timeOut: "Time's Up!",
	finished: "Done! Let's see how you did."
}


// -----------------Starting the game----------------------

$("#startBtn").on("click", function () {
    $(this).hide(); // hide the start button

    // Start new game function

    newGame();
});

// On new Game, reset all answers, and beginQuestion function runs
var newGame = function () {
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    beginQuestions(); // This pulls up the questions

}


// This function sets up the questions for the game
var beginQuestions = function () {

    // Let's log it first
    console.log(questions[0].question);

    // Action Phase
    // Question:
    $("#question").html(questions[0].question);
   
   
    // Choices:
    // for loops does this four times
    for (i=0; i < 4; i++ ) {
        
        var choices = $('<div>');
        $("#choices-div").append(questions[0].choices[i]);
        $("#choices-div").append(choices);
    } 

} // <---- End of function       


// function for clicking and answering
var answer = function() {
    var rightAnswers = questions[0].answer;
    $("#choices-div").on("click", function (){
        

        $("#game-content").hide();
    });
} // <---- End of function 



// ----- Answering INCORRECTLY ----------------------------------------------------------------------------
// Ending the timer results in a loss, A screen will show up showing the correct answer (IMG tag for that).
// That screen will show for a few seconds, and then immediately show the next question, timer and all.



// ----- Answering CORRECTLY -----------------------------------------------------------------------------
// Choosing the correct answer results in a win, and same screen saying CORRECT will pop up.
// // That screen will show for a few seconds, and then immediately show the next question, timer and all.



// ----- PLAY AGAIN? -------------------------------------------------------------------------------------
// After the last question, show a screen that shows the results, total wins and losses.
// And a restart button will do the same function as the start button.










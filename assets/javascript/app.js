/*// ----------------------------------------- PSEUDO CODE ---------------------------------------------------
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
        answer: "yellow"
    },

    {
        question: "What color are oranges?",
        choices: ["red", "green", "orange", "blue"],
        answer: "orange"
    },

    {
        question: "What color are apples?",
        choices: ["red", "green", "orange", "blue"],
        answer: "red"
    },

    {
        question: "What color are pears?",
        choices: ["red", "green", "orange", "blue"],
        answer: "green"
    },

    {
        question: "What color are strawberries?",
        choices: ["red", "green", "orange", "blue"],
        answer: "red"
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
    $("#question").html("<h2>" + questions[0].question + "</h2>");
   
   
    // Choices:
    // for loops does this four times
    for (i=0; i < 4; i++ ) {
        
        var choices = $('<div>');
        $("#choices-div").append("<h3>" + questions[0].choices[i] + "</h3>");
        $("#choices-div").append(choices);
    } 

} // <---- End of function       


// function for clicking and answering
var answer = function() {
    var rightAnswer = questions[0].answer;
    $("#choices-div").on("click", function (){
        if (rightAnswer) {
            correctAnswer++
        } else {
            incorrectAnswer++
        }

        $("#game-content").hide();
    });
} // <---- End of function 

console.log(correctAnswer);
console.log(incorrectAnswer);

// I need to find a way to make it so I'm able to click on these self generated divs to return a correct,
// or incorrect answer



// ----- Answering INCORRECTLY ----------------------------------------------------------------------------
// Ending the timer results in a loss, A screen will show up showing the correct answer (IMG tag for that).
// That screen will show for a few seconds, and then immediately show the next question, timer and all.



// ----- Answering CORRECTLY -----------------------------------------------------------------------------
// Choosing the correct answer results in a win, and same screen saying CORRECT will pop up.
// // That screen will show for a few seconds, and then immediately show the next question, timer and all.



// ----- PLAY AGAIN? -------------------------------------------------------------------------------------
// After the last question, show a screen that shows the results, total wins and losses.
// And a restart button will do the same function as the start button.

*/


//////////////////////////////////////////////////////////////
// This is my revisited and corrected version of my assignment
// The original draft is above
//////////////////////////////////////////////////////////////

$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click", '.answer-button', function(e) {
    game.clicked(e);
})

$(document).on("click", '#reset' , function() {
    game.reset();
})

var questions = [
    {
    question: "What color are bananas?",
    answers: ["blue", "green", "red", "yellow"],
    correctAnswer: "yellow",
    image: "assets/images/banana.jpg"
}, {
    question: "What color are apples?",
    answers: ["blue", "green", "red", "yellow"],
    correctAnswer: "red",
    image: "assets/images/apple.jpg"
}, {
    question: "What color are pears?",
    answers: ["blue", "green", "red", "yellow"],
    correctAnswer: "green",
    image: "assets/images/pear.jpg"
}, {
    question: "What color are peaches?",
    answers: ["blue", "orange", "red", "yellow"],
    correctAnswer: "orange",
    image: "assets/images/peach.jpg"
}


];

var game = {
    questions: questions,
    currentQuestion:0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    countdown: function() {
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0) {
            console.log("times up!");
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html('<h2>Time left: <span id="counter">30</span> Seconds</h2>');
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question+'</h2>');
        for (var i=0; i<questions[game.currentQuestion].answers.length;i++) {
            $('#subwrapper').append('<button class="answer-button" id="button-'+ i + '" data-name="'+questions[game.
                currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button');
        }

    },
    nextQuestion: function() {
        game.counter=30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#subwrapper').html('<h2>Out of time!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

        if (game.currentQuestion == questions.length-1) {
            setTimeout(game.results, 3 * 1000);
        }else{
            setTimeout(game.nextQuestion, 3 * 1000);
        }
        unanswered++;
    },
    results: function() {
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE, LET'S SEE HOW YOU DID!</h2>");
        $('#subwrapper').append('<h3>Correct: ' + game.correct + '</h3>');
        $('#subwrapper').append('<h3>Incorrect: ' + game.incorrect + '</h3>');
        $('#subwrapper').append('<h3>Unanswered: ' + game.unanswered + '</h3>');
        $('#subwrapper').append('<button id="reset" class="btn btn-primary">Play Again?</button>');

    },
    clicked: function(e) {
        clearInterval(timer);
        if($(e.target).data('name') == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("nice!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You got it!</h2>');
        $('#subwrapper').append('<img src= "'+ questions[game.currentQuestion].image + '" alt="fruit">');
        if (game.currentQuestion == questions.length-1) {
            setTimeout(game.results, 3 * 1000);
        }else{
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("wrong!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>You got it wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        $('#subwrapper').append('<img src= "'+ questions[game.currentQuestion].image + '" alt="fruit">');
        if (game.currentQuestion == questions.length-1) {
            setTimeout(game.results, 3 * 1000);
        }else{
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
        
    
}










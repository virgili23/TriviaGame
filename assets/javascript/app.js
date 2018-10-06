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


// this is the game organizer

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

        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#subwrapper').html('<h2>Out of time!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

        if (game.currentQuestion == questions.length -1) {
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










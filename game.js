var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currLevel = 0;
var started = false;

function nextSequence() {
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
}

// When button clicked
$(".btn").click(function() {
    let userChosenColour = $(this).attr('id');
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(currLevel);
});

// Function to play sound
function playSound(name) {
    new Audio('sounds/' + name + ".mp3").play();
    $("#" + name).fadeOut(100).fadeIn(100);
}

//Function to animate button pressed
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

// First time key entered
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

// Check Answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        currLevel++;
        if (currentLevel === level) {
            userClickedPattern = [];
            currLevel = 0;
            level++;
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currLevel = 0;
    started = false;
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;
var bestScore = 0;
var playerName = "";

$(document).ready(function() {    
    playerName = prompt("Enter your name :");
    loadScores();
    displayLeaderboard(); // Initialize leaderboard with empty list
  });

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        updateHighScore(currentLevel);
        displayLeaderboard();

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();             
    }
}
    
function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    updateHighScore(level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {    
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}


function displayLeaderboard() {
    $("#leaderboard-list").empty();
    if (bestScore > 0) {
      $("#leaderboard-list").append($("<li>").text(playerName + ": " + bestScore));
    } else {
      $("#leaderboard-list").append($("<li>").text("No scores yet!"));
    }
  }

function loadBestScore() {
try {
    const data = JSON.parse(localStorage.getItem("bestScore"));
    if (data && data.name && data.score && data.name === playerName) {
    bestScore = data.score;
    }
} catch (error) {
    console.error("Error loading best score:", error);
}
}

// Function to save best score to JSON file (security considered)
function saveBestScore() {
const scoreData = {
    name: playerName.replace(/<[^>]*>/g, ""), // Sanitize name to prevent XSS
    score: bestScore
};
try {
    localStorage.setItem("bestScore", JSON.stringify(scoreData));
} catch (error) {
    console.error("Error saving best score:", error);
}
}

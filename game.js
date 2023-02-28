var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  //Show inout
  console.log("User : " + userClickedPattern);

});


function nextSequence() {
 userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
  //show input
  console.log(randomChosenColour);
  console.log("Computer : " + gamePattern);
}

//Play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation button
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

//Check answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    console.log("wrong");
  }
}

function gameOver(){
  started = false ;
  gamePattern = [];
  userClickedPattern=[];
  level = 0 ;

  //Change background
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  //playSound
  playSound('wrong');
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

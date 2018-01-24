function setCourt(court, paddle1, paddle2, ball) {
  console.log("setCourt");
  $("#court").css("width", court.width + "px");
  $("#court").css("height", court.height + "px");
  $("#court").css("margin-left", -court.width/2 + "px");
  $("#court").css("margin-top", -court.height/2 + "px");

  $("#paddle1").css("width", paddle1.width + "px");
  $("#paddle1").css("height", paddle1.height + "px");
  $("#paddle1").css("margin-left", paddle1.x + "px");
  $("#paddle1").css("margin-top", paddle1.y + "px");


  $("#paddle2").css("width", paddle2.width + "px");
  $("#paddle2").css("height", paddle2.height + "px");
  $("#paddle2").css("margin-left", paddle2.x + "px");
  $("#paddle2").css("margin-top", paddle2.y + "px");

  $("#ball").css("width", ball.width + "px");
  $("#ball").css("height", ball.height + "px");
  $("#ball").css("margin-left", ball.x + "px");
  $("#ball").css("margin-top", ball.y + "px");
};

function render() {
  paddle1.y = parseInt($("#paddle1").css("margin-top"));
  paddle2.y = parseInt($("#paddle2").css("margin-top"));
  ball.x = parseInt($("#ball").css("margin-left"));
  ball.y = parseInt($("#ball").css("margin-top"));

  var tooHigh1 =  paddle1.y < 20;
  var tooLow1 = paddle1.y > court.height - paddle1.height - 30;
  var tooHigh2 = paddle2.y < 20;
  var tooLow2 = paddle2.y > court.height - paddle2.height - 30;

  if (keys[0] && !tooHigh1){
    $("#paddle1").animate({
        "margin-top": "-=25px"
    }, 20);
  };
  if (keys[1] && !tooLow1){
    $("#paddle1").animate({
        "margin-top": "+=25px"
    }, 20);
  };
  if (keys[2] && !tooHigh2){
    $("#paddle2").animate({
        "margin-top": "-=25px"
    }, 20);
  };
  if (keys[3] && !tooLow2){
    $("#paddle2").animate({
        "margin-top": "+=25px"
    }, 20);
  };

  var ballTooHigh = ball.y < 20;
  var ballTooLow = ball.y > court.height - ball.height - 20;
  if (ballTooHigh && ball.yVel < 0) ball.yVel *= -1;
  if (ballTooLow && ball.yVel > 0) ball.yVel *= -1;


  var ballTooLeft = ball.x < 80;
  var ballTooRight = ball.x > court.width - ball.width - 80;

  var ballLowerThanPaddle2 = ball.y > paddle2.y + paddle2.height;
  console.log(ballLowerThanPaddle1);

  if (ballTooLeft && ball.xVel < 0) {
    var ballHigherThanPaddle1 = ball.y < paddle1.y + ball.height;
    var ballLowerThanPaddle1 = ball.y > paddle1.y + paddle1.height;
    if (ballHigherThanPaddle1 || ballLowerThanPaddle1) {
      $("#win2").show();
      clearInterval(gameLoop);
    } else ball.xVel *= -1;
  }

  if (ballTooRight && ball.xVel > 0) {
    var ballHigherThanPaddle2 = ball.y < paddle2.y + ball.height;
    var ballLowerThanPaddle2 = ball.y > paddle2.y + paddle1.height;
    if (ballHigherThanPaddle2 || ballLowerThanPaddle2) {
      $("#win1").show();
      clearInterval(gameLoop);
    } else ball.xVel *= -1;
  }

  $("#ball").animate({"margin-left": "+=" + ball.xVel/20 + "px", "margin-top": "+=" + ball.yVel/20 + "px"}, 10);
};

$(document).ready(function(){
  court = {width: 1500, height: 900};
  paddle1 = {x: 20, y: 450 - 140, width: 40, height: 280};
  paddle2 = {x: 1500 - 60, y: 450 - 140, width: 40, height: 280};
  ball = {x: 750 - 20, y: 450-25, width: 40, height: 40, xVel: -300, yVel: 50};
  setCourt(court, paddle1, paddle2, ball);

  keys = new Array(4);
  $(document).keydown(function(event) {
    var key = event.keyCode;
    //console.log("keydown" + key);

    if (key === 87) keys[0] = true;
    if (key === 83) keys[1] = true;
    if (key === 38) keys[2] = true;
    if (key === 40) keys[3] = true;
  });
  $(document).keyup(function(event) {
    var key = event.keyCode;
  //  console.log("keyup" + key);


    if (key === 87) keys[0] = false;
    if (key === 83) keys[1] = false;
    if (key === 38) keys[2] = false;
    if (key === 40) keys[3] = false;
  });


  var gameLoop = setInterval(function(ball, keys) {render(ball, keys);}, 50);
});

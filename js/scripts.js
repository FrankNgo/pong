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

$(document).ready(function(){
  var court = {width: 1500, height: 900};
  var paddle1 = {x: 20, y: 450 - 140, width: 40, height: 280};
  var paddle2 = {x: 1500 - 60, y: 450 - 140, width: 40, height: 280};
  var ball = {x: 750 - 20, y: 450-25, width: 40, height: 40, xVel: -100, yVel: 50};
  setCourt(court, paddle1, paddle2, ball);
  $(document).keypress(function(event) {
    console.log(event.keyCode);
    var key = event.keyCode;

    if (key === 119) {
      console.log("1up");
      $("#paddle1").animate({
          "margin-top": "-=20px"
      }, 10);
    };
    if (key === 115) {
      console.log("1down");

      $("#paddle1").animate({
          "margin-top": "+=20px"
      }, 10);
    };
    if (key === 111) {
      console.log("2up");

      $("#paddle2").animate({
          "top": "-=20px"
      }, 10);
    };
    if (key === 108) {
      console.log("2down");

      $("#paddle2").animate({
          "top": "+=20px"
      }, 10);
    };
  });
//recursive call
  $("#ball").animate({"margin-left": "+=" + ball.xVel*5 + "px", "margin-top": "+=" + ball.yVel*5 + "px"}, 3000);
});

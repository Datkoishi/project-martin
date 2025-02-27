$(document).ready(function () {
  $(".stepSingle").eq(0).addClass("active");
  $(".bgColor").css("height", "25%");
});

// countdown

var countDownDate = new Date("Feb 21, 2024").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var weeks = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 7));
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $("#hours").text(hours);
  $("#minutes").text(minutes);
  $("#seconds").text(seconds);

  if (distance < 0) {
    clearInterval(x);
    $("#days").text("0");
    $("#hours").text("0");
    $("#minutes").text("0");
    $("#seconds").text("0");
  }
}, 1000);

// next prev
var divs = $(".show-section fieldset");
var Buttons = $(".nextPrev");
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first
Buttons.hide().first().show(); // hide all divs except first

function next() {
  divs.eq(now).hide();
  now = now + 1 < divs.length ? now + 1 : 0;
  divs.eq(now).show(); // show next
  console.log(now);

  $(".stepBar .fill").animate(
    {
      width: now * 25 + "%",
    },
    500
  );
  $(".stepSingle").eq(now).addClass("active");
  $(".bgColor").css("height", now * 25 + "%");

  Buttons.hide().eq(now).show();
}
$(".prev").on("click", function () {
  divs.eq(now).hide();
  now = now > 0 ? now - 1 : divs.length - 1;
  divs.eq(now).show(); // show previous
  console.log(now);
  Buttons.hide().eq(now).show();

  $(".option").addClass("animate");
  $(".option").removeClass("animateReverse");

  $(".stepSingle")
    .eq(now + 1)
    .removeClass("active");
  $(".bgColor").css("height", now * 25 + "%");
});

// quiz validation
var checkedradio = false;

function radiovalidate(stepnumber) {
  var checkradio = $("#step" + stepnumber + " input")
    .map(function () {
      if ($(this).is(":checked")) {
        return true;
      } else {
        return false;
      }
    })
    .get();

  checkedradio = checkradio.some(Boolean);
}

$(document).ready(function () {
  $(".stepBar .fill").css("width", "0");

  // check step1
  $("#step1btn").on("click", function () {
    radiovalidate(1);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(1);
    } else {
      $("#step1 .option").removeClass("animate");
      $("#step1 .option").addClass("animateReverse");
      setTimeout(function () {
        next();
      }, 900);
      // countresult(1);
    }
  });
  // check step2
  $("#step2btn").on("click", function () {
    radiovalidate(2);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(2);
    } else {
      $("#step2 .option").removeClass("animate");
      $("#step2 .option").addClass("animateReverse");
      setTimeout(function () {
        next();
      }, 900);
      // countresult(1);
    }
  });
  // check step3
  $("#step3btn").on("click", function () {
    radiovalidate(3);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(3);
    } else {
      $("#step3 .option").removeClass("animate");
      $("#step3 .option").addClass("animateReverse");
      setTimeout(function () {
        next();
      }, 900);
      // countresult(1);
    }
  });
  // check step4
  $("#sub").on("click", function () {
    radiovalidate(4);

    if (checkedradio == false) {
      (function (el) {
        setTimeout(function () {
          el.children().remove(".reveal");
        }, 3000);
      })(
        $("#error").append(
          '<div class="reveal alert alert-danger">Choose an option!</div>'
        )
      );

      radiovalidate(4);
    } else {
      showresult();
    }
  });
});

if ($("body").not(".is-mobile").hasClass("ep-magic-cursor")) {
  $(".ep-magnetic-item").wrap('<div class="ep-magnetic-wrap"></div>');

  if ($("a.ep-magnetic-item").length) {
    $("a.ep-magnetic-item").addClass("not-hide-cursor");
  }

  var $mouse = { x: 0, y: 0 }; // Cursor position
  var $pos = { x: 0, y: 0 }; // Cursor position
  var $ratio = 0.15; // delay follow cursor
  var $active = false;
  var $ball = $("#ball");

  var $ballWidth = 5; // Ball default width
  var $ballHeight = 5; // Ball default height
  var $ballScale = 1; // Ball default scale
  var $ballOpacity = 1; // Ball default opacity
  var $ballBorderWidth = 1; // Ball default border width

  gsap.set($ball, {
    // scale from middle and style ball
    xPercent: -50,
    yPercent: -50,
    width: $ballWidth,
    height: $ballHeight,
    borderWidth: $ballBorderWidth,
    opacity: $ballOpacity,
  });

  document.addEventListener("mousemove", mouseMove);

  function mouseMove(e) {
    $mouse.x = e.clientX;
    $mouse.y = e.clientY;
  }

  gsap.ticker.add(updatePosition);

  function updatePosition() {
    if (!$active) {
      $pos.x += ($mouse.x - $pos.x) * $ratio;
      $pos.y += ($mouse.y - $pos.y) * $ratio;

      gsap.set($ball, { x: $pos.x, y: $pos.y });
    }
  }

  // Show/hide magic cursor //

  // Hide on hover//
  $("a, button, .tp-cart-minus, .tp-cart-plus") // class "hide-cursor" is for global use.
    .not(".cursor-hide") // omit from selection.
    .on("mouseenter", function () {
      gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
    })
    .on("mouseleave", function () {
      gsap.to($ball, {
        duration: 0.3,
        scale: $ballScale,
        opacity: $ballOpacity,
      });
    });

  // Hide on click//
  $("a")
    .not('[target="_blank"]') // omit from selection.
    .not(".cursor-hide") // omit from selection.
    .not('[href^="#"]') // omit from selection.
    .not('[href^="mailto"]') // omit from selection.
    .not('[href^="tel"]') // omit from selection.
    .not(".lg-trigger") // omit from selection.
    .not(".tp-btn-disabled a") // omit from selection.
    .on("click", function () {
      gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
    });

  // Show/hide on document leave/enter//
  $(document)
    .on("mouseleave", function () {
      gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
    })
    .on("mouseenter", function () {
      gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
    });

  // Show as the mouse moves//
  $(document).mousemove(function () {
    gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
  });

  // Cursor view on hover (data attribute "data-cursor="...").
  $("[data-cursor]").each(function () {
    $(this)
      .on("mouseenter", function () {
        $("#ball").addClass("with-blur");
        $ball.append('<div class="ball-view"></div>');
        $(".ball-view").append($(this).attr("data-cursor"));
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -75,
          width: 90,
          height: 90,
          opacity: 1,
          borderWidth: 1,
          zIndex: 1,
          backdropFilter: "blur(14px)",
          backgroundColor: "#ff6644",
          boxShadow: "0px 1px 3px 0px rgba(18, 20, 32, 0.14)",
        });
        gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
      })
      .on("mouseleave", function () {
        gsap.to(ball, {
          duration: 0.3,
          yPercent: -50,
          width: $ballWidth,
          height: $ballHeight,
          opacity: $ballOpacity,
          borderWidth: $ballBorderWidth,
          backgroundColor: "#1c1d21",
        });
        gsap.to(".ball-view", {
          duration: 0.3,
          scale: 0,
          autoAlpha: 0,
          clearProps: "all",
        });
        $ball.find(".ball-view").remove();
      });
    $(this).addClass("not-hide-cursor");
  });
}

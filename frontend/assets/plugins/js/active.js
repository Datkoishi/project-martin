/* ================================================================================
    Author          : ThemeCorn
    Template Name   : Edupath - Education, Course & Online Learning HTML Template
    Version         : 1.0
* ================================================================================= */

(function ($) {
  "use strict";
  $(document).on("ready", function () {

    /*==============================================================================
      Header Sticky JS
    ===============================================================================*/
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 100) {
        $(".ep-header__middle").removeClass("sticky");
      } else {
        $(".ep-header__middle").addClass("sticky");
      }
    });

    /*==============================================================================
      Mobile Menu JS
    ===============================================================================*/
    var $offcanvasNav = $("#offcanvas-menu a");
    $offcanvasNav.on("click", function () {
      var link = $(this);
      var closestUl = link.closest("ul");
      var activeLinks = closestUl.find(".active");
      var closestLi = link.closest("li");
      var linkStatus = closestLi.hasClass("active");
      var count = 0;

      closestUl.find("ul").slideUp(function () {
        if (++count == closestUl.find("ul").length)
          activeLinks.removeClass("active");
      });
      if (!linkStatus) {
        closestLi.children("ul").slideDown();
        closestLi.addClass("active");
      }
    });

    /*==============================================================================
      Wow JS
    ================================================================================*/
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }

    /*==============================================================================
      CounterUp JS
    ================================================================================*/
    $(".counter").counterUp({
      time: 1500,
    });

    /*=============================================================================
      Nice Select JS
    ===============================================================================*/
    $("select").niceSelect();

    /*=============================================================================
      Video Popup JS
    ===============================================================================*/
    $(".popup-video").magnificPopup({
      type: "iframe",
    });

    /*=============================================================================
      Hobble Effect JS
    ===============================================================================*/
    function hobbleEffect() {
      $(document)
        .on("mousemove", ".ep-hobble", function (event) {
          var halfW = this.clientWidth / 2;
          var halfH = this.clientHeight / 2;
          var coorX = halfW - (event.pageX - $(this).offset().left);
          var coorY = halfH - (event.pageY - $(this).offset().top);
          var degX1 = (coorY / halfH) * 8 + "deg";
          var degY1 = (coorX / halfW) * -8 + "deg";
          var degX3 = (coorY / halfH) * -15 + "px";
          var degY3 = (coorX / halfW) * 15 + "px";

          $(this)
            .find(".ep-hover-layer-1")
            .css("transform", function () {
              return (
                "perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(" +
                degX1 +
                ") rotateY(" +
                degY1 +
                ")"
              );
            });
          $(this)
            .find(".ep-hover-layer-2")
            .css("transform", function () {
              return (
                "perspective( 800px ) translateX(" +
                degX3 +
                ") translateY(" +
                degY3 +
                ") scale(1.02)"
              );
            });
        })
        .on("mouseout", ".ep-hobble", function () {
          $(this).find(".ep-hover-layer-1").removeAttr("style");
          $(this).find(".ep-hover-layer-2").removeAttr("style");
        });
    }
    hobbleEffect();

    /*==============================================================================
      Brand Slider JS
    ================================================================================*/
    $(".ep-brand__slider").owlCarousel({
      items: 6,
      autoplay: true,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: false,
      nav: false,
      margin: 24,
      responsive: {
        300: {
          items: 2,
        },
        480: {
          items: 2,
        },

        768: {
          items: 3,
        },
        1024: {
          items: 4,
        },
        1280: {
          items: 6,
        },
      },
    });

    /*==============================================================================
      Testimonial Slider JS
    ================================================================================*/
    $(".ep-testimonial__slider").owlCarousel({
      items: 2,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      margin: 30,
      dots: false,
      nav: true,
      navText: [
        "<i class='fi fi-rs-angle-small-left'></i>",
        "<i class='fi fi-rs-angle-small-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },

        768: {
          items: 1,
        },
        1024: {
          items: 2,
        },
        1280: {
          items: 2,
        },
      },
    });

    /*==============================================================================
      Course Slider JS
    ================================================================================*/
    $(".ep-course__slider").owlCarousel({
      items: 1,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      smartSpeed: 500,
      merge: true,
      margin: 30,
      dots: true,
      nav: false,
    });

    /*==============================================================================
      Event Slider JS
    ================================================================================*/
    $(".ep-event__slider").owlCarousel({
      items: 4,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      smartSpeed: 500,
      merge: true,
      margin: 30,
      dots: false,
      nav: true,
      navText: [
        "<i class='fi fi-rs-arrow-small-left'></i>",
        "<i class='fi fi-rs-arrow-small-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 3,
        },
        1570: {
          items: 4,
        },
      },
    });

    /*==============================================================================
      Realted Team Slider JS
    ================================================================================*/
    $(".ep-team__related-slider").owlCarousel({
      items: 3,
      autoplay: false,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      smartSpeed: 500,
      merge: true,
      margin: 30,
      dots: false,
      nav: true,
      navText: [
        "<i class='fi fi-rs-arrow-small-left'></i>",
        "<i class='fi fi-rs-arrow-small-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1280: {
          items: 3,
        },
      },
    });
  });

  /*==============================================================================
    Custom Cursor JS
  ================================================================================*/
  document.addEventListener("DOMContentLoaded", function () {
    var cursor = document.querySelector(".cursor");
    var cursor2 = document.querySelector(".cursor2");
    document.addEventListener("mousemove", function (e) {
      cursor.style.cssText = cursor2.style.cssText =
        "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    });
    var cursorScale = document.querySelectorAll(
      "a, button, .brand-item,.swiper-button-prev,.swiper-button-next, .icons"
    );
    cursorScale.forEach((link) => {
      link.addEventListener("mousemove", () => {
        cursor.classList.add("grow");
        if (link.classList.contains("small")) {
          cursor.classList.remove("grow");
          cursor.classList.add("grow-small");
        }
      });
      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
        cursor.classList.remove("grow-small");
      });
    });
  });

  /*==============================================================================
    Preloader JS
  ================================================================================*/
  var prealoaderOption = $(window);
  prealoaderOption.on("load", function () {
      var preloader = jQuery('.ep-preloader');
      var preloaderArea = jQuery('.ep-preloader');
      preloader.fadeOut();
      preloaderArea.delay(350).fadeOut('slow');
  });
  /*==============================================================================
    Smooth Scroll JS
  ================================================================================*/
  function smoothSctoll() {
    $(".smooth a").on("click", function (event) {
      var target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - 120,
            },
            1000
          );
      }
    });
  }
  smoothSctoll();
  if ($("#smooth-wrapper").length && $("#smooth-content").length) {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      TweenMax,
      ScrollToPlugin
    );

    gsap.config({
      nullTargetWarn: false,
    });

    let smoother = ScrollSmoother.create({
      smooth: 0.7,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
  }

  /*==============================================================================
    Split Text Animation JS
  ================================================================================*/
  var st = $(".ep-split-text");
  if (st.length == 0) return;
  gsap.registerPlugin(SplitText);
  st.each(function (index, el) {
    el.split = new SplitText(el, {
      type: "lines,words,chars",
      linesClass: "tp-split-line",
    });
    gsap.set(el, { perspective: 400 });
    if ($(el).hasClass("right")) {
      gsap.set(el.split.chars, {
        opacity: 0,
        x: "50",
        ease: "Back.easeOut",
      });
    }
    if ($(el).hasClass("left")) {
      gsap.set(el.split.chars, {
        opacity: 0,
        x: "-50",
        ease: "circ.out",
      });
    }
    if ($(el).hasClass("up")) {
      gsap.set(el.split.chars, {
        opacity: 0,
        y: "80",
        ease: "circ.out",
      });
    }
    if ($(el).hasClass("down")) {
      gsap.set(el.split.chars, {
        opacity: 0,
        y: "-80",
        ease: "circ.out",
      });
    }
    el.anim = gsap.to(el.split.chars, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      x: "0",
      y: "0",
      rotateX: "0",
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
    });
  });
})(jQuery);

// Function to handle quantity increment and decrement
const decreaseButtons = document.querySelectorAll('.ep-cart__quantity-decrease');
const increaseButtons = document.querySelectorAll('.ep-cart__quantity-increase');

// Only proceed if both decrease and increase buttons exist in the DOM
if (decreaseButtons.length > 0 && increaseButtons.length > 0) {
  
  decreaseButtons.forEach(button => {
    button.addEventListener('click', function () {
      const quantityInput = this.nextElementSibling;
      if (quantityInput) {  // Check if quantity input exists
        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
          quantity--;
          quantityInput.value = quantity;
        }
      }
    });
  });

  increaseButtons.forEach(button => {
    button.addEventListener('click', function () {
      const quantityInput = this.previousElementSibling;
      if (quantityInput) {  // Check if quantity input exists
        let quantity = parseInt(quantityInput.value);

        quantity++;
        quantityInput.value = quantity;
      }
    });
  });

}
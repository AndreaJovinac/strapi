/* ===================================================================
 * TypeRite - Main JS
 *
 *
 * ------------------------------------------------------------------- */

const cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: "", // mailchimp url
  },
  $WIN = $(window);

/* lancer la séquence d'initialisation
 * -------------------------------------------------- */
const start = function () {
  ssSearch();
  ssMenu();
  ssMasonryFolio();
  ssBricksAnimate();
  ssSlickSlider();
  ssSmoothScroll();
  ssAlertBoxes();
  ssBackToTop();
  ssReveal();
};

/* reveal
 * -------------------------------------------------- */
const ssReveal = function () {
  //force page scroll position to top at page refresh
  $("html, body").animate({ scrollTop: 0 }, "normal");

  // will first fade out the loading animation
  $("#loader").fadeOut("slow", function () {
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(300).fadeOut("slow");
  });
};

/* search
 * ------------------------------------------------------ */
const ssSearch = function () {
  const searchWrap = $(".search-block"),
    searchField = searchWrap.find(".search-field"),
    closeSearch = searchWrap.find(".search-close"),
    searchTrigger = $(".search-trigger"),
    siteBody = $("body");

  searchTrigger.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $this = $(this);

    siteBody.addClass("search-is-visible");
    setTimeout(function () {
      searchWrap.find(".search-field").focus();
    }, 100);
  });

  closeSearch.on("click", function (e) {
    const $this = $(this);

    e.stopPropagation();

    if (siteBody.hasClass("search-is-visible")) {
      siteBody.removeClass("search-is-visible");
      setTimeout(function () {
        searchWrap.find(".search-field").blur();
      }, 100);
    }
  });

  searchWrap.on("click", function (e) {
    if (!$(e.target).is(".search-field")) {
      closeSearch.trigger("click");
    }
  });

  searchField.on("click", function (e) {
    e.stopPropagation();
  });

  searchField.attr({ placeholder: "Type Keywords", autocomplete: "off" });
};

/* menu
 * ------------------------------------------------------ */
const ssMenu = function () {
  const menuToggle = $(".header__menu-toggle"),
    siteBody = $("body");

  menuToggle.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    menuToggle.toggleClass("is-clicked");
    siteBody.toggleClass("nav-wrap-is-visible");
  });

  $(".header__nav .has-children")
    .children("a")
    .on("click", function (e) {
      e.preventDefault();

      $(this)
        .toggleClass("sub-menu-is-open")
        .next("ul")
        .slideToggle(200)
        .end()
        .parent(".has-children")
        .siblings(".has-children")
        .children("a")
        .removeClass("sub-menu-is-open")
        .next("ul")
        .slideUp(200);
    });
};

/* slick slider
 * ------------------------------------------------------ */
const ssSlickSlider = function () {
  const $gallery = $(".slider__slides").slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    pauseOnFocus: false,
    fade: true,
    cssEase: "linear",
  });

  $(".slider__slide").on("click", function () {
    $gallery.slick(
      "slickGoTo",
      parseInt($gallery.slick("slickCurrentSlide")) + 1
    );
  });
};

/* smooth scrolling
 * ------------------------------------------------------ */
const ssSmoothScroll = function () {
  $(".smoothscroll").on("click", function (e) {
    const target = this.hash,
      $target = $(target);

    e.preventDefault();
    e.stopPropagation();

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        cfg.scrollDuration,
        "swing"
      )
      .promise()
      .done(function () {
        // check if menu is open
        if ($("body").hasClass("menu-is-open")) {
          $(".header-menu-toggle").trigger("click");
        }

        window.location.hash = target;
      });
  });
};

/* alert boxes
 * ------------------------------------------------------ */
const ssAlertBoxes = function () {
  $(".alert-box").on("click", ".alert-box__close", function () {
    $(this).parent().fadeOut(500);
  });
};

/* Back to Top
 * ------------------------------------------------------ */
const ssBackToTop = function () {
  const pxShow = 500,
    goTopButton = $(".go-top");

  // Show or hide the button
  if ($(window).scrollTop() >= pxShow) goTopButton.addClass("link-is-visible");

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= pxShow) {
      if (!goTopButton.hasClass("link-is-visible"))
        goTopButton.addClass("link-is-visible");
    } else {
      goTopButton.removeClass("link-is-visible");
    }
  });
};

/* masonry
 * ---------------------------------------------------- */
const ssMasonryFolio = function () {
  const containerBricks = $(".masonry");

  containerBricks.masonry({
    itemSelector: ".masonry__brick",
    columnWidth: ".grid-sizer",
    percentPosition: true,
    resize: true,
  });

  // layout Masonry after each image loads
  containerBricks.imagesLoaded().progress(function () {
    containerBricks.masonry("layout");
  });
};

/* animate bricks
 * ------------------------------------------------------ */
const ssBricksAnimate = function () {
  const animateEl = $(".animate-this");

  //$WIN.on("load", function () {
  setTimeout(function () {
    animateEl.each(function (ctr) {
      const el = $(this);

      setTimeout(function () {
        el.addClass("animated");
      }, ctr * 200);
    });
  }, 300);
  //});

  $WIN.on("resize", function () {
    // remove animation classes
    animateEl.removeClass("animate-this animated");
  });
};

start();

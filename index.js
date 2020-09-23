$(document).ready(function () {
  /*----------------GLOBAL----------------------*/
  $("button").each(function () {
    $(this).mouseover(function () {
      $(this).find("h3").css("color", "#b21f66");
    });
  });

  $("button").each(function () {
    $(this).mouseleave(function () {
      $(this).find("h3").css("color", "#381460");
    });
  });
  /* -------------------END GLOBAL----------------*/

  /*----------------ABOUT SECTION-------------------*/
  /* Load about section and slide on site load */
  $(".about").animate({ opacity: 1 }, 1000, function () {
    $(".blurb").slideDown(1000);
  });
  /* --------------END ABOUT SECTION----------------*/

  /*-------------ON SCROLL: SECTIONS -------------*/
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    /* Check the location of each 'section'. If it is more than 1/5th of the screen height from the bottom of the screen, fade in */
    let screenBottom = $($(window).scrollTop() + $(window).height());
    let appearAfterScroll = $(window).height() / 2;
    let navFocus = $(window).height() / 2;

    $(".section").each(function () {
      if (
        $(this).position().top + appearAfterScroll <
        screenBottom[0]
      ) {
        $(this).animate({ opacity: 1 }, 1200);
        /* If the section is contacts and is first time have scrolled to contacts section, animate social media logos to bounce and fade in one after the other */
        if (
          $(this).attr("id") === "contact" &&
          $(this).css("opacity") === "0"
        ) {
          $(".logo").each(function (i) {
            $(this)
              .delay(500 * i)
              .animate({ top: -10 }, "fast")
              .animate({ opacity: 1 }, "fast")
              .animate({ top: 30 }, "fast")
              .animate({ top: 10 }, "fast");
          });
        }
      }

      /* Shows underline only on nav link in nav bar corresponding to the section screen is on.
          When page loads at top, will automatically have "about" link underlined, scroll takes focused class off, then adds it back on upon scroll if this is the focused section */
      $("nav-about").removeClass("focused-section-link");
      let focusedSection = "." + $(this).attr("id");
      let focusedSectionClass = ".nav-" + $(this).attr("id");
      if ($(this).position().top + navFocus < screenBottom[0]) {
        $(focusedSectionClass).addClass("focused-section-link");
        $("nav")
          .children()
          .not($(focusedSectionClass))
          .removeClass("focused-section-link");
      }
    });
  });
  /* -----------END ON SCROLL: SECTIONS--------------*/

  /*----------------SKILLS AND EXP--------------------*/
  /* Shows/hides content when click headings in Skills and Experience section */
  $(".accordion").each(function () {
    $(this).click(function (event) {
      /* Will only collapse or expand when press on the button or the heading, not the ul */
      var target = $(event.target);
      if (target.is("button") || target.is("h3")) {
        /* Collapse any h3 element that is expanded (arrow pointing down) and toggle class, which will make arrow point right, but NOT the one you have clicked on. Only the one you have clicked on will point down */
        $("h3.expanded")
          .not($(this).find("h3"))
          .toggleClass("expanded");

        /* Enable clicking on the heading and have it toggle the arrow */
        // switches aria-expanded between true and false on the heading you have clicked
        let isExpanded = $(this).attr("aria-expanded");
        isExpanded = isExpanded == "true";
        let flipped = !isExpanded;

        $(this).find("h3").toggleClass("expanded");
        $(this).attr("aria-expanded", flipped);

        /* Gets the next element (the ul tag) and toggles between hiding or showing the ul, also animates it.
          Slides up everything EXCEPT the ul tag following the heading clicked on.
          Sets aria-expanded to false on everything but EXCEPT the button clicked on.*/
        var nextElement = $(this).next();
        nextElement.slideToggle();
        $(".info").not(nextElement).slideUp();
        $("button").not($(this)).attr("aria-expanded", "false");
      }
    });
  });
  /* -------------END SKILLS AND EXP--------------*/

  /*-----------------PROJECTS-------------------*/
  /* Show/hide project button */
  $(".hidden-info").hide();

  let show = false;
  $("#projects")
    .find("button")
    .click(function () {
      if (show === false) {
        $(this).text("Show less");
        show = true;
      } else {
        $(this).text("Show more");
        show = false;
      }

      $(this).parent().find(".hidden-info").slideToggle("slow");
    });

  /* Change show/hide button aria-expanded when opened/closed */
  $(".show-more-button").click(function () {
    let isExpanded = $(this).attr("aria-expanded");
    isExpanded = isExpanded == "true";
    let flipped = !isExpanded;

    $(this).attr("aria-expanded", flipped);
  });
  /* -----------------END PROJECTS----------------*/

  /*----------------CONTACT-------------------*/
  /* FORM INPUTS:
      Name: During input, if character length of name is less than 5, background of input box goes pink. Shows message telling minimum characters if less than 5 when leave the focus of the box.
      Email: During input, if email does not match regex or is less than 6 characters, background of input box goes pink. Shows message telling minimum characters and allowed characters if less than 6 when leave the focus of the box.
      Message: During input, if message does not match character length, background goes pink - changes to yellow when meets min character length */
  $("#name").on("input", function () {
    var name = $(this).val();
    var re = /[!@#$£%^&*(),.?"':{}|<>12345678910¬`+\-_=\\~/\[\]]/;
    var specialCharacter = re.test(name);
    if (specialCharacter || name.length < 5) {
      $(".invalid-name").show("fast");
      $(this).addClass("invalid");
      $("#invalid-name").attr("aria-hidden", "false");
    } else {
      $(".invalid-name").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-name").attr("aria-hidden", "true");
    }
  });

  $("#name").focusout(function () {
    var name = $(this).val();
    var re = /[!@#$£%^&*(),.?"':{}|<>12345678910¬`+\-_=\\~/\[\]]/;
    var notName = re.test(name);
    if (notName || name.length < 5) {
      $(".invalid-name").show("fast");
      $(this).addClass("invalid");
      $("#invalid-name").attr("aria-hidden", "false");
    } else {
      $(".invalid-name").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-name").attr("aria-hidden", "true");
    }
  });

  $("#email").on("input", function () {
    var email = $(this).val();
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    var isEmail = re.test(email);
    if (!isEmail || email.length < 6) {
      $(".invalid-email").show("fast");
      $(this).addClass("invalid");
      $("#invalid-email").attr("aria-hidden", "false");
    } else {
      $(".invalid-email").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-email").attr("aria-hidden", "true");
    }
  });

  $("#email").focusout(function () {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    var isEmail = re.test($(this).val());
    if (!isEmail || email.length < 6) {
      $(".invalid-email").show("fast");
      $(this).addClass("invalid");
      $("#invalid-email").attr("aria-hidden", "false");
    } else {
      $(".invalid-email").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-email").attr("aria-hidden", "true");
    }
  });

  $("#message").on("input", function () {
    var message = $(this).val();
    if (message.length < 70) {
      $(this).addClass("invalid");
      $("#invalid-message").attr("aria-hidden", "false");
    } else {
      $(this).removeClass("invalid");
      $("#invalid-message").attr("aria-hidden", "true");
    }
  });

  $("#message").focusout(function () {
    var message = $(this).val();
    if (message.length < 70) {
      $(".invalid-message").show("fast");
      $(this).addClass("invalid");
      $(".label-background").addClass("invalid");
      $("#invalid-message").attr("aria-hidden", "false");
    } else {
      $(".invalid-message").hide("fast");
      $(this).removeClass("invalid");
      $(".label-background").removeClass("invalid");
      $("#invalid-message").attr("aria-hidden", "true");
    }
  });

  /* On contact form submit, form goes to Netlify, which emails me form input */
  $("form").submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    $.post($form.attr("action"), $form.serialize()).then(function () {
      alert("Thank you!");
    });
  });

  $(".logo").hover(
    function () {
      $(this).attr("fill", "#b21f66");
    },
    function () {
      $(this).attr("fill", "#03a090");
    },
  );
  /* -----------------END CONTACTS----------------*/

  /*----------------RESPONSIVE----------------------*/
  $("#scroll-top-button").click(function () {
    window.scrollTo(0, 0);
  });
  /*----------------END RESPONSIVE ----------------*/

  /*--------------- BLOG ---------------- */

  // Get request using Ajax
  // Comes back with array of objects
  // Map through the objects using $.map and append onto .articles

  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const url = "https://dev.to/api/articles?username=thorners55";
  $.ajax({
    type: "GET",
    url,
  })
    .done(function (articles) {
      console.log(articles);
      $.map(articles, function (article, index) {
        let created = article.created_at.split("T");
        let date = created[0].split("-");

        let day = date[2];
        let newDay = day.split("");

        if (newDay[0] === "0") {
          newDay.splice(0, 1);
          day = newDay;
        }

        let formattedDate = `${day} ${months[date[1]]}, ${date[0]}`;

        $(".articles").append(
          `<article class="article-card shadow-card">
                <a href=${article.url} target="_blank">
                  <h3>${article.title}</h3>
                </a>
                <p>Posted on ${formattedDate}</p>
              </article>`,
        );
      });
    })
    .error(function () {
      "$.articles".append(
        `<p>
          Oops! An error occured loading blog posts. Please try{" "}
          <a href="https://dev.to/thorners55" target="_blank">
            dev.to/thorners55
          </a>{" "}
          to see my posts.
        </p>`,
      );
    });
  /*-----------------END BLOG--------------*/
});

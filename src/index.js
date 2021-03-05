$(document).ready(function () {
  /*----------------GLOBAL----------------------*/
  $("button").each(function () {
    $(this).mouseover(function () {
      $(this).find("h3").css("color", "#CC2014");
    });
  });

  $("button").each(function () {
    $(this).mouseleave(function () {
      $(this).find("h3").css("color", "#381460");
    });
  });

  /* If the section is contacts and is first time have scrolled to contacts section, animate social media logos to bounce and fade in one after the other */

  /* Logo changes colour when hover over it, changes back when focus away */
  $(".logo").hover(
    function () {
      $(this).attr("fill", "#381460");
    },
    function () {
      $(this).attr("fill", "#eb4034");
    },
  );

  $(".logo").each(function (i) {
    $(this)
      .delay(500 * i)
      .animate({ top: -10 }, "fast")
      .animate({ opacity: 1 }, "fast")
      .animate({ top: 30 }, "fast")
      .animate({ top: 10 }, "fast");
  });

  /* -------------------END GLOBAL----------------*/

  /*----------------RESPONSIVE----------------------*/
  $("#scroll-top-button").click(function () {
    window.scrollTo(0, 0);
  });
  /*----------------END RESPONSIVE ----------------*/

  /*-------------ON SCROLL: SECTIONS -------------*/
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    /* Check the location of each 'section'. If it is more than 1/5th of the screen height from the bottom of the screen, fade in */
    let screenBottom = $($(window).scrollTop() + $(window).height());
    let appearAfterScroll = $(window).height() / 5;
    let navFocus = $(window).height() / 2;

    $(".section").each(function () {
      if (
        $(this).position().top + appearAfterScroll <
        screenBottom[0]
      ) {
        $(this).animate({ opacity: 1 }, 1200);
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

  $(".hidden-info").each(function () {
    $(this).click(function (event) {
      var target = $(event.target);
      if (target.is("button.show-more-button")) {
        $;
      }
    });
  });

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

  //let show = false;

  $("#projects")
    .find("button")
    .click(function () {
      /* When button is clicked, checks to see if the text on the button says "Show more" or "Show less", and switches to the opposite one when clicked, then the hidden info toggles (slides down or up) */
      let buttonText = "";
      buttonText = $(this).text();
      let show = buttonText.includes("more");

      if (show) {
        $(this).text("Show less");
      } else {
        $(this).text("Show more");
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
      $(".invalid-message").show("fast");
      $("#invalid-message").attr("aria-hidden", "false");
    } else {
      $(".invalid-message").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-message").attr("aria-hidden", "true");
    }
  });

  $("#message").focusout(function () {
    var message = $(this).val();
    if (message.length < 70) {
      $(".invalid-message").show("fast");
      $(this).addClass("invalid");
      $("#invalid-message").attr("aria-hidden", "false");
    } else {
      $(".invalid-message").hide("fast");
      $(this).removeClass("invalid");
      $("#invalid-message").attr("aria-hidden", "true");
    }
  });

  /* On contact form submit, form goes to Netlify, which emails form input */
  $("form").submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    $.post($form.attr("action"), $form.serialize()).then(function () {
      alert("Thank you! Your message has been submitted!");
    });
    $("input", "textarea").val("");
    $("#submitted-message").css("display", "block");
    $("#submitted-message").attr("aria-hidden", "false");
  });

  $("button[type=submit]").click(function () {
    $("input, textarea").val("");
    $("#submitted-message").css("display", "block");
    $("#submitted-message").attr("aria-hidden", "false");
  });

  /* -----------------END CONTACTS----------------*/
});

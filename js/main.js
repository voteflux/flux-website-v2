setRefLocalStorage = function(newVal) {
  localStorage.setItem('signup_referral', newVal);
}
getRefLocalStorage = function(){
  return localStorage.getItem('signup_referral');
}

checkReferrer = (function() {
  return {
    addTestParam: function (val) {
      if (location.href.indexOf("?") === -1) {
          window.location = location.href += "?" + val + "=testParam";
      }
    },
    getParam: function(val) {
      // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
      var result = undefined
      var tmp = []
      location.search
          //.replace ( "?", "" )
          // this is better, there might be a question mark inside
          .substr(1)
          .split("&")
          .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
          });
      return result;
    }
  }
}());

fluxAnnounce = (function() {
  return {
    closeModal: function () {
      $('#js-modal').fadeOut('fast');
    },
    showModal: function() {
      $('#js-modal').fadeIn('fast');
    },
    showSection: function() {
      $('#js-announcement-home').removeClass('hide');
    },
    removeCounter: function() {
      $("#countdown-wrapper").addClass('hide');
    },
    showModalContent: function() {
      $('#js-modal-content').removeClass('hide');
      $('#js-modal-loading').addClass('hide');
    },
    showAnnouncementContent: function() {
      $('#js-announcement-content').removeClass('hide');
      $('#js-announcement-loading').addClass('hide');
    },
    getAnnouncement: function() {
      var $modal = {
        wrapper: $("#js-modal"),
        heading: $("#js-modal-heading"),
        body: $("#js-modal-body"),
        link: $("#js-modal-link")
      };
      var $announcement = {
        wrapper: $("#js-announcement-home"),
        heading: $("#js-callout-heading"),
        body: $("#js-callout-body"),
        link: $("#js-callout-link")
      }
      $.ajax({
        // url: "http://dev.v1.api.flux.party/api/v0/announcement",
        url: "https://prod.v1.api.flux.party/api/v0/announcement",
        type: 'GET',
        error: function() {
          console.log('error');
          setTimeout( function() {
            this.getAnnouncement();
          }, 1000);
        },
        success: function(response) {

          if (Boolean($modal.wrapper)) {
            $modal.heading.html(response.heading);
            $modal.body.html(response.body);
            $modal.link.prop("href", response.link)
          }
          if (Boolean($announcement.wrapper)) {
            $announcement.heading.html(response.heading);
            $announcement.body.html(response.body);
            $announcement.link.prop("href", response.link)
          }
          fluxAnnounce.showModalContent();
          fluxAnnounce.showAnnouncementContent();
        }
      });
    }
  }
}());

$(document).ready(function() {

  // close ANNOUNCEMENT modal
  $('#js-modal-close').on('click', function() {
    fluxAnnounce.closeModal();
  })

  //referrer
  if(window.location.hostname === 'localhost') {
    // checkReferrer.addTestParam('r')
  }
  var referrer = checkReferrer.getParam('r');
  if(referrer){
    setRefLocalStorage(referrer);
  }
  var isWAPage = location.pathname.indexOf('/flux-wa') !== -1;
  if(isWAPage && referrer === undefined){
    console.log('On WA page');
    setRefLocalStorage('wa-landing-page + maybe r:' + document.referrer);
  }
  console.log("Local storage ref: " + getRefLocalStorage());

  // if(referrer === undefined){
  //     utmSource = checkReferrer.getParam('utm_source');
  //     utmCampaign = checkReferrer.getParam('utm_campaign');
  //     if(utmSource != undefined && utmCampaign != undefined){
  //         referrer = utmSource + "-" + utmCampaign;
  //     }
  // }

  //
  // // countdown
  // if( $('#clock').length ) {
  //   var countdownTo = new Date((1465948800) * 1000);  // June 15th 10am
  //   var now = new Date();
  //
  //   var countdownOver = function (event) {
  //     fluxAnnounce.getAnnouncement();
  //     fluxAnnounce.showSection();
  //     fluxAnnounce.removeCounter();
  //   };
  //   var countdownFinished = function(event){
  //     countdownOver(event);
  //     fluxAnnounce.showModal();
  //   };
  //
  //   if (countdownTo > now) {
  //     $('#clock').countdown(countdownTo, function (event) {
  //       $(this).html(event.strftime(
  //         '<div class="inline-block pl1"> <h3 class="sm-h2 m0 bold">%d</h3> <h6 class="m0 muted">Day%!D</h6> </div>'
  //         + '<div class="inline-block pl1"> <h3 class="sm-h2 m0 bold">%H</h3> <h6 class="m0 muted">Hour%!H</h6> </div>'
  //         + '<div class="inline-block pl1"> <h3 class="sm-h2 m0 bold">%M</h3> <h6 class="m0 muted">Minute%!M</h6> </div>'
  //         + '<div class="inline-block pl1"> <h3 class="sm-h2 m0 bold">%S</h3> <h6 class="m0 muted">Second%!S</h6> </div>' + '</div>'));
  //     })
  //       .on('finish.countdown', countdownFinished);
  //   } else {
  //     countdownOver();
  //   }
  //
  //   var countDownHeight = $("#countdown-wrapper").outerHeight(true);
  //   $('footer').css({'margin-bottom': countDownHeight + 'px'})
  // }

  // candidates slider
  if ( $('#js-candidates').length != 0 ) {
    // init slick carousel
    $('#js-candidates').slick({
      autoplay: false,
      accessibility: true,
      pauseOnHover: true,
      speed: 700,
      arrows: true,
      focusOnSelect: false,
      cssEase: 'ease',
      dots: true,
      responsive: [
        {
          breakpoint: 5000,
          settings: {
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1250,
          settings: {
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    })
  };


  var $root = $('html, body');

// animate scroll behaviour on side menu
  $("a[href^='#']").on('click', function(e) {
    e.preventDefault();
      console.log("link-clicked")
    var hash = this.hash;
    // animate
    $('body').animate({
      scrollTop: $(hash).offset().top
    }, 500, 'swing', function() {
      window.location.hash = hash;
    });
  });

  //  offset hash location when arriving from external link
  //
  // grab target from URL hash (i.e. www.mysite.com/page-a.html#target-name)
  var target = window.location.hash;

  // only try to scroll to offset if target has been set in location hash
  if ( target != '' ){
    var $target = $(target);

    $root.stop().animate({
      'scrollTop': $target.length && $target.offset().top
    }, 500,'swing', function () {
      // when done, add hash to url
      window.location.hash = target ;
    });
  };


  // Returns number of days until a given date. Used for election countdowns
  function getDaysTo(endDate) {
    var today = new Date();
    var distance = endDate - today;
    if (distance < 0)
      return 0;
    return Math.ceil(distance / 86400000); // 86400000 ms in 1 day
  }


  // get member and volenteer info ajax request
  function getMembers() {
    $.ajax({
      url: "https://prod.v1.api.flux.party/api/v0/getinfo",
      data: {
        format: 'json'
      },
      error: function() {
        console.log('error')
      },
      success: function(response) {
        var data = JSON.parse(response);
        var classValueMap = {
          "js-member-count": data.n_members,
          "js-wamember-count": data.n_members_state.wa,
          "js-volunteer-count": data.n_volunteers,
          // TS: No need to differentiate between mobile and non-mobile here for now
          // "js-member-count-mobile": data.n_members,
          // "js-volunteer-count-mobile": data.n_volunteers
          // WA State Election Countdown - Remove After 11 March 2017
          "js-waelection-countdown": getDaysTo(new Date('03/11/2017')), // Use US Date Format MM/DD/YYYY
        };

        var set_contents = function(e, to_set){
          if(Boolean(e)) {
            e.innerHTML = to_set;
            console.log("Setting", e, "to", to_set);
          }
        };

        _.map(classValueMap, function(val, className){
          _.map(document.getElementsByClassName(className), function(elem){
            set_contents(elem, val);
          });
        });
        //for (var key in classValueMap) {
        //  var value = classValueMap[key];
        //  var ref = document.getElementsByClassName(key);
        //  // Some pages have more than one member counter
        //  for (var i = 0, len = ref.length; i < len; i++) {
        //    var element = ref[i];
        //    set_contents(element, value);
        //  }
        //}

      },
      type: 'GET'
    });
  }

  function nextPowerOf10(n) {
    return Math.pow(10, Math.ceil(Math.log10(n)))
  }

  function next5kIncrement(n) {
    return Math.ceil(n/5000)*5000;
  }

  function setDonationProgressBar(currAmountStr) {
    let amt = parseFloat(currAmountStr);
    let nextTarget = next5kIncrement(amt);
    let pct = Math.round(amt / nextTarget * 100);
    let msg = "$" + currAmountStr + " of $" + nextTarget + ".00";
    $("#donation-progress-inner")[0].style['width'] = pct.toString() + "%";
    $("#donation-status-text").text(msg)
  }

  function getNswDonations() {
    console.log('getNswDonations')
    $.getJSON({
      url: "https://prod.v1.api.flux.party/api/v1/fundrazr/fluxpartynsw", success: data => {
        let amtStr = data.campaign.statistics.donationSum;
        setDonationProgressBar(amtStr)
      }
    })
  }


  function allUpdates() {
    getMembers()
    getNswDonations()
  }


  var mins = 1
  var interval = 1000 * 60 * mins
  getMembers(); //init
  getNswDonations()
  setInterval(allUpdates, interval);


  // footer date
	var dteNow = new Date();
	var intYear = dteNow.getFullYear();
  var elemYear = document.getElementById("js-footer-year");
	elemYear.innerHTML = intYear


  // nav menu
  var isOpen = true;
  var transitionTime = 150;

  $("#js-menu-button").on('click', function() {
    toggleMenu();
  });
  $("#js-menu").on('click', function() {
    toggleMenu();
  });

  function toggleMenu() {
    isOpen = !isOpen;
    if (!isOpen) {
      $("#js-menu").addClass('opacity-1 will-change-opacity').removeClass('hide').removeClass('opacity-0');
      $(".js-menu-hide").addClass('opacity-0 will-change-opacity').removeClass('opacity-1').addClass('hide');
      $('#js-fading').addClass('all-transparent')
    } else {
      $('#js-fading').removeClass('all-transparent')
      $("#js-menu").addClass('opacity-0').removeClass('opacity-1');
      $(".js-menu-hide").addClass('opacity-1').removeClass('opacity-0, hide');
      setTimeout(function() {
        $("#js-menu")
          .addClass('hide')
          .removeClass('will-change-opacity');
      }, transitionTime);
    }
    // for hamburger animation
    $("#js-menu-button").toggleClass('is-active');
  };

  var fadeStart = 0;
  var fadeUntil = 150;
  var $fading = $('#js-fading');
  var $document = $(document);

  var $donationBar = $('#donation-bar-section');

  var faded = false;
  // var contactHeight = $('#contact').outerHeight()
  // var contactPos = $('#contact').offset().top
    //  console.log(contactPos, contactHeight)
  var onScrollUpdateMenu = function(){
    var offset = $document.scrollTop()
    var opacity = 0
    faded = false
    if ( offset >= fadeStart && offset <= fadeUntil ) {
      opacity = 0.001 + offset/fadeUntil;

    } else if ( offset >= fadeUntil ) {
      opacity = 1
      faded = true
    }


    // for logo text on dark background
    if (opacity >= 0.1) {
      $('.js-flux-text-darktheme').css({ fill: "#222" });
      $("#js-nav-links").removeClass('white');
    } else {
      $('.js-flux-text-darktheme').css({ fill: "#fff" });
      $("#js-nav-links").addClass('white');
    }
    $fading.css('opacity', opacity);

    if ($donationBar) {
      var donationOffset = Math.min(0, offset - $donationBar.height() - 200);
      $donationBar.css({bottom: donationOffset});
    }
  }

  $(window).bind('scroll', onScrollUpdateMenu);

  // also do the scroll thing on load in case we're reloading halfway down the page
  onScrollUpdateMenu();

});

var checkReferrer = (function() {
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


$(document).ready(function() {
  if(window.location.hostname === 'localhost') {
    // checkReferrer.addTestParam('r')
  }
  var referrer = checkReferrer.getParam('r');

  if(referrer){
    localStorage.setItem("signup_referral", referrer);
  }

  // if(referrer === undefined){
  //     utmSource = checkReferrer.getParam('utm_source');
  //     utmCampaign = checkReferrer.getParam('utm_campaign');
  //     if(utmSource != undefined && utmCampaign != undefined){
  //         referrer = utmSource + "-" + utmCampaign;
  //     }
  // }


  // countdown
  if( $('#clock').length ) {
    var nextYear = moment.tz("2016-06-29 11:05", "UTC");

    $('#clock').countdown(nextYear.toDate(), function(event) {
       $(this).html(event.strftime(''
          + '<div class="inline-block px1"> <h3 class="m0 bold">%d</h3> <h6 class="m0 muted">Day%!D</h6> </div>'
          + '<div class="inline-block px1"> <h3 class="m0 bold">%H</h3> <h6 class="m0 muted">Hour%!H</h6> </div>'
          + '<div class="inline-block px1"> <h3 class="m0 bold">%M</h3> <h6 class="m0 muted">Minute%!M</h6> </div>'
          + '<div class="inline-block px1"> <h3 class="m0 bold">%S</h3> <h6 class="m0 muted">Second%!S</h6> </div>'));
    })
    .on('finish.countdown', function(event){
      $(this).html('THE BIG ANNOUNCEMENT!');
    });

    var countDownHeight = $("#countdown-wrapper").outerHeight(true);
    $('footer').css({'margin-bottom': countDownHeight + 'px'})
  }

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
          breakpoint: 2000,
          settings: {
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1024,
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
            slidesToScroll: 2
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






  // meetup
  // $.ajax({
  //   url: "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=FluxSydney&sig=3ddb1a95711db994ebba2b2dc0d2e7ffb09e40fa&page=200&fields=&sig_id=96374432&order=time&desc=false&status=upcoming",
  //   error: function() {
  //     console.log('error');
  //   },
  //   success: function(response) {
  //     console.log(response);
  //     var d = response.results[0];

  //   },
  //   type: 'GET'
  // })

  // get info ajax request
  var getMembers = function() {
    $.ajax({
      url: "https://api.voteflux.org/api/v0/getinfo",
      data: {
        format: 'json'
      },
      error: function() {
        console.log('error')
      },
      success: function(response) {
        var data = JSON.parse(response)
        var memberCount = data.n_members
        var el = document.getElementById("js-member-count")
        var elMobile = document.getElementById("js-member-count-mobile")

        if (Boolean(el)) {
          el.innerHTML = memberCount.toString()
        }
        if (Boolean(elMobile)) {
          elMobile.innerHTML = memberCount.toString()
        }
      },
      type: 'GET'
    });
  }
  var mins = 1
  var interval = 1000 * 60 * mins
  getMembers(); //init
  setInterval(getMembers, interval);


	var dteNow = new Date();
	var intYear = dteNow.getFullYear();
  var elemYear = document.getElementById("js-footer-year");
	elemYear.innerHTML = intYear


  //  menu
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


  var fadeStart = 0
  var fadeUntil = 150
  var $fading = $('#js-fading')
  var $document = $(document)
  var faded = false
  // var contactHeight = $('#contact').outerHeight()
  // var contactPos = $('#contact').offset().top
    //  console.log(contactPos, contactHeight)
  $(window).bind('scroll', function(){
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
        $('.js-flux-text-darktheme').css({ fill: "#222" })
        $("#js-nav-links").removeClass('white');
      } else {
        $('.js-flux-text-darktheme').css({ fill: "#fff" })
        $("#js-nav-links").addClass('white');
      }
      $fading.css('opacity',opacity);
  });


});

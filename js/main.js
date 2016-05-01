$(document).ready(function() {


  var $root = $('html, body');

// animate scroll behaviour on side menu
  $("a[href^='#']").on('click', function(e) {

    // prevent default anchor click behavior
    e.preventDefault();
       // store hash
    var hash = this.hash;

    // animate
    $root.animate({
      scrollTop: $(hash).offset().top - 100
    }, 500, 'swing', function(){

       // when done, add hash to url
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
      'scrollTop': $target.offset().top
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
  $.ajax({
    url: "https://api.voteflux.org/getinfo",
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

      if (el) {
        el.innerHTML = memberCount.toString()
      }
      if (elMobile) {
        elMobile.innerHTML = memberCount.toString()
      }
    },
    type: 'GET'
  });

  // menu
  var isOpen = true;
  var transitionTime = 150;

  $("#js-menu-button").on('tap', function() {
    toggleMenu();
  });
  $("#js-menu a").on('tap', function() {
    toggleMenu();
  });

  function toggleMenu() {
    isOpen = !isOpen;
    if (!isOpen) {
      $("#js-menu").addClass('opacity-1 will-change-opacity').removeClass('hide').removeClass('opacity-0');
      $("#js-navbar-join-btn").addClass('opacity-0').removeClass('opacity-1');
      $('.flux-logo-text').css({ fill: "#fff" });
      $("#flux-logo-home").addClass('opacity-1');
      $('body').addClass('overflow-hidden');
    } else {
      $("#js-menu").addClass('opacity-0').removeClass('opacity-1');
      $('body').removeClass('overflow-hidden');
      $("#js-navbar-join-btn").addClass('opacity-1').removeClass('opacity-0');
      $('.flux-logo-text').css({ fill: "#222" });
      $("#flux-logo-home").removeClass('opacity-1');
      setTimeout(function() {
        $("#js-menu")
          .addClass('hide')
          .removeClass('will-change-opacity');
      }, transitionTime);
    }
    // for hamburger animation
    $("#js-menu-button").toggleClass('is-active');
  };



  // // throttle funciton from https://jsfiddle.net/jonathansampson/m7G64/
  // function throttle (callback, limit) {
  //   var wait = false;                  // Initially, we're not waiting
  //   return function () {               // We return a throttled function
  //     if (!wait) {                   // If we're not waiting
  //       callback.call();           // Execute users function
  //       wait = true;               // Prevent future invocations
  //       setTimeout(function () {   // After a period of time
  //           wait = false;
  //           callback.call();
  //       }, limit);
  //     }
  //   }
  // }
  //
  // var $window = $(window);
  // var menuFadefn = throttle(function() {
  //   var scrollTop = $window.scrollTop();
  //     if ( scrollTop > 100 ) {
  //       $("#js-navbar, #flux-logo-home").addClass('opacity-1').removeClass('will-change-opacity');
  //     } else {
  //       $("#js-navbar, #flux-logo-home").removeClass('opacity-1');
  //     }
  // }, 500);
  //
  // $window.on('scroll', menuFadefn );

});

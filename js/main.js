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
      scrollTop: $(hash).offset().top
    }, 500, 'swing', function(){

       // when done, add hash to url
       window.location.hash = hash;
     });
  });

  // //  offset hash location when arriving from external link
  // //
  // // grab target from URL hash (i.e. www.mysite.com/page-a.html#target-name)
  // var target = window.location.hash;

  // // only try to scroll to offset if target has been set in location hash
  // if ( target != '' ){
  //   var $target = $(target);

  //   $root.stop().animate({
  //     'scrollTop': $target.offset().top
  //   }, 500,'swing', function () {
  //     // when done, add hash to url
  //     window.location.hash = target ;
  //   });
  // };


// get info ajax request
  $.ajax({
    url: "https://api.voteflux.org/getinfo",
    data: {
      format: 'json'
    },
    error: function() {
      console.log('error');
    },
    success: function(response) {
      var data = JSON.parse(response);
      console.log(data);
      var memberCount = data.n_members;
      document.getElementById("js-member-count").innerHTML = memberCount.toString();







// // var utcSeconds = 1234567890;
//       // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
//       // d.setUTCSeconds(utcSeconds);
//       // console.log(d)

//       var currentSeconds = new Date().getTime() / 1000;
//       var lastMember = data.last_member_signup;
//       // var timeSince =  currentSeconds - lastMember
//       // console.log(timeSince);

//       function toTime(seconds) {
//         var d = new Date(0);
//         d.setUTCSeconds(seconds)
//         return d;
//       }

// var now = moment();
// console.log(lastMember);
// var a = moment.duration(lastMember, 'ms');
// var b = moment.duration(now, 'ms');
// var timeSince = a.subtract(b);
// // a.subtract(b).hours;
// console.log(timeSince)
// // console.log(moment.duration(timeSince, 's'));


// console.log(toTime(lastMember))


    },
    type: 'GET'
  })


// https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=FluxSydney&sig=3ddb1a95711db994ebba2b2dc0d2e7ffb09e40fa&page=200&fields=&sig_id=96374432&order=time&desc=false&status=upcoming


    var isClosed = true;
    var transitionTime = 250;
    $("#js-menu-button").on('tap', function() {
      isClosed = !isClosed;
      if (!isClosed) {
        $("#js-menu")
          .addClass('opacity-1')
          .removeClass('hide')
          .removeClass('opacity-0');
        $('body').addClass('overflow-hidden');
      } else {
        $("#js-menu")
          .addClass('opacity-0')
          .removeClass('opacity-1');
        $('body').removeClass('overflow-hidden');
        setTimeout(function() {
          $("#js-menu").addClass('hide');
        }, transitionTime);
      }
    })



});



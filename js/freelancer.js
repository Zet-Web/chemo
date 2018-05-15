(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Modal popup$(function () {
  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict

jQuery(document).ready(function ($) {

    $(".configuration .owl-carousel").owlCarousel({
        loop:true,
        items:1,
        margin:0,
        stagePadding: 0,
        autoplay:false,
        nav: true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
    });

    dotcount = 1;

    jQuery('.configuration .owl-dot').each(function() {
        jQuery( this ).addClass( 'dotnumber' + dotcount);
        jQuery( this ).attr('data-info', dotcount);
        dotcount=dotcount+1;
    });

    slidecount = 1;

    jQuery('.configuration .owl-item').not('.cloned').each(function() {
        jQuery( this ).addClass( 'slidenumber' + slidecount);
        slidecount=slidecount+1;
    });

    jQuery('.configuration .owl-dot').each(function() {
        grab = jQuery(this).data('info');
        slidegrab = jQuery('.slidenumber'+ grab +' img').attr('src');
        jQuery(this).css("background-image", "url("+slidegrab+")");
    });

    amount = $('.configuration .owl-dot').length;
    gotowidth = 100/amount;
    jQuery('.owl-dot').css("height", gotowidth+"%");



    /* INIT REVIEWS - СЛАЙДЕР ОТЗЫВОВ */

    $('#testimonials .bxslider').bxSlider({
        minSlides: 2,
        maxSlides: 2,
        slideWidth: 468,
        slideMargin: 20,
        auto: true,
    });


    $('#about .bxslider').bxSlider({
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 960
    });

    $("#carousel").owlCarousel({
        navigation : false,
        slideSpeed : 500,
        paginationSpeed : 800,
        rewindSpeed : 1000,
        singleItem: true,
        autoPlay : true,
        stopOnHover : true,
    });





  /* ДО КОНЦА АКЦИИ ОСТАЛОСь */

    var deadline = addDaysToDate(new Date(), 3).getTime();
    var daysSpan = document.getElementById('days');
    var hoursSpan = document.getElementById('hours');
    var minutesSpan = document.getElementById('minutes');
    var secondsSpan = document.getElementById('seconds');

    updateClock(deadline);
    var interval = setInterval(updateClock, 1000);

    function addDaysToDate(startDate, numberOfDays) {
        return new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + numberOfDays,
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds()
        );
    }

    function getRemainingTime(deadline) {
        var total = deadline - new Date().getTime();

        if (isNaN(total)) {
            return false;
        }

        var seconds = Math.floor( (total / 1000) % 60 );
        var minutes = Math.floor( (total / 1000 / 60) % 60 );
        var hours = Math.floor( (total / (1000 * 60 * 60)) % 24 );
        var days = Math.floor( total / (1000 * 60 * 60 * 24) );

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateClock() {
        var remainingTime = getRemainingTime(deadline);

        if (remainingTime.total <= 0) {
            clearInterval(interval);

            document.getElementById('expired').classList.add('show');

            return false;
        } else if (!remainingTime) {
            return false;
        }

        daysSpan.innerText = addLeadingZeros(remainingTime.days);
        hoursSpan.innerText = addLeadingZeros(remainingTime.hours);
        minutesSpan.innerText = addLeadingZeros(remainingTime.minutes);
        secondsSpan.innerText = addLeadingZeros(remainingTime.seconds);
    }

    function addLeadingZeros(time) {
        return ('0' + time).slice(-2);
    }



    /* GALLERY LIGHTBOX - ГАЛЕРЕЯ ТОВАРОВ*/

    $(document).on("click", '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });


    /* GOOGLE MAP INIT ИНИТ ГУГЛ КАРТЫ */
    function initialize() {
        var myLatlng = new google.maps.LatLng(55.811299, 37.835151),
            mapOptions = {
                zoom: 13,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var contentString = 'Times Square, Manhattan';
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);


});



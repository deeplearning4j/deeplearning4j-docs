$(function () {
    /* 
     Custom js file for assan
     */
//preloader
    $(window).preloader({
        delay: 500
    });
    $(".nav-sticky-top").sticky({topSpacing: 0});
//shrink header
    $(document).on("scroll", function () {
        if
                ($(document).scrollTop() > 150) {
            $(".nav-sticky").addClass("nav-stick-top");
        } else
        {
            $(".nav-sticky").removeClass("nav-stick-top");
        }
    });
    /****************
     search inline
     */
    $('.search-open').on('click', function () {
        {
            $('.search-inline').addClass('search-visible');
        }
    });
    $('.search-close').on('click', function () {
        $('.search-inline').removeClass('search-visible');
    });
//back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

//counter
    $('.counter').waypoint(function () {
        $('.counter').countTo();
    }, {offset: '100%'});

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
//knob circle progress bar
    $(".progress-circle").knob();
//text illate
    $('.tlt').textillate({
        loop: true
    });
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });
});

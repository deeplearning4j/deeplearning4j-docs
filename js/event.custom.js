/* 
Event custom script file
 */
$(function () {
//preloader
    $(window).preloader({
        delay: 500
    });
     //auto close navbar-collapse on click a
            $('.navbar a.nav-link').on('click', function () {
                $('.navbar-toggler:visible').click();
            });
    //shrink header
    $(document).on("scroll", function () {
        if
                ($(document).scrollTop() > 150) {
            $(".navbar-sticky").addClass("fixed-top");
        } else
        {
            $(".navbar-sticky").removeClass("fixed-top");
        }
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
    /**youtube video popup**/
    $('.modal-video').magnificPopup({
        type: 'iframe'
    });
    wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }
    );
    wow.init();
    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 58, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });
//countdown
    var time = $('.count-down');
    if (time.length) {
        var endDate = new Date(time.data("end-date"));
        time.countdown({
            date: endDate,
            render: function (data) {
                $(this.el).html('<div class="cd-row"><div><h3>' + this.leadingZeros(data.days, 3)
                        + '</h3><p>Days</p></div><div><h3>'
                        + this.leadingZeros(data.hours, 2)
                        + '</h3><p>Hrs</p></div></div><div class="cd-row"><div><h3>'
                        + this.leadingZeros(data.min, 2)
                        + '</h3><p>Minutes</p></div><div><h3>'
                        + this.leadingZeros(data.sec, 2)
                        + '</h3><p>Seconds</p></div></div>');
            }
        });
    }
});





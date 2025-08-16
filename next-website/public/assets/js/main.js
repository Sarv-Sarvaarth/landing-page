; (function ($) {
    "use strict";

    $(document).ready(function () {

        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        })
       
        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.navbar-area .menu').on('click', function() {
            $(this).toggleClass('open');
            $('.navbar-area .navbar-collapse').toggleClass('sopen');
        });
    
        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");

            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /* -----------------------------------------------------
            Variables
        ----------------------------------------------------- */
        var leftArrow = '<button class="left-arrow"><i class="flaticon-left-chevron"></i></button>';
        var rightArrow = '<button class="right-arrow"><i class="flaticon-next"></i></button>';

        
        /*--------------------------------------------------
            Fact Counter + Text Count
        ---------------------------------------------------*/
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {
                
                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }

            }, {
                accY: 0
            });
        }
        

        /*--------------------------------------------------
            feature-left-slider
        ---------------------------------------------------*/
        $('.feature-left-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay:true,
            fade: false,
            dots: true,
            autoplaySpeed: 5000,
        });

        /*--------------------------------------------------
            feature-right-slider
        ---------------------------------------------------*/
        $('.feature-right-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay:true,
            fade: false,
            prevArrow: '.feature-prev',
            nextArrow: '.feature-next',
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });


        /*--------------------------------------------------
            course-page-slider
        ---------------------------------------------------*/
        $('.course-page-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            fade: false,
            dots: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });

        /*--------------------------------------------------
            blog-page-slider
        ---------------------------------------------------*/
        $('.blog-page-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            fade: false,
            dots: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });


        /*--------------------------------------------------
            events-slider-active
        ---------------------------------------------------*/
        $('.events-slider-active').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            fade: false,
            dots: false,
            prevArrow: leftArrow,
            nextArrow: rightArrow,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });

        /*--------------------------------------------------
            Event Three Slider
        ---------------------------------------------------*/
        $('.event-three-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            fade: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ],
        });
        
        
        /*--------------------------------------------------
            about-middle-slider
        ---------------------------------------------------*/
        $('.about-middle-images').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay:true,
            fade: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });

        /*--------------------------------------------------
            client-logo-slider
        ---------------------------------------------------*/
        $('.client-logo-wrap').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            autoplay:true,
            fade: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
        });

        
        /*--------------------------------------------------
            event masonry
        ---------------------------------------------------*/
        if ($('.events-active').length) {
            $('.events-active').imagesLoaded(function () {
                $(".events-active").isotope({
                    itemSelector: '.item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.item'
                    }
                });
            });
        };
        
        
        /*--------------------------------------------------
            portfolio filter
        ---------------------------------------------------*/
        $(".portfolio-filter li").on('click', function () {
            $(".portfolio-filter li").removeClass("current");
            $(this).addClass("current");

            var selector = $(this).attr('data-filter');
            $('.portfolio-active').imagesLoaded(function () {
                $(".portfolio-active").isotope({
                    itemSelector: '.item',
                    filter: selector,
                });
            });

        });
        
        /*--------------------------------------------------
            testimonial-content-slider
        ---------------------------------------------------*/
        $('.testimonial-content-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            fade: true,
            autoplaySpeed: 1000,
            asNavFor: '.testimonial-thumb-slider'
        });
        $('.testimonial-thumb-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.testimonial-content-slider',
            dots: false,
            autoplay: false,
            variableWidth: true,
            autoplaySpeed: 1000,
            centerMode: false,
            focusOnSelect: true,
            arrows: false,
        });
        $('.testimonial-thumb-two').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.testimonial-content-slider',
            dots: false,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            arrows: false,
        });

        
        /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
        if ($('.single-select').length){
            $('.single-select').niceSelect();
        }

        /*--------------------------------------------
            Search Popup
        ---------------------------------------------*/
        var bodyOvrelay =  $('#body-overlay');
        var searchPopup = $('#td-search-popup');
        var sidebarMenu = $('#sidebar-menu');

        $(document).on('click','#body-overlay',function(e){
            e.preventDefault();
            bodyOvrelay.removeClass('active');
            searchPopup.removeClass('active');
            sidebarMenu.removeClass('active');
        });
        $(document).on('click','.search-bar-btn',function(e){
            e.preventDefault();
            searchPopup.addClass('active');
            bodyOvrelay.addClass('active');
        });

        /* -------------------------------------------------
            Footer Gallery Image
        ------------------------------------------------- */
        $('.gallery-photos a').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom', 
            gallery:{
                enabled:true
            },
        });

        /*------------------------------------------------
            Magnific JS
        ------------------------------------------------*/
        $('.video-play').magnificPopup({
            type: 'iframe',
            removalDelay: 260,
            mainClass: 'mfp-zoom-in',
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/Wimkqo8gDZ0'
                    }
                }
            }
        });
        
        
        /*----------------------------------------
           Cause Circle Progress
        ----------------------------------------*/
        if ($.fn.circleProgress) {
			var progress1 = $('.circle-progress.one')
			if($.fn.circleProgress) {
			  progress1.appear(function () {
				progress1.circleProgress({
					value: 0.8,
					size: 88,
                    thickness: 5,
					fill: "#F84D42",
                    lineCap: 'round',
					emptyFill: "#FAFAFA",
                    startAngle: -Math.PI / 4 * 2,
					animation : { duration: 2000},
				  }).on('circle-animation-progress', function(event, progress) {
					$(this).find('b').html(Math.round(90 * progress) + '<span>%</span>');
				  });
			  });
			};
		};

        if ($.fn.circleProgress) {
			var progress2 = $('.circle-progress.two')
			if($.fn.circleProgress) {
			  progress2.appear(function () {
				progress2.circleProgress({
					value: 0.7,
					size: 88,
                    thickness: 5,
					fill: "#FFB840",
                    lineCap: 'round',
					emptyFill: "#FAFAFA",
                    startAngle: -Math.PI / 4 * 2,
					animation : { duration: 2000},
				  }).on('circle-animation-progress', function(event, progress) {
					$(this).find('b').html(Math.round(85 * progress) + '<span>%</span>');
				  });
			  });
			};
		};

        if ($.fn.circleProgress) {
			var progress3 = $('.circle-progress.three')
			if($.fn.circleProgress) {
			  progress3.appear(function () {
				progress3.circleProgress({
					value: 0.55,
					size: 88,
                    thickness: 5,
					fill: "#20B86D",
                    lineCap: 'round',
					emptyFill: "#FAFAFA",
                    startAngle: -Math.PI / 4 * 2,
					animation : { duration: 2000},
				  }).on('circle-animation-progress', function(event, progress) {
					$(this).find('b').html(Math.round(55 * progress) + '<span>%</span>');
				  });
			  });
			};
		};

        
        /*----------------------------------------
           Skillbar
        ----------------------------------------*/
        if ($('.skillbar').length) {
            $('.skillbar').appear(function () {
                $('.skillbar').skillBars({
                    from: 0,
                    speed: 4000,
                    interval: 100,
                });
            });
        }
        
        /*----------------------------------------
           back to top
        ----------------------------------------*/
        $(document).on('click', '.back-to-top', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });

    });

    $(window).on("scroll", function() {
        /*---------------------------------------
            back-to-top
        -----------------------------------------*/
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }

        /*---------------------------------------
            sticky-active
        -----------------------------------------*/
        var scroll = $(window).scrollTop();
        if (scroll < 445) {
            $(".navbar").removeClass("sticky-active");
        } else {
            $(".navbar").addClass("sticky-active");
        }

    });


    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();  

    });



})(jQuery);

var isStacked = true;
var cp; // current position - used to go back after search is closed

// android browser triggers resize event because address bar dissapears :/ 
var widthW = 0;
var heightW = 0;


function checkRes() {
    var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            //x = e.clientWidth || g.clientWidth || w.innerWidth,
            //y = e.clientHeight || g.clientHeight || w.innerHeight;
            x = w.innerWidth,
            y = w.innerHeight;
    var criticalAR = 1024 / 600;
    var currentAR = x / y;
    if (currentAR < criticalAR || x < 1024 || y < 600) {
        isStacked = true;
        $('body').addClass('stacked');
        $('body').removeClass('isParallax');
    } else {
        isStacked = false;
        $('body').removeClass('stacked');
        $('body').addClass('isParallax');
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isStacked = true;
        $('body').addClass('stacked');
        $('body').removeClass('isParallax');
    }
    console.log((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
}


function initAll() {
    if (!isStacked) {
        if ($('body').hasClass('home')) { initParticles(); }
    }
}
function sameHeight() {
    $('.sh').css('height', 'auto');
    $('.shwrap').each(function (i, val) {
        var maxh = 0;
        $(this).find('.sh').each(function (i, val) {
            if ($(this).height() > maxh) { maxh = $(this).height(); }
        });
        $(this).find('.sh').height(maxh);
    });

    var maxhStats = 0;
    $(".stacked .grid.stats .col-1-3").each(function (i, val) {
        if ($(this).height() > maxhStats) { maxhStats = $(this).height(); $(".stacked .grid.stats .col-1-3").height(maxhStats); }
    });


}


$(document).ready(function () {
    $('a[href^="http://"],a[href^="https://"]').attr('target', '_blank');
    $("a[href$='pdf']").attr('target', '_blank');


    /* preloader */
    var balls = $(".preloader-ball")
    var n = balls.length;
    var d = 22;
    var t = 0.55;
    balls.each(function (i) {
        var cur = $(this);
        var a = (i / n) * (Math.PI * 2);
        cur.css({
            left: Math.cos(a) * d,
            top: Math.sin(a) * d,
            animation: "ball-anim " + t + "s ease-in -" + ((t / n) * (n - i)) + "s infinite"
        })
    })


    $("#loading").show();
    $("body").waitForImages(function () { // wait, just... wait, ok?
        setTimeout(function () {
            $("#loading").hide();
        }, 1500);

        $(".purple, .nlSec").css("opacity", 1);

        checkRes();

        // about odometer binding
        setTimeout(function () {
            $(".odo").each(function () {
                var odoElement = $(this);
                odoElement.waypoint(function (event, direction) {
                    od = new Odometer({
                        el: this.element,
                        value: 0,
                        format: 'd',
                        duration: 2500,
                        animation: 'count'
                    });
                    od.update(odoElement.data("to"));
                }, {
                    offset: 'bottom-in-view'
                });
            });
        }, 2500);

        // waypoints reveal about
        setTimeout(function () {
            $('.about .section .wrap .grid, .about .grid3woMargin').css("opacity", "0");
            $('.about .section .wrap .grid, .about .grid3woMargin').waypoint(function (event, direction) {
                $(this.element).animate({
                    opacity: 1,
                }, 1000);
            }, {
                offset: '90%'
            });
        }, 1000);

        // works
        $(".openworks").on("click", function () {
            $(this).hide();
            $(this).closest(".tabcontent").find(".hiddenWork").fadeIn(500);

            var viewMoreCookie = $.cookie("ViewMoreUnex");
            if (viewMoreCookie == undefined) {
                $.cookie("ViewMoreUnex", "1", { expires: 1 });
            }
            location.reload();

        });

        // form

        setTimeout(function () {
            [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
                // in case the input is already filled..
                if ($(inputEl).val() != "") {
                    classie.add(inputEl.parentNode, 'input--filled');
                }

                // events:
                inputEl.addEventListener('focus', onInputFocus);
                inputEl.addEventListener('blur', onInputBlur);
            });
        }, 750);

        function onInputFocus(ev) {
            classie.add(ev.target.parentNode, 'input--filled');
        }

        function onInputBlur(ev) {
            if (ev.target.value.trim() === '') {
                classie.remove(ev.target.parentNode, 'input--filled');
            }
        }

        $(".formSend").on("click", function (e) {
            e.preventDefault();
            button = $(this);
            var form = $("#contact-form");
            var response = form.next(".response");
            if (validate("#contact-form")) {
                button.hide();
                $.post("/en/Home/?alttemplate=ContactForm", $(form).serialize()).done(function (data) {
                    form.hide();
                    response.html(data);
                });
            }
            else {
                response.text("Please verify your fields.");
            }
        });

        // search

        function doSearch() {
            var query = $(".sQuery").val();
            var urlQuery = $(".search-form").data("url");
            if (query != '' && query != undefined && query != 'Search') {
                $.ajax({
                    url: urlQuery + "?s=" + query
                }).done(function (data) {
                    $(".searchFiller").html(data);
                    $(".resCase .result").text($(".searchFiller .opencase").length);
                    $(".resNews .result").text($(".searchFiller .opennews").length);
                });
            }
        }

        $(".sQuery").keydown(function (e) {
            if (e.keyCode == 13) {
                doSearch();
                return false;
            }
        });

        $(".formSwrap .fa-search").on("click", function (e) {
            e.preventDefault();
            doSearch();
        });

        $(".showNewsBtn").on("click", function () {
            $(".showCase").hide("slow");
            $(".showNews").show("slow");
        });

        $(".showCaseBtn").on("click", function () {
            $(".showNews").hide("slow");
            $(".showCase").show("slow");
        });

        // scrolldown
        $("body").on("click", ".scrollDown .center", function () {
            if (!($("body").hasClass("history"))) {
                $("html,body").animate({
                    scrollTop: $(window).scrollTop() + window.innerHeight
                }, 600);
                $(".scrollDown").fadeOut(500);
            }
        });

        //unfade delayed elements
        $(".delay").css("opacity", "0");
        $(".delay").each(function () {
            var element = $(this);
            var delay = element.data("delaysec")
            setTimeout(function () {
                element.fadeTo(1000, 1);
            }, delay * 1000);
        });

        // unload page
        /*
        $(".gotoSec h3").on("click", function () {
            $(".gotoSec").css("height", "100vh");
            $("html, body").animate({ scrollTop: $(document).height() }, 2000);
            setTimeout(function () {
                window.location = $(".gotoSec h3").data("url");
            }, 1700)
        });
        */

        widthW = $(window).width();
        heightW = $(window).height();

        $(window).resize(function () {
            checkRes();
            sameHeight();
            initAll();
        });

        // close the menu when clicked outside menu
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.nav.open, .mobileToggle').length) {
                $('.nav.open').removeClass('open');
                $('.navScroll.open').removeClass('open');
                $('.hero .sDelimiter, .hero .fa-search').hide();
            }
        });

        ////////////////////////////////////////////////////


        initAll();

        // open leftMenu on near mouse
        var leftMenuOpened = false;
        var preventOpeningLeftMenu = false;
        $("body").mousemove(function (event) {
            if (!preventOpeningLeftMenu && $(".menuL").is(":visible")) {
                if (isNear($('.menuInside'), 30, event)) {
                    if (!leftMenuOpened) {
                        TweenMax.to($('.wrap:not(.wrapHL), .scrollDown, .menuAnimateLeft'), 0.5, { x: 300, delay: 0.4 });
                        TweenMax.to($('.wrapHL:not(.menuAnimateLeft)'), 0.5, { marginLeft: 300, delay: 0.4 });
                        TweenMax.to($('.menuInside'), 0.5, { width: 300, delay: 0.4 });

                        TweenMax.to($('.logo, .logoS'), 0.5, { x: -300, delay: 0.4 });
                        TweenMax.set($('.hero'), { css: { 'overflow': 'hidden' } });
                        leftMenuOpened = true;
                    }

                } else {
                    if (leftMenuOpened) {
                        TweenMax.to($('.wrap:not(.wrapHL), .scrollDown, .menuAnimateLeft'), 0.5, { x: 0, delay: 1 });
                        TweenMax.to($('.wrapHL:not(.menuAnimateLeft)'), 0.5, { marginLeft: 0, delay: 1 });
                        TweenMax.to($('.menuInside'), 0.5, { width: 4, delay: 1 });

                        TweenMax.to($('.logo, .logoS'), 0.5, { x: 0, delay: 1 });
                        TweenMax.to($('.hero'), 0, { css: { 'overflow': 'visible' }, delay: 1.5 });
                        leftMenuOpened = false;
                    }
                }
            }
        }.throttle(200));

        var objX = { x: 0 };

        ///// init 2s showOff menu ///////////////

        var menuCookie = $.cookie("UnexMenuOpen");
        if (menuCookie == undefined && $("body").hasClass("home") && !isStacked) {
            setTimeout(function () {
                var tlInit = new TimelineMax({ paused: true });
                tlInit.to($('.wrap:not(.wrapHL), .scrollDown'), 0.5, { x: 300, delay: 0.4 }, 'label')
                .to($('.wrapHL'), 0.5, { marginLeft: 300, delay: 0.4 }, 'label')
                    .to($('.menuInside'), 0.5, { width: 300, delay: 0.4 }, 'label')
                    .to($('.logo, .logoS'), 0.5, { x: -300, delay: 0.4 }, 'label')
                    .set($('.hero'), { css: { 'overflow': 'hidden' } }, 'label')
                .to(objX, 2, { x: -300 })
                .to($('.wrap:not(.wrapHL), .scrollDown'), 0.5, { x: 0, delay: 0.4 }, 'label2')
                    .to($('.wrapHL'), 0.5, { marginLeft: 0, delay: 0.4 }, 'label2')
                    .to($('.menuInside'), 0.5, { width: 4, delay: 0.4 }, 'label2')
                    .to($('.logo, .logoS'), 0.5, { x: 0, delay: 0.4 }, 'label2')
                    .to($('.hero'), 0, { css: { 'overflow': 'visible' }, delay: 0.9 }, 'label2');
                tlInit.play();
                $.cookie("UnexMenuOpen", "1", { expires: 1, path: '/' });
            }, 3000);
        }

        ///////////////////////////////


        // open/close menu
        $('.hero .mobileToggle').click(function () {
            if ($('.hero .nav').hasClass('open')) {
                $('.hero .nav').removeClass('open');
                $('.hero .sDelimiter, .hero .fa-search').hide();
            } else {
                $('.hero .sDelimiter, .hero .fa-search').show();
                $('.hero .nav').addClass('open');
            }
        });

        $('.navScroll .mobileToggle').click(function () {
            if ($('.navScroll .nav').hasClass('open')) {
                $('.navScroll .nav, .navScroll').removeClass('open');
            } else {
                $('.navScroll .nav, .navScroll').addClass('open');
            }
        });

        // to make elemenets same height put them inside .shwrap and name each .sh

        setTimeout(function () { sameHeight(); }, 500);

        ///////////////////////////////

        // homepage zoom on mouseover
        $('.homeSec').mouseenter(function () {
            TweenMax.to($(this).find('.bg'), 5 * 1.15, { scale: 1.1, opacity: 0.3 });
            TweenMax.to($(this).find('.rightBg img'), 5 * 1.15, { scale: 1.1 });
        });

        $('.homeSec').mouseleave(function () {
            TweenMax.to($(this).find('.bg'), 2.5, { scale: 1, opacity: 1 });
            TweenMax.to($(this).find('.rightBg img'), 2.5, { scale: 1 });
        });

        $('.homeZoomBgOnHoverTarget').mouseover(function () {
            TweenMax.to($(this).find('.homeZoomBgOnHover'), 10, { scale: 1.1 });
        });

        $('.homeZoomBgOnHoverTarget').mouseout(function () {
            TweenMax.to($(this).find('.homeZoomBgOnHover'), 5, { scale: 1 });
        });

        ///////////////////////////////

        // open/close search popup
        $('.fa-search, .openSearch').click(function () {

            if (!$('.searchDiv').hasClass('open')) {
                $('.hero').addClass('onTop');
                $('.navScroll .nav').removeClass('open');
                cp = $('body').scrollTop();
                $('html,body').animate({ scrollTop: 0 }, 0);
                TweenMax.staggerFromTo($('.searchDiv').children(), 0.5, { y: -10 }, { y: 0 }, 0.05);
                TweenMax.to($('.searchDiv'), 1, { autoAlpha: 1 });
                $('.contAll').css('display', 'none');
                $('.searchDiv').addClass('open');
                $('.menuL, .purple, .gotoSec, .nlSec').css('display', 'none');
            }


        });
        $('.closeS').click(function () {
            if ($('.searchDiv').hasClass('open')) {
                $('.hero').removeClass('onTop');
                $('.contAll').css('display', 'block');

                $('html,body').animate({ scrollTop: cp }, 0);
                TweenMax.staggerFromTo($('.searchDiv').children(), 0.5, { y: 0 }, { y: -10 }, 0.05);
                TweenMax.to($('.searchDiv'), 1, { autoAlpha: 0 });
                $('.searchDiv').removeClass('open');
                $('.menuL, .purple, .gotoSec, .nlSec').css('display', 'block');
                if ($("body").hasClass("stacked")) {
                    $(".menuL").hide();
                }
            }
        });
        ///////////////////////////////

        // open/close popup

        $("body").on("click", ".opencase", function () {
            var elUrl = $(this).data("url");
            window.location = elUrl;
        });

        $("body").on("click", ".opennews", function () {
            var elUrl = $(this).data("url");
            window.location = elUrl;
        });

        ///////////////////////////////

        // map menu script
        $('.mape .btn').click(function () {
            if (!$(this).hasClass('selected')) {
                if ($(this).hasClass('zgb')) { map.panTo(lok1); map.setZoom(15); $('.mape .selected').removeClass('selected'); $(this).addClass('selected'); }
                else if ($(this).hasClass('srj')) { map.panTo(lok2); map.setZoom(15); $('.mape .selected').removeClass('selected'); $(this).addClass('selected'); }

            }
        });

        // ajax loader
        $("#loading").ajaxStart(function () {
            $(this).show();
        });

        $("#loading").ajaxComplete(function () {
            $(this).hide();
        });


        // rotator klijenata 
        $('.imgRotator').each(function () {
            var dd = new BrkoRotator($(this));
        });

        // menu dissapearance
        /*
        var lastScrollTop = 0;
        $(window).scroll(function (event) {
            if (!($("body").hasClass("history")) || $("body").hasClass("stacked")) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    { $('.hidingMenu, .navScroll').addClass('hidden'); $(".scrollDown").fadeOut(500); }
                } else {
                    { $('.hidingMenu, .navScroll').removeClass('hidden'); }
                }
                lastScrollTop = st;
            }
        }.throttle(200));
        */

        if (($("body").hasClass("history")) && !($("body").hasClass("stacked"))) {
            { $('.hidingMenu, .navScroll').removeClass('hidden'); }
        }
        

        if ($("body").hasClass("awards")) {
            slickAwards();
        }

        $(".how-slider").each(function () {
            $(this).slick({
                adaptiveHeight: true,
                arrows: false,
                dots: true
            });
        });

        $(".how-slider").on('afterChange', function (event, slick, currentSlide) {
            $(".how-icon").removeClass("active");
            $(".how-icon").eq(currentSlide).addClass("active");
        });

        $(".how-icon").eq(0).addClass("active");

        $(".how-icon").on("click touchstart", function () {
            var pos = $(this).index();
            $(".how-slider .slick-dots button").eq(pos).trigger("click");
        });

        if ($(".slider-gallery a").length > 1) {
            $(".slider-gallery").slick({
                adaptiveHeight: true,
                arrows: true,
                dots: false
            });
        }




    }); // end of wait, go on


}); // end document ready


function slickAwards() {
    $(".makeSlide").each(function () {
        $(this).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
            ]
        });
    });
}


$(window).load(function () {
    $(".tabcontent").hide();
    $(".tabselector li").eq(0).addClass("selected");
    $(".tabcontent").eq(0).show();

    $(".tabselector li").on("click", function () {

        $(".tabselector li").removeClass("selected");
        $(".tabcontent").fadeOut(400);
        $(this).addClass("selected");
        var targetContent = $(this).data("target");
        setTimeout(function () {
            $(".tabcontent[data-content='" + targetContent + "']").fadeIn(400);
            if ($("body").hasClass("awards")) { // re-slick if awards page
                $(".makeSlide").slick('unslick');
                slickAwards();
            }
        }, 400);
    });
});

function BrkoRotator(el) {
    this.br = el;
    this.images = this.br.find('img');
    this.total = this.images.length;
    this.currentIndex = 0;
    this.startAnimation(this);
}
BrkoRotator.prototype = {
    startAnimation: function (obj) {
        var tl9 = new TimelineMax({ paused: true });
        var objX = { x: 1 };
        tl9.to(objX, obj.getRandomTime(), { x: 10 })
        .to(obj.br.find('.visib'), 1, { className: "-=visib" }, 'label')
        .to($(obj.images[obj.nextIndex()]), 1, { className: "+=visib", onComplete: obj.startAnimation, onCompleteParams: [obj] }, 'label');
        tl9.play();

    },
    getRandomTime: function () {
        return (Math.floor(Math.random() * 5000) + 10000) / 1000; // između 5 i 10 s
    },
    nextIndex: function () {
        this.currentIndex = (this.currentIndex + 1) % this.total;
        var next = this.currentIndex;
        return next;

    }
};

function isNear(element, distance, event) {
    var left = element.offset().left - distance,
        right = left + element.width() + 2 * distance,
        x = event.pageX,
        y = event.pageY;
    return (x > left && x < right);
};
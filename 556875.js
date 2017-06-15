new mlPushMenu(document.getElementById("mp-menu"), document.getElementById("trigger"), {
    type: "cover"
});

$(function () {
    $('a[href^="http://"],a[href^="https://"]').attr('target', '_blank');
    $("a[href$='pdf']").attr('target', '_blank');

    $(".home-slides").slick({
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        autoplay: true,
        fade: true,
        cssEase: 'linear'
    });
    
    $(".calendar-slides").slick({
        adaptiveHeight: true,
        arrows: true,
        dots: false,
        autoplay: true
    });

    if ($("body").height() > window.innerHeight) {
        $("footer").css("position", "relative");
        $("body").css("margin-bottom", "0");
    }

    $(".contact-header").on("click", function () {
        $(this).parent().toggleClass("is-active");
        if ($(".contact-back").length > 0) {
            if ($(".contact-section.is-active").length > 0) { // if any is opened
                $(".contact-back").addClass("faded");
            } else {
                $(".contact-back").removeClass("faded");
            }
        }
    })

    $(".contact-section.auto-open").eq(0).addClass("is-active");

    $(".disable-click").on("click", function (e) {
        e.preventDefault();
    });
    
    $("#prodajni-meni").on("click", function(e){
        e.preventDefault();
        $(".home-menu").addClass("is-active");
    });
    
    $(".home-menu-back").on("click", function(e){
        e.preventDefault();
        $(".home-menu").removeClass("is-active");
    })

    $(".stacktable").stacktable();

    // upute search
    $(".upute-search").on("keyup input", function () {
        var searchTerm = $(this).val();
        if (searchTerm.length <= 2) {
            $(".search-results").hide();
            $(".upute-list, .upute-item").show();
        } else {
            var searchTermUpper = searchTerm.toUpperCase();
            $(".upute-item").each(function () {
                var itemText = $(this).text().toUpperCase();
                if (itemText.indexOf(searchTermUpper) >= 0) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
            $(".upute-list").show();
            $(".upute-list").each(function () {
                var list = $(this);
                if ($(this).find(".upute-item:visible").length == 0) {
                    list.hide();
                }
            });

            var totalVisible = $(".upute-item:visible").length;
            $(".search-results").show();
            $(".results-no").text(totalVisible);
            $(".search-term").text(searchTerm);
        }
    });
});
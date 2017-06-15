$(function () {

    $(".hamburger-toggle").on("click", function () {
        $(".header-container").toggleClass("hamburger-active");
    });
    $(".more").append("<span class='symbol-StrelicaZaDalje'></span>");

    $(".menu2-a").on("mouseover", function () {
        $(".first3").removeClass("opendefault");
    });
    $(".menu1-li.has-submenu .menu1-a").on("mouseover", function () {
        $(".first3").addClass("opendefault");
    });

    $(".menu1-li.has-submenu").one("click", function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            $(this).find(".subnav").show();
        }
    });

    var cookieLaw = getCookie("cookiejam");
    $(".cookie-close").on("click", function () {
        document.cookie = "cookiejam=accepted; expires=Thu, 15 Nov 2085 12:00:00 UTC; path=/";
        $(".cookie-bar").fadeOut(500, function () {
            $(".cookie-bar").remove();
        });
    });

    if (cookieLaw == null) {
        $(".cookie-bar").show();
    }

    $("body").on("click", ".share-button", function (e) {
        e.preventDefault();
        var sibling = $(this).siblings(".share-wrap");
        $(".share-wrap").not(sibling).removeClass("hidden").addClass("hidden"); // reset
        sibling.toggleClass("hidden");
    });

    $("body").on("click", ".sharepopup", function (e) {
        e.preventDefault();
        $(this).customerPopup(e);
    });

});


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) { return parts.pop().split(";").shift(); }
    return null
}

$.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

    // Prevent default anchor event
    e.preventDefault();

    // Set values for window
    intWidth = intWidth || '650';
    intHeight = intHeight || '400';
    strResize = (blnResize ? 'yes' : 'no');

    // Set title and open popup with focus on it
    var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
        objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
}
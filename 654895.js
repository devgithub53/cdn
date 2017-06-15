$(function () {
	/*
	var maxLength = 13;
$('textarea.posveta').on('input focus keydown keyup', function() {
	var text = $(this).val();
	var lines = text.split(/(\r\n|\n|\r)/gm); 
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].length > maxLength) {
			lines[i] = lines[i].substring(0, maxLength);
		}
	}
	$(this).val(lines.join(''));
});
*/
	$.oldIE = false;

	//cookies
	$.cookie.json = true;
	$.colorarray = new Array();
	$.finalplanner = new Array();
	$.additionalpagesarray = new Array();
	$.additionalpagestitlearray = new Array();
	$.propagesarray = new Array();
	$.pagestoadd = 10;
	$.additonalpagesimages = new Array();
	$.propagesimages = new Array();
	$.propagestitles = new Array();
	$.additionalPage;
	$.additionalPageImage;
	$.additionalPageTitle;

	$.input = $("#book-title");
	$.label = $(".front-title");

	//select
	$('select.demo-default').selectize({
		dropdownParent: 'body'
	});


	//layout types img switch
	$(".layout-types img").on("click", function (e) {
		e.preventDefault();
		var currentImage = $(this).attr("data-src");

		$(".layout-types li").removeClass("selected");
		$(this).closest("li").addClass("selected");

		$(this).closest(".column").next().find(".spread-inner").html("<img src='" + currentImage + "' />");
	});

	// init stupci
	if ($("body").hasClass("planer2017")) {
		$(".stupac-lijevi").hide();
		$(".stupac-desni").hide();
	}

	//tabs
	$("ul.tabs").each(function () {
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter("[href='" + location.hash + "']")[0] || $links[0]);
		$active.addClass("selected");

		$content = $($active[0].hash);

		$links.not($active).each(function () {
			$(this.hash).hide();
		});

		$(this).on("click", "a", function (e) {
			e.preventDefault();

			$active.removeClass('selected');
			$content.hide();

			$active = $(this);
			$content = $(this.hash);

			$active.addClass('selected');
			$content.show();

			if ($("body").hasClass("planer2017")) {
				if ($(this).attr("href") == "#stupac1") {
					//console.log("show 1 stupac");
					$(".stupac-siroki").show();
					$(".stupac-lijevi").hide();
					$(".stupac-desni").hide();
				} else {
					//console.log("show 2 stupca");
					$(".stupac-lijevi").show();
					$(".stupac-desni").show();
					$(".stupac-siroki").hide();
				}
			
			}


		});
	});

	//slidesjs
	$("#slides").slidesjs({
		width: 972,
		height: 555,
		navigation: {
			active: false
		},
		pagination: {
			effect: "fade"
		},
		effect: {
			fade: {
				speed: 400
			}
		}
	});


	//custom slider navigation - going back
	$(".slidesjs-pagination").hide();
	var navigation2015 = '<ul id="slides-navigation">' +
	'<li><a href="#" data-item="0">1</a></li>' +
	'<li><a href="#" data-item="1">2</a></li>' +
	'<li><a href="#" data-item="2">3</a></li>' +
	'<li><a href="#" data-item="3">4</a></li>' +
	'<li><a href="#" data-item="4">5</a></li>' +
	'<li><a href="#" data-item="5">6</a></li>' +
	'<li style="display:none;"><a href="#" data-item="6">7</a></li>'
	'</ul>';

	var navigation2016 = '<ul id="slides-navigation">' +
	'<li><a href="#" data-item="0">1</a></li>' +
	'<li><a href="#" data-item="1">2</a></li>' +
	'<li><a href="#" data-item="2">3</a></li>' +
	'<li><a href="#" data-item="3">4</a></li>' +
	'<li><a href="#" data-item="4">5</a></li>' +
	'<li><a href="#" data-item="5">6</a></li>' +
	'<li style="display:none;"><a href="#" data-item="6">7</a></li>'
	'</ul>';

	var navigation2017 = '<ul id="slides-navigation">' +
	'<li><a href="#" data-item="0">1</a></li>' +
	'<li><a href="#" data-item="1">2</a></li>' +
	'<li><a href="#" data-item="2">3</a></li>' +
	'<li><a href="#" data-item="3">4</a></li>' +
	'<li><a href="#" data-item="4">5</a></li>' +
	'<li style="display:none;"><a href="#" data-item="5">6</a></li>'
	'</ul>';



	if ($("body").hasClass("planer2016")) {
		$("#slides").append(navigation2016);
	} else if ($("body").hasClass("planer2017")) {
		$("#slides").append(navigation2017);

	} else {
		$("#slides").append(navigation2015);
	}

	$("#slides-navigation li a[data-item='0']").addClass("active");
	$("#slides-navigation li a[data-item='1']").addClass("disabled");
	$("#slides-navigation li a[data-item='2']").addClass("disabled");
	$("#slides-navigation li a[data-item='3']").addClass("disabled");
	$("#slides-navigation li a[data-item='4']").addClass("disabled");
	$("#slides-navigation li a[data-item='5']").addClass("disabled");
	$("#slides-navigation li a[data-item='6']").addClass("disabled");

	$("#slides-navigation li a").on("click", function (e) {
		e.preventDefault();

		var nextItem = $(this).data("item");
		var activeItem = $("#slides-navigation li a.active").data("item");

		if (nextItem < activeItem) {
			$('a[data-slidesjs-item="' + nextItem + '"]').trigger('click');
			$(this).addClass("active");
			$(this).parent().nextAll().find("a").addClass("disabled");
		}
	});

	$.ajaxSetup({ beforeSend: function () { $(".load").show(); }, complete: function () { $(".load").hide(); } });

});




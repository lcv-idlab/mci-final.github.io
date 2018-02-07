// Script to manage the mobile menu


window.onload = function() {
	var navToggle = document.querySelector(".main-nav .menu-button");
	var nav = document.querySelector( ".main-nav nav ul");
	var button = document.querySelector(".main-nav .menu-button a");

	//console.log(navToggle);

	if ( navToggle ) {
		navToggle.addEventListener( "click", function(e) {
			if (nav.className == "open" ) {
				button.className = "";
				nav.className = "";
			} else {
				button.className = "open";
				nav.className = "open";
			}
			e.preventDefault();
		}, false );
	}

	// sensible art workshop

	var navToggleS = document.querySelector(".senseable-main-nav .senseable-menu-button");
	var linkToggleS = document.querySelectorAll(".senseable-main-nav nav ul .link-button");
	var navS = document.querySelector( ".senseable-main-nav nav ul");
	var buttonS = document.querySelector(".senseable-main-nav .senseable-menu-button a");

	// open/close the menu trough the "menu" button
	if ( navToggleS ) {
		navToggleS.addEventListener( "click", function(e) {
			if (navS.className == "open" ) {
				buttonS.className = "";
				navS.className = "";
			} else {
				buttonS.className = "open";
				navS.className = "open";
			}
			e.preventDefault();
		}, false );
	}

	// close the menu when a link is clicked
	if( linkToggleS ) {
		Array.from(linkToggleS).forEach( function(item, index, array) {
			item.addEventListener( "click", function() {
				buttonS.className = "";
				navS.className = "";
			});
		});
	}


	// resources experience audio players
	// play only one at the time

 	var audios = document.getElementsByTagName('audio');	

 	/*
	document.addEventListener('play', function(e){
	    for(var i = 0, len = audios.length; i < len;i++){
	        if(audios[i] != e.target){
	            audios[i].pause();
	            audios[i].currentTime = 0;
	        }
	    }
	}, true);
	*/


	for(var i = 0, len = audios.length; i < len;i++){

		// volume change and muted (both triggered by 'volumechange')
		audios[i].addEventListener('volumechange', function(e) {

			if(this.muted) {
				for(var i = 0, len = audios.length; i < len;i++) {
			            audios[i].muted = this.muted;
			    }
			}
			else {
				for(var i = 0, len = audios.length; i < len;i++) {
						audios[i].muted = false;
			            audios[i].volume = this.volume;
			    }
			}
		}, true);

		// playback control
		audios[i].addEventListener('play', function(e) {
			for(var i = 0, len = audios.length; i < len;i++){
		        if(audios[i] != e.target){
		            audios[i].pause();
		            audios[i].currentTime = 0;
		        }
		    }
		}, true);

	}

	//--- KIT SINGLE LIGHTBOX GALLERIES ---//
	// 
	var gallery_array = $("figure[class][class*='gallery']");	// select only the galleries

	//console.log(gallery_array);

    $.each(gallery_array, function() {
    	$gallery_name = $(this).attr('class').replace('gallery', '').replace(/ /g, '');
    	$link = $(this).children().attr('src');
    	$alt = $(this).children().attr('alt');

    	$(this).children().wrap("<a href=" + $link + " data-lightbox=" + $gallery_name + " data-title=" + $alt + "></a>");

    })

    //--- KIT INLINE GALLERY MANAGER ---//

    //****  method 1:

    var classNames = [];

    //var figures_array = $('figure').find('.gallery:first, .two-columns:first');

    var figures_array = $('figure').nextAll('figure');

    // select the groups of the same gallery and wrap them all with a div for css layouting
    $.each(figures_array, function() {
    	classNames.push($(this).attr('class').replace('gallery', '').replace('two-columns', '').replace(/ /g, ''));
    })

    classNames = jQuery.uniqueSort(classNames);

    $.each(classNames, function(i, e) {
    	// and operation on items to select based on attributes and elements types
    	$("figure[class][class*='gallery'][class*='" + e + "']").wrapAll("<div class='gallery-group' />");
    })



    //--- KIT LATERAL INDEX FOLLOWING THE SCROLL ---//

    var index = $('#index_menu');
    var top_pos;
    var end_pos;
    var index_height;
    var main_nav = $('.main-nav');
	var main_nav_h = main_nav.height();
	var scroll_top_pos = main_nav_h;
	var last_scroll = 0;
	var scrollup_val = 0;
    indexPositionCalc();

    function indexPositionCalc() {
	    if(index.length) {
			 index_height = index.height();
			 top_pos = index.offset().top - main_nav_h;
			 end_pos = $('#article_end').offset().top - index_height - main_nav_h - 36;
			 // console.log("index_height: " + index_height + " top_pos: " + top_pos + " end_pos: " + end_pos);
		}
	}


	$(window).scroll(function(e) {
		var scroll = $(window).scrollTop();

		if(scroll > main_nav_h) {
			if(scroll > last_scroll) {	// scroll down
				main_nav.removeClass('scrollup');				
				scrollup_val = 0;
				$('main, footer').css({"position": "static", "top": "0px" });
			} else {	// scroll up
				main_nav.addClass('scrollup');
				$('main, footer').css({"position": "relative", "top": main_nav_h });
				scrollup_val = main_nav_h;
			}
			last_scroll = scroll;
		}

		/*
		if(scroll > main_nav_h) {
			if(scroll > last_scroll) {	// scroll down
				//main_nav.css({'top': -scroll });
				//scroll_top_pos = main_nav_h;
				// main_nav.removeClass('scrollup');
				// $('main').removeClass('scrollup');
				//$('#main').removeClass('scrollup');
				scrollup_val = 0;
			} else {	// scroll up
				// main_nav.addClass('scrollup');
				// $('main').addClass('scrollup');
				// $('#main').addClass('scrollup');
				scrollup_val = main_nav_h;
				//main_nav.css({'top': ((scroll_top_pos <= 0) ? 0 : -(scroll_top_pos-=10)});
			}
			last_scroll = scroll;
		}

		*/

		if(index.length) {
			indexScroll(scroll);
		}
		
	});

	$(window).resize(function() {
		index.css({ top: 0 });
		index.removeClass();
		indexPositionCalc();
		$(window).scroll();
	})


	// index in kit single
	function indexScroll(scroll) {
		//console.log("scroll: " + scroll);

		if(scroll > top_pos - 36 && scroll < end_pos) {		// 36 is 2rem form the top: 2rem in the scss
			index.removeClass();
			index.css({ 'top': scrollup_val + 36 });
			index.addClass("fix");
		} else if (scroll > end_pos) {
			index.removeClass();
			index.addClass("absolute");
			index.css({ 'top': end_pos + scrollup_val + 36 });
		} else {
			index.css({ top: 0 });
			index.removeClass();
		}
	}
	
};

// once the DOM is loaded (before all the content as images ect) run the code here
$(document).ready(function() {

	// HOMEPAGE KITS "CAROUSELL"
	if($('#homepage-kit').length > 0) {

		var kits_com = $('#homepage-kit > ul > li.comunicazione');
		var kits_op = $('#homepage-kit > ul > li.opere');
		var kits_or = $('#homepage-kit > ul > li.orientamento');
		var kits_all = $('#homepage-kit > ul > li');

		class HomeKit {
			constructor(array) {
				this.array = array;
				this.old_pick = Math.floor(Math.random() * array.length);
				this.interval = Math.floor(Math.random() * 3000 ) + 3000;
				this.mouse_over = false;
				this.pickRandom();
			}

			hideAll() {
				this.array.each(function() {
					$(this).css({"display" : "none"});
				});
			}

			pickRandom() {

				if(!this.mouse_over) {
					var pick = this.old_pick;

					while (pick == this.old_pick) {
						pick = Math.floor(Math.random() * this.array.length);
					}

					this.hideAll();
					this.old_pick = pick;
					$(this.array[pick]).css({"display" : "block"});
				}
			}
		}
		
		var com = new HomeKit(kits_com);
		var op = new HomeKit(kits_op);
		var or = new HomeKit(kits_or);
		//var all = new HomeKit(kits_all);

		setAutomation(com);
		setAutomation(op);
		setAutomation(or);

		function setAutomation(array) {
			setInterval(function() { array.pickRandom(); }, array.interval);

			for (var i=0; i < array.array.length; i++) {
				$(array.array[i]).mouseover(function() { array.mouse_over = true; });
				$(array.array[i]).mouseout(function() { array.mouse_over = false; });
			}
		}

	}


	// KIT PAGE SINGLE "READ MORE DESCRIPTION"
	if($('#kit #more-text').length > 0) {

		var desc = $('#kit #kit-description');

		var height_closed;


		height_closed = desc.height();	// get the height closed (defined by the css)


		$('#kit #more-text').click(function() {

			desc.toggleClass("open");

			if(desc.hasClass("open")) {
				desc.css("height", desc.prop('scrollHeight'));
				$('#main-header .linear-gradient').css('background-repeat', 'no-repeat');
			} else {				
				desc.css("height", height_closed);
				$('#main-header .linear-gradient').css('background-repeat', 'repeat-x');
			}

			$('#kit #more-text span').toggleClass("hidden-item");

		});


		$(window).resize(function() {
			if(desc.hasClass("open")) {
				//desc.css("height", desc.prop('scrollHeight'));
				desc.css("height", "auto");
				desc.css("height", desc.prop('scrollHeight'));
			}
		});
	}

});


//--- HOMPEGAE KIT CAROUSELL ---//

/*

// not used anymore... list of 4 random kit without doubles
function changeKitsHomepage() {

	if($('#homepage-kit')) {
		var kits_list = $('#homepage-kit > ul > li');

		$(kits_list).each(function() {
			$(this).css({"display": "none", "margin-right" : "4.72458%"});
		});

		var hide_array = [];
		var hide_array_length = 4;

		hide_array.length = 0;

		
		while (hide_array.length < hide_array_length) {
			var rand_int = Math.floor(Math.random() * 8);

			if(hide_array.indexOf(rand_int) > -1) continue;
			hide_array[hide_array.length] = rand_int;
		}

		//console.log(hide_array);
		

		for(var i=0; i<hide_array.length; i++) {
			$(kits_list[hide_array[i]]).css("display", "block");
		}

		$(kits_list[Math.max(...hide_array)]).css("margin-right", "0px");
	}
};

*/



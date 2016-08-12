/* jshint devel:true */

/* navigation */
var $navigationItems = $('#pageHeader nav li'),
	$navigationLinks = $navigationItems.find('a'),
	scrollSpeed = 2; // how many px per millisecond

var activateLink = function ($link) {
	var $parent = $link.parent();
	// set classes
	// $navigationItems.removeClass('selected prev');
	$parent.prev().addClass('prev').siblings().removeClass('prev');
	$parent.addClass('selected').siblings().removeClass('selected');
}

$navigationLinks.click(function (e) {
	e.preventDefault();

	// scroll
	var target = $(this.hash).offset().top,
		currentPosition = $('html').scrollTop(),
		distance = Math.round(Math.abs(target - currentPosition)),
		boost = Math.ceil(distance / 1000),
		speed = distance / scrollSpeed / boost;

	$('html, body').animate({
          scrollTop: target
	}, speed);

    return false;
});

var waypoints = document.getElementsByClassName('waypoint');
for (var i = 0; i < waypoints.length; i++) {
	new Waypoint({
		element: waypoints[i],
		handler: function (direction) {
			if ('up' == direction) {
				activateLink($navigationLinks.filter('.' + this.element.id).parent().prev().children());
			} else {
				activateLink($navigationLinks.filter('.' + this.element.id));
			}
		},
		offset: '25%'
	});
}

 /* work */
$('#work article header').click(function (e) {
	e.preventDefault();

	var $parent = $(this).parent(),
		selected = $parent.hasClass( 'selected' );

	// unselect item -> hide details
	if (selected) {
		$parent.removeClass( 'selected' );
	}
	// select item -> show details
	else {
		$parent.addClass('selected');
		var $details = $parent.find('> .details'),
			top = Math.round($details.offset().top),
			viewportHeight = $(window).height();

		$details.removeClass('flash');

		// details is hidden below fold
		if (top + viewportHeight * .25 > $('html').scrollTop() + viewportHeight) {
			$('html').animate({
				scrollTop: top - viewportHeight * 0.5
			});

			$details.addClass('flash');//.removeClass('flash');
		}
	}

	// make sure the waypoint refresh happens after the details are fully visible
	setTimeout(function () {
		Waypoint.refreshAll();
	}, 1000);

	return false;
});

/* aboutme revolution slider */
var tpj=jQuery;
var revapi4;
tpj(document).ready(function() {
	if(tpj("#rev_slider_4_1").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider_4_1");
	}else{
		revapi4 = tpj("#rev_slider_4_1").show().revolution({
			sliderType:"standard",
			jsFileLocation:"/js/vendor/revolution/js/",
			sliderLayout:"auto",
			dottedOverlay:"none",
			delay:1500,
			navigation: {
				onHoverStop:"off",
			},
			visibilityLevels:[1240,1024,778,480],
			gridwidth:600,
			gridheight:281,
			lazyType:"smart",
			shadow:0,
			spinner:"off",
			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,
			shuffle:"off",
			autoHeight:"on",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			// startWithSlide:26,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		});
	}
});
// track replay click on slider
jQuery('body').on('click', '.ga-button', function() {
    var $this = jQuery(this),
        data  = $this.attr('data-link') || $this.attr('href');

    if(!data) {
        data = $this.attr('data-actions');
        if(data) data = data[0].url;
        if(!data) data = $this.attr('id');
    }

    __gaTracker('send', 'event', 'outbound', 'click', data, {'transport': 'beacon'});
});
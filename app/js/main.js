/* jshint devel:true */

/* navigation */
var $navigationItems = $('#pageHeader nav ul.navigation li'),
	$navigationLinks = $navigationItems.find('a'),
	$waterdropItems  = $('nav .waterdrop li'),
	scrollSpeed = 2; // how many px per millisecond

// effect controller constructor
function Waterdrop(selector){

	var	$waterdrop = $(selector),
		$line = $('nav > div.line');

	function activate($element){
	    var dest=$element.position().top;
	    var t=0.7;
	    TweenMax.to($waterdrop,t,{y:dest,ease:Back.easeOut, yoyo:false})
	  }

	  // drop transformation is based on JS part of http://codepen.io/lbebber/pen/lFdHu
	var lastPos=$waterdrop.position().top,
		lineStart = lastPos,
		d=$waterdrop.height(),
		offset=0,
		hd=d/2;

	var dot = $waterdrop.find('div');
		if (!dot.length) dot = $waterdrop;

	// var lineOffset = dot.position().top - lineStart + hd;
	var lineOffset = 0;

		//$line.height(0);
		$line.css({
			// "top": lineStart + lineOffset
			"top": lineStart + lineOffset,
			"left": $waterdrop.width() * -0.5 -1
		});

		$line = $line.find('span:first-child');
		lineStart = 0;

	function updateScale(){

	    var pos=$waterdrop.position().top,	    
	    	speed=Math.abs(pos-lastPos),
	    	scale=(offset+pos)%d;

	    if(scale>hd){
	      scale=hd-(scale-hd);
	    }
	    scale=1-((scale/hd)*0.5);
	    TweenMax.to($waterdrop,0.1,{scaleX:scale,scaleY:1+(speed*0.06)});

	    $line.height(pos - lineStart);
	    
	    lastPos=pos;
		requestAnimationFrame(updateScale);
	}

	requestAnimationFrame(updateScale);

	activate($waterdrop);

	return {
		activate: activate
	} 
}
var waterDrop = Waterdrop("li.waterdrop");

var activateLink = function ($link) {
	var $parent = $link.parent();

	// set classes
	// $navigationItems.removeClass('selected prev');
	$parent.prev().addClass('prev').siblings().removeClass('prev');
	$parent.addClass('selected').siblings().removeClass('selected');
	$navigationItems.each(function(idx){ 
		if ($(this).hasClass('selected')) $($waterdropItems[idx]).addClass('selected');
		else $($waterdropItems[idx]).removeClass('selected');
	});
	waterDrop.activate($parent);
	trackPageView( $link.attr( 'class' ) );
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

// track page views
var timerTrackPageView = 0;
var trackPageView = function( page ) {
	clearTimeout(timerTrackPageView);
	
	timerTrackPageView = setTimeout(function(){
		ga('set', 'page', '/' + page + '.html');
		ga('send', 'pageview');
	}, 1000);
}

 /* work */
$('#work article header').click(function (e) {
	e.preventDefault();

	var $parent = $(this).parent(),
		selected = $parent.hasClass( 'selected' ),
		page = $parent.attr( 'class' );

	// unselect item -> hide details
	if (selected) {
		$parent.removeClass( 'selected' );

		// set page view to work
		ga('set', 'page', '/work.html');
		ga('send', 'pageview');
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

		// set page view to work
		ga('set', 'page', '/work/' + page + '.html');
		ga('send', 'pageview');
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
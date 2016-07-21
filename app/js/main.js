/* jshint devel:true */

/* navigation */
var $navigationItems = $('#pageHeader nav li'),
	$navigationLinks = $navigationItems.find('a'),
	scrollSpeed = 2; // how many px per millisecond

var activateLink = function ($link) {
	// set classes
	$navigationItems.removeClass('selected prev');
	$link.parent().addClass('selected')
		.prev().addClass('prev');
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

var $waypoint = $('section.waypoint').waypoint(function (direction) {
	if ('up' == direction) {
		activateLink( $navigationLinks.filter('.' + this.element.id).parent().prev().children() );
	} else {
		activateLink( $navigationLinks.filter('.' + this.element.id) );
	}
}, {
	offset: '25%'
});

 /* work */
$('#work article header').click(function () {
	$(this).parent().toggleClass('selected');
	setTimeout(function () {
		Waypoint.refreshAll();
	}, 1000);

});



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
$('#work article header').click(function () {
	$(this).parent().toggleClass('selected');
	setTimeout(function () {
		Waypoint.refreshAll();
	}, 1000);

});



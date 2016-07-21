/* jshint devel:true */

/* navigation */
var $navigationLinks = $('#pageHeader nav a');
$navigationLinks.click(function () {
	$(this).parent().addClass( 'selected' )
		.siblings().removeClass( 'selected' );
});

var $waypoint = $('section.waypoint').waypoint(function (direction) {
	// $('#' + this.element.id).addClass('foo');
	// alert(this.element.id + ' hit 25% from ' + direction + ' of window');
	if ('up' == direction) {
		$navigationLinks.filter('.' + this.element.id).parent().prev().children().click();
	} else {
		$navigationLinks.filter('.' + this.element.id).click();
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



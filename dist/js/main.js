(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint devel:true */

/* navigation */
var $navigationItems = $('#pageHeader nav li'),
    $navigationLinks = $navigationItems.find('a'),
    scrollSpeed = 2; // how many px per millisecond

var activateLink = function activateLink($link) {
	// set classes
	$navigationItems.removeClass('selected prev');
	$link.parent().addClass('selected').prev().addClass('prev');
};

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
		activateLink($navigationLinks.filter('.' + this.element.id).parent().prev().children());
	} else {
		activateLink($navigationLinks.filter('.' + this.element.id));
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksbUJBQW1CLEVBQUUsb0JBQUYsQ0FBdkI7QUFBQSxJQUNDLG1CQUFtQixpQkFBaUIsSUFBakIsQ0FBc0IsR0FBdEIsQ0FEcEI7QUFBQSxJQUVDLGNBQWMsQ0FGZixDQUVrQjs7QUFFbEIsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFVLEtBQVYsRUFBaUI7QUFDbkM7QUFDQSxrQkFBaUIsV0FBakIsQ0FBNkIsZUFBN0I7QUFDQSxPQUFNLE1BQU4sR0FBZSxRQUFmLENBQXdCLFVBQXhCLEVBQ0UsSUFERixHQUNTLFFBRFQsQ0FDa0IsTUFEbEI7QUFFQSxDQUxEOztBQU9BLGlCQUFpQixLQUFqQixDQUF1QixVQUFVLENBQVYsRUFBYTtBQUNuQyxHQUFFLGNBQUY7O0FBRUE7QUFDQSxLQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsRUFBYSxNQUFiLEdBQXNCLEdBQW5DO0FBQUEsS0FDQyxrQkFBa0IsRUFBRSxNQUFGLEVBQVUsU0FBVixFQURuQjtBQUFBLEtBRUMsV0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEdBQUwsQ0FBUyxTQUFTLGVBQWxCLENBQVgsQ0FGWjtBQUFBLEtBR0MsUUFBUSxLQUFLLElBQUwsQ0FBVSxXQUFXLElBQXJCLENBSFQ7QUFBQSxLQUlDLFFBQVEsV0FBVyxXQUFYLEdBQXlCLEtBSmxDOztBQU1BLEdBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUNmLGFBQVc7QUFESSxFQUF4QixFQUVHLEtBRkg7O0FBSUcsUUFBTyxLQUFQO0FBQ0gsQ0FmRDs7QUFpQkEsSUFBSSxZQUFZLEVBQUUsa0JBQUYsRUFBc0IsUUFBdEIsQ0FBK0IsVUFBVSxTQUFWLEVBQXFCO0FBQ25FLEtBQUksUUFBUSxTQUFaLEVBQXVCO0FBQ3RCLGVBQWMsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsRUFBK0MsTUFBL0MsR0FBd0QsSUFBeEQsR0FBK0QsUUFBL0QsRUFBZDtBQUNBLEVBRkQsTUFFTztBQUNOLGVBQWMsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsQ0FBZDtBQUNBO0FBQ0QsQ0FOZSxFQU1iO0FBQ0YsU0FBUTtBQUROLENBTmEsQ0FBaEI7O0FBVUM7QUFDRCxFQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFlBQVk7QUFDM0MsR0FBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixXQUFqQixDQUE2QixVQUE3QjtBQUNBLFlBQVcsWUFBWTtBQUN0QixXQUFTLFVBQVQ7QUFDQSxFQUZELEVBRUcsSUFGSDtBQUlBLENBTkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cblxuLyogbmF2aWdhdGlvbiAqL1xudmFyICRuYXZpZ2F0aW9uSXRlbXMgPSAkKCcjcGFnZUhlYWRlciBuYXYgbGknKSxcblx0JG5hdmlnYXRpb25MaW5rcyA9ICRuYXZpZ2F0aW9uSXRlbXMuZmluZCgnYScpLFxuXHRzY3JvbGxTcGVlZCA9IDI7IC8vIGhvdyBtYW55IHB4IHBlciBtaWxsaXNlY29uZFxuXG52YXIgYWN0aXZhdGVMaW5rID0gZnVuY3Rpb24gKCRsaW5rKSB7XG5cdC8vIHNldCBjbGFzc2VzXG5cdCRuYXZpZ2F0aW9uSXRlbXMucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIHByZXYnKTtcblx0JGxpbmsucGFyZW50KCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcblx0XHQucHJldigpLmFkZENsYXNzKCdwcmV2Jyk7XG59XG5cbiRuYXZpZ2F0aW9uTGlua3MuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdC8vIHNjcm9sbFxuXHR2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcCxcblx0XHRjdXJyZW50UG9zaXRpb24gPSAkKCdodG1sJykuc2Nyb2xsVG9wKCksXG5cdFx0ZGlzdGFuY2UgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHRhcmdldCAtIGN1cnJlbnRQb3NpdGlvbikpLFxuXHRcdGJvb3N0ID0gTWF0aC5jZWlsKGRpc3RhbmNlIC8gMTAwMCksXG5cdFx0c3BlZWQgPSBkaXN0YW5jZSAvIHNjcm9sbFNwZWVkIC8gYm9vc3Q7XG5cblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0XG5cdH0sIHNwZWVkKTtcblxuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG52YXIgJHdheXBvaW50ID0gJCgnc2VjdGlvbi53YXlwb2ludCcpLndheXBvaW50KGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcblx0aWYgKCd1cCcgPT0gZGlyZWN0aW9uKSB7XG5cdFx0YWN0aXZhdGVMaW5rKCAkbmF2aWdhdGlvbkxpbmtzLmZpbHRlcignLicgKyB0aGlzLmVsZW1lbnQuaWQpLnBhcmVudCgpLnByZXYoKS5jaGlsZHJlbigpICk7XG5cdH0gZWxzZSB7XG5cdFx0YWN0aXZhdGVMaW5rKCAkbmF2aWdhdGlvbkxpbmtzLmZpbHRlcignLicgKyB0aGlzLmVsZW1lbnQuaWQpICk7XG5cdH1cbn0sIHtcblx0b2Zmc2V0OiAnMjUlJ1xufSk7XG5cbiAvKiB3b3JrICovXG4kKCcjd29yayBhcnRpY2xlIGhlYWRlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0JCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0V2F5cG9pbnQucmVmcmVzaEFsbCgpO1xuXHR9LCAxMDAwKTtcblxufSk7XG5cblxuIl19

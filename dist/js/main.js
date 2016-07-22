(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint devel:true */

/* navigation */
var $navigationItems = $('#pageHeader nav li'),
    $navigationLinks = $navigationItems.find('a'),
    scrollSpeed = 2; // how many px per millisecond

var activateLink = function activateLink($link) {
	var $parent = $link.parent();
	// set classes
	// $navigationItems.removeClass('selected prev');
	$parent.prev().addClass('prev').siblings().removeClass('prev');
	$parent.addClass('selected').siblings().removeClass('selected');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksbUJBQW1CLEVBQUUsb0JBQUYsQ0FBdkI7QUFBQSxJQUNDLG1CQUFtQixpQkFBaUIsSUFBakIsQ0FBc0IsR0FBdEIsQ0FEcEI7QUFBQSxJQUVDLGNBQWMsQ0FGZixDQUVrQjs7QUFFbEIsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFVLEtBQVYsRUFBaUI7QUFDbkMsS0FBSSxVQUFVLE1BQU0sTUFBTixFQUFkO0FBQ0E7QUFDQTtBQUNBLFNBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsTUFBeEIsRUFBZ0MsUUFBaEMsR0FBMkMsV0FBM0MsQ0FBdUQsTUFBdkQ7QUFDQSxTQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsUUFBN0IsR0FBd0MsV0FBeEMsQ0FBb0QsVUFBcEQ7QUFDQSxDQU5EOztBQVFBLGlCQUFpQixLQUFqQixDQUF1QixVQUFVLENBQVYsRUFBYTtBQUNuQyxHQUFFLGNBQUY7O0FBRUE7QUFDQSxLQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsRUFBYSxNQUFiLEdBQXNCLEdBQW5DO0FBQUEsS0FDQyxrQkFBa0IsRUFBRSxNQUFGLEVBQVUsU0FBVixFQURuQjtBQUFBLEtBRUMsV0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEdBQUwsQ0FBUyxTQUFTLGVBQWxCLENBQVgsQ0FGWjtBQUFBLEtBR0MsUUFBUSxLQUFLLElBQUwsQ0FBVSxXQUFXLElBQXJCLENBSFQ7QUFBQSxLQUlDLFFBQVEsV0FBVyxXQUFYLEdBQXlCLEtBSmxDOztBQU1BLEdBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUNmLGFBQVc7QUFESSxFQUF4QixFQUVHLEtBRkg7O0FBSUcsUUFBTyxLQUFQO0FBQ0gsQ0FmRDs7QUFpQkEsSUFBSSxZQUFZLEVBQUUsa0JBQUYsRUFBc0IsUUFBdEIsQ0FBK0IsVUFBVSxTQUFWLEVBQXFCO0FBQ25FLEtBQUksUUFBUSxTQUFaLEVBQXVCO0FBQ3RCLGVBQWMsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsRUFBK0MsTUFBL0MsR0FBd0QsSUFBeEQsR0FBK0QsUUFBL0QsRUFBZDtBQUNBLEVBRkQsTUFFTztBQUNOLGVBQWMsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsQ0FBZDtBQUNBO0FBQ0QsQ0FOZSxFQU1iO0FBQ0YsU0FBUTtBQUROLENBTmEsQ0FBaEI7O0FBVUM7QUFDRCxFQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFlBQVk7QUFDM0MsR0FBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixXQUFqQixDQUE2QixVQUE3QjtBQUNBLFlBQVcsWUFBWTtBQUN0QixXQUFTLFVBQVQ7QUFDQSxFQUZELEVBRUcsSUFGSDtBQUlBLENBTkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cblxuLyogbmF2aWdhdGlvbiAqL1xudmFyICRuYXZpZ2F0aW9uSXRlbXMgPSAkKCcjcGFnZUhlYWRlciBuYXYgbGknKSxcblx0JG5hdmlnYXRpb25MaW5rcyA9ICRuYXZpZ2F0aW9uSXRlbXMuZmluZCgnYScpLFxuXHRzY3JvbGxTcGVlZCA9IDI7IC8vIGhvdyBtYW55IHB4IHBlciBtaWxsaXNlY29uZFxuXG52YXIgYWN0aXZhdGVMaW5rID0gZnVuY3Rpb24gKCRsaW5rKSB7XG5cdHZhciAkcGFyZW50ID0gJGxpbmsucGFyZW50KCk7XG5cdC8vIHNldCBjbGFzc2VzXG5cdC8vICRuYXZpZ2F0aW9uSXRlbXMucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkIHByZXYnKTtcblx0JHBhcmVudC5wcmV2KCkuYWRkQ2xhc3MoJ3ByZXYnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdwcmV2Jyk7XG5cdCRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdGVkJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbn1cblxuJG5hdmlnYXRpb25MaW5rcy5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0Ly8gc2Nyb2xsXG5cdHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCkub2Zmc2V0KCkudG9wLFxuXHRcdGN1cnJlbnRQb3NpdGlvbiA9ICQoJ2h0bWwnKS5zY3JvbGxUb3AoKSxcblx0XHRkaXN0YW5jZSA9IE1hdGgucm91bmQoTWF0aC5hYnModGFyZ2V0IC0gY3VycmVudFBvc2l0aW9uKSksXG5cdFx0Ym9vc3QgPSBNYXRoLmNlaWwoZGlzdGFuY2UgLyAxMDAwKSxcblx0XHRzcGVlZCA9IGRpc3RhbmNlIC8gc2Nyb2xsU3BlZWQgLyBib29zdDtcblxuXHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXRcblx0fSwgc3BlZWQpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbnZhciAkd2F5cG9pbnQgPSAkKCdzZWN0aW9uLndheXBvaW50Jykud2F5cG9pbnQoZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuXHRpZiAoJ3VwJyA9PSBkaXJlY3Rpb24pIHtcblx0XHRhY3RpdmF0ZUxpbmsoICRuYXZpZ2F0aW9uTGlua3MuZmlsdGVyKCcuJyArIHRoaXMuZWxlbWVudC5pZCkucGFyZW50KCkucHJldigpLmNoaWxkcmVuKCkgKTtcblx0fSBlbHNlIHtcblx0XHRhY3RpdmF0ZUxpbmsoICRuYXZpZ2F0aW9uTGlua3MuZmlsdGVyKCcuJyArIHRoaXMuZWxlbWVudC5pZCkgKTtcblx0fVxufSwge1xuXHRvZmZzZXQ6ICcyNSUnXG59KTtcblxuIC8qIHdvcmsgKi9cbiQoJyN3b3JrIGFydGljbGUgaGVhZGVyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHQkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdzZWxlY3RlZCcpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRXYXlwb2ludC5yZWZyZXNoQWxsKCk7XG5cdH0sIDEwMDApO1xuXG59KTtcblxuXG4iXX0=

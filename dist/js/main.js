(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint devel:true */

/* navigation */
var $navigationLinks = $('#pageHeader nav a');
$navigationLinks.click(function () {
	$(this).parent().addClass('selected').siblings().removeClass('selected');
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksbUJBQW1CLEVBQUUsbUJBQUYsQ0FBdkI7QUFDQSxpQkFBaUIsS0FBakIsQ0FBdUIsWUFBWTtBQUNsQyxHQUFFLElBQUYsRUFBUSxNQUFSLEdBQWlCLFFBQWpCLENBQTJCLFVBQTNCLEVBQ0UsUUFERixHQUNhLFdBRGIsQ0FDMEIsVUFEMUI7QUFFQSxDQUhEOztBQUtBLElBQUksWUFBWSxFQUFFLGtCQUFGLEVBQXNCLFFBQXRCLENBQStCLFVBQVUsU0FBVixFQUFxQjtBQUNuRTtBQUNBO0FBQ0EsS0FBSSxRQUFRLFNBQVosRUFBdUI7QUFDdEIsbUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsRUFBK0MsTUFBL0MsR0FBd0QsSUFBeEQsR0FBK0QsUUFBL0QsR0FBMEUsS0FBMUU7QUFDQSxFQUZELE1BRU87QUFDTixtQkFBaUIsTUFBakIsQ0FBd0IsTUFBTSxLQUFLLE9BQUwsQ0FBYSxFQUEzQyxFQUErQyxLQUEvQztBQUNBO0FBQ0QsQ0FSZSxFQVFiO0FBQ0YsU0FBUTtBQUROLENBUmEsQ0FBaEI7O0FBWUM7QUFDRCxFQUFFLHNCQUFGLEVBQTBCLEtBQTFCLENBQWdDLFlBQVk7QUFDM0MsR0FBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixXQUFqQixDQUE2QixVQUE3QjtBQUNBLFlBQVcsWUFBWTtBQUN0QixXQUFTLFVBQVQ7QUFDQSxFQUZELEVBRUcsSUFGSDtBQUlBLENBTkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoganNoaW50IGRldmVsOnRydWUgKi9cblxuLyogbmF2aWdhdGlvbiAqL1xudmFyICRuYXZpZ2F0aW9uTGlua3MgPSAkKCcjcGFnZUhlYWRlciBuYXYgYScpO1xuJG5hdmlnYXRpb25MaW5rcy5jbGljayhmdW5jdGlvbiAoKSB7XG5cdCQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoICdzZWxlY3RlZCcgKVxuXHRcdC5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCAnc2VsZWN0ZWQnICk7XG59KTtcblxudmFyICR3YXlwb2ludCA9ICQoJ3NlY3Rpb24ud2F5cG9pbnQnKS53YXlwb2ludChmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG5cdC8vICQoJyMnICsgdGhpcy5lbGVtZW50LmlkKS5hZGRDbGFzcygnZm9vJyk7XG5cdC8vIGFsZXJ0KHRoaXMuZWxlbWVudC5pZCArICcgaGl0IDI1JSBmcm9tICcgKyBkaXJlY3Rpb24gKyAnIG9mIHdpbmRvdycpO1xuXHRpZiAoJ3VwJyA9PSBkaXJlY3Rpb24pIHtcblx0XHQkbmF2aWdhdGlvbkxpbmtzLmZpbHRlcignLicgKyB0aGlzLmVsZW1lbnQuaWQpLnBhcmVudCgpLnByZXYoKS5jaGlsZHJlbigpLmNsaWNrKCk7XG5cdH0gZWxzZSB7XG5cdFx0JG5hdmlnYXRpb25MaW5rcy5maWx0ZXIoJy4nICsgdGhpcy5lbGVtZW50LmlkKS5jbGljaygpO1xuXHR9XG59LCB7XG5cdG9mZnNldDogJzI1JSdcbn0pO1xuXG4gLyogd29yayAqL1xuJCgnI3dvcmsgYXJ0aWNsZSBoZWFkZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFdheXBvaW50LnJlZnJlc2hBbGwoKTtcblx0fSwgMTAwMCk7XG5cbn0pO1xuXG5cbiJdfQ==

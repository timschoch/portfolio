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

var waypoints = document.getElementsByClassName('waypoint');
for (var i = 0; i < waypoints.length; i++) {
	new Waypoint({
		element: waypoints[i],
		handler: function handler(direction) {
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
	    selected = $parent.hasClass('selected');

	// unselect item -> hide details
	if (selected) {
		$parent.removeClass('selected');
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

				$details.addClass('flash'); //.removeClass('flash');
			}
		}

	// make sure the waypoint refresh happens after the details are fully visible
	setTimeout(function () {
		Waypoint.refreshAll();
	}, 1000);

	return false;
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksbUJBQW1CLEVBQUUsb0JBQUYsQ0FBdkI7QUFBQSxJQUNDLG1CQUFtQixpQkFBaUIsSUFBakIsQ0FBc0IsR0FBdEIsQ0FEcEI7QUFBQSxJQUVDLGNBQWMsQ0FGZixDQUVrQjs7QUFFbEIsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFVLEtBQVYsRUFBaUI7QUFDbkMsS0FBSSxVQUFVLE1BQU0sTUFBTixFQUFkO0FBQ0E7QUFDQTtBQUNBLFNBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsTUFBeEIsRUFBZ0MsUUFBaEMsR0FBMkMsV0FBM0MsQ0FBdUQsTUFBdkQ7QUFDQSxTQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsUUFBN0IsR0FBd0MsV0FBeEMsQ0FBb0QsVUFBcEQ7QUFDQSxDQU5EOztBQVFBLGlCQUFpQixLQUFqQixDQUF1QixVQUFVLENBQVYsRUFBYTtBQUNuQyxHQUFFLGNBQUY7O0FBRUE7QUFDQSxLQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsRUFBYSxNQUFiLEdBQXNCLEdBQW5DO0FBQUEsS0FDQyxrQkFBa0IsRUFBRSxNQUFGLEVBQVUsU0FBVixFQURuQjtBQUFBLEtBRUMsV0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEdBQUwsQ0FBUyxTQUFTLGVBQWxCLENBQVgsQ0FGWjtBQUFBLEtBR0MsUUFBUSxLQUFLLElBQUwsQ0FBVSxXQUFXLElBQXJCLENBSFQ7QUFBQSxLQUlDLFFBQVEsV0FBVyxXQUFYLEdBQXlCLEtBSmxDOztBQU1BLEdBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUNmLGFBQVc7QUFESSxFQUF4QixFQUVHLEtBRkg7O0FBSUcsUUFBTyxLQUFQO0FBQ0gsQ0FmRDs7QUFpQkEsSUFBSSxZQUFZLFNBQVMsc0JBQVQsQ0FBZ0MsVUFBaEMsQ0FBaEI7QUFDQSxLQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUMxQyxLQUFJLFFBQUosQ0FBYTtBQUNaLFdBQVMsVUFBVSxDQUFWLENBREc7QUFFWixXQUFTLGlCQUFVLFNBQVYsRUFBcUI7QUFDN0IsT0FBSSxRQUFRLFNBQVosRUFBdUI7QUFDdEIsaUJBQWEsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsRUFBK0MsTUFBL0MsR0FBd0QsSUFBeEQsR0FBK0QsUUFBL0QsRUFBYjtBQUNBLElBRkQsTUFFTztBQUNOLGlCQUFhLGlCQUFpQixNQUFqQixDQUF3QixNQUFNLEtBQUssT0FBTCxDQUFhLEVBQTNDLENBQWI7QUFDQTtBQUNELEdBUlc7QUFTWixVQUFRO0FBVEksRUFBYjtBQVdBOztBQUVBO0FBQ0QsRUFBRSxzQkFBRixFQUEwQixLQUExQixDQUFnQyxVQUFVLENBQVYsRUFBYTtBQUM1QyxHQUFFLGNBQUY7O0FBRUEsS0FBSSxVQUFVLEVBQUUsSUFBRixFQUFRLE1BQVIsRUFBZDtBQUFBLEtBQ0MsV0FBVyxRQUFRLFFBQVIsQ0FBa0IsVUFBbEIsQ0FEWjs7QUFHQTtBQUNBLEtBQUksUUFBSixFQUFjO0FBQ2IsVUFBUSxXQUFSLENBQXFCLFVBQXJCO0FBQ0E7QUFDRDtBQUhBLE1BSUs7QUFDSixXQUFRLFFBQVIsQ0FBaUIsVUFBakI7QUFDQSxPQUFJLFdBQVcsUUFBUSxJQUFSLENBQWEsWUFBYixDQUFmO0FBQUEsT0FDQyxNQUFNLEtBQUssS0FBTCxDQUFXLFNBQVMsTUFBVCxHQUFrQixHQUE3QixDQURQO0FBQUEsT0FFQyxpQkFBaUIsRUFBRSxNQUFGLEVBQVUsTUFBVixFQUZsQjs7QUFJQSxZQUFTLFdBQVQsQ0FBcUIsT0FBckI7O0FBRUE7QUFDQSxPQUFJLE1BQU0saUJBQWlCLEdBQXZCLEdBQTZCLEVBQUUsTUFBRixFQUFVLFNBQVYsS0FBd0IsY0FBekQsRUFBeUU7QUFDeEUsTUFBRSxNQUFGLEVBQVUsT0FBVixDQUFrQjtBQUNqQixnQkFBVyxNQUFNLGlCQUFpQjtBQURqQixLQUFsQjs7QUFJQSxhQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkI7QUFDM0I7QUFDRDs7QUFFRDtBQUNBLFlBQVcsWUFBWTtBQUN0QixXQUFTLFVBQVQ7QUFDQSxFQUZELEVBRUcsSUFGSDs7QUFJQSxRQUFPLEtBQVA7QUFDQSxDQW5DRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgZGV2ZWw6dHJ1ZSAqL1xuXG4vKiBuYXZpZ2F0aW9uICovXG52YXIgJG5hdmlnYXRpb25JdGVtcyA9ICQoJyNwYWdlSGVhZGVyIG5hdiBsaScpLFxuXHQkbmF2aWdhdGlvbkxpbmtzID0gJG5hdmlnYXRpb25JdGVtcy5maW5kKCdhJyksXG5cdHNjcm9sbFNwZWVkID0gMjsgLy8gaG93IG1hbnkgcHggcGVyIG1pbGxpc2Vjb25kXG5cbnZhciBhY3RpdmF0ZUxpbmsgPSBmdW5jdGlvbiAoJGxpbmspIHtcblx0dmFyICRwYXJlbnQgPSAkbGluay5wYXJlbnQoKTtcblx0Ly8gc2V0IGNsYXNzZXNcblx0Ly8gJG5hdmlnYXRpb25JdGVtcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQgcHJldicpO1xuXHQkcGFyZW50LnByZXYoKS5hZGRDbGFzcygncHJldicpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3ByZXYnKTtcblx0JHBhcmVudC5hZGRDbGFzcygnc2VsZWN0ZWQnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xufVxuXG4kbmF2aWdhdGlvbkxpbmtzLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHQvLyBzY3JvbGxcblx0dmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKS5vZmZzZXQoKS50b3AsXG5cdFx0Y3VycmVudFBvc2l0aW9uID0gJCgnaHRtbCcpLnNjcm9sbFRvcCgpLFxuXHRcdGRpc3RhbmNlID0gTWF0aC5yb3VuZChNYXRoLmFicyh0YXJnZXQgLSBjdXJyZW50UG9zaXRpb24pKSxcblx0XHRib29zdCA9IE1hdGguY2VpbChkaXN0YW5jZSAvIDEwMDApLFxuXHRcdHNwZWVkID0gZGlzdGFuY2UgLyBzY3JvbGxTcGVlZCAvIGJvb3N0O1xuXG5cdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldFxuXHR9LCBzcGVlZCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59KTtcblxudmFyIHdheXBvaW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dheXBvaW50Jyk7XG5mb3IgKHZhciBpID0gMDsgaSA8IHdheXBvaW50cy5sZW5ndGg7IGkrKykge1xuXHRuZXcgV2F5cG9pbnQoe1xuXHRcdGVsZW1lbnQ6IHdheXBvaW50c1tpXSxcblx0XHRoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG5cdFx0XHRpZiAoJ3VwJyA9PSBkaXJlY3Rpb24pIHtcblx0XHRcdFx0YWN0aXZhdGVMaW5rKCRuYXZpZ2F0aW9uTGlua3MuZmlsdGVyKCcuJyArIHRoaXMuZWxlbWVudC5pZCkucGFyZW50KCkucHJldigpLmNoaWxkcmVuKCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWN0aXZhdGVMaW5rKCRuYXZpZ2F0aW9uTGlua3MuZmlsdGVyKCcuJyArIHRoaXMuZWxlbWVudC5pZCkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b2Zmc2V0OiAnMjUlJ1xuXHR9KTtcbn1cblxuIC8qIHdvcmsgKi9cbiQoJyN3b3JrIGFydGljbGUgaGVhZGVyJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKSxcblx0XHRzZWxlY3RlZCA9ICRwYXJlbnQuaGFzQ2xhc3MoICdzZWxlY3RlZCcgKTtcblxuXHQvLyB1bnNlbGVjdCBpdGVtIC0+IGhpZGUgZGV0YWlsc1xuXHRpZiAoc2VsZWN0ZWQpIHtcblx0XHQkcGFyZW50LnJlbW92ZUNsYXNzKCAnc2VsZWN0ZWQnICk7XG5cdH1cblx0Ly8gc2VsZWN0IGl0ZW0gLT4gc2hvdyBkZXRhaWxzXG5cdGVsc2Uge1xuXHRcdCRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdFx0dmFyICRkZXRhaWxzID0gJHBhcmVudC5maW5kKCc+IC5kZXRhaWxzJyksXG5cdFx0XHR0b3AgPSBNYXRoLnJvdW5kKCRkZXRhaWxzLm9mZnNldCgpLnRvcCksXG5cdFx0XHR2aWV3cG9ydEhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuXHRcdCRkZXRhaWxzLnJlbW92ZUNsYXNzKCdmbGFzaCcpO1xuXG5cdFx0Ly8gZGV0YWlscyBpcyBoaWRkZW4gYmVsb3cgZm9sZFxuXHRcdGlmICh0b3AgKyB2aWV3cG9ydEhlaWdodCAqIC4yNSA+ICQoJ2h0bWwnKS5zY3JvbGxUb3AoKSArIHZpZXdwb3J0SGVpZ2h0KSB7XG5cdFx0XHQkKCdodG1sJykuYW5pbWF0ZSh7XG5cdFx0XHRcdHNjcm9sbFRvcDogdG9wIC0gdmlld3BvcnRIZWlnaHQgKiAwLjVcblx0XHRcdH0pO1xuXG5cdFx0XHQkZGV0YWlscy5hZGRDbGFzcygnZmxhc2gnKTsvLy5yZW1vdmVDbGFzcygnZmxhc2gnKTtcblx0XHR9XG5cdH1cblxuXHQvLyBtYWtlIHN1cmUgdGhlIHdheXBvaW50IHJlZnJlc2ggaGFwcGVucyBhZnRlciB0aGUgZGV0YWlscyBhcmUgZnVsbHkgdmlzaWJsZVxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRXYXlwb2ludC5yZWZyZXNoQWxsKCk7XG5cdH0sIDEwMDApO1xuXG5cdHJldHVybiBmYWxzZTtcbn0pO1xuXG5cbiJdfQ==

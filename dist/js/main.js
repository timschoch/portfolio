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
$('#work article header').click(function () {
	$(this).parent().toggleClass('selected');
	setTimeout(function () {
		Waypoint.refreshAll();
	}, 1000);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLElBQUksbUJBQW1CLEVBQUUsb0JBQUYsQ0FBdkI7QUFBQSxJQUNDLG1CQUFtQixpQkFBaUIsSUFBakIsQ0FBc0IsR0FBdEIsQ0FEcEI7QUFBQSxJQUVDLGNBQWMsQ0FGZixDQUVrQjs7QUFFbEIsSUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFVLEtBQVYsRUFBaUI7QUFDbkMsS0FBSSxVQUFVLE1BQU0sTUFBTixFQUFkO0FBQ0E7QUFDQTtBQUNBLFNBQVEsSUFBUixHQUFlLFFBQWYsQ0FBd0IsTUFBeEIsRUFBZ0MsUUFBaEMsR0FBMkMsV0FBM0MsQ0FBdUQsTUFBdkQ7QUFDQSxTQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsUUFBN0IsR0FBd0MsV0FBeEMsQ0FBb0QsVUFBcEQ7QUFDQSxDQU5EOztBQVFBLGlCQUFpQixLQUFqQixDQUF1QixVQUFVLENBQVYsRUFBYTtBQUNuQyxHQUFFLGNBQUY7O0FBRUE7QUFDQSxLQUFJLFNBQVMsRUFBRSxLQUFLLElBQVAsRUFBYSxNQUFiLEdBQXNCLEdBQW5DO0FBQUEsS0FDQyxrQkFBa0IsRUFBRSxNQUFGLEVBQVUsU0FBVixFQURuQjtBQUFBLEtBRUMsV0FBVyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEdBQUwsQ0FBUyxTQUFTLGVBQWxCLENBQVgsQ0FGWjtBQUFBLEtBR0MsUUFBUSxLQUFLLElBQUwsQ0FBVSxXQUFXLElBQXJCLENBSFQ7QUFBQSxLQUlDLFFBQVEsV0FBVyxXQUFYLEdBQXlCLEtBSmxDOztBQU1BLEdBQUUsWUFBRixFQUFnQixPQUFoQixDQUF3QjtBQUNmLGFBQVc7QUFESSxFQUF4QixFQUVHLEtBRkg7O0FBSUcsUUFBTyxLQUFQO0FBQ0gsQ0FmRDs7QUFpQkEsSUFBSSxZQUFZLFNBQVMsc0JBQVQsQ0FBZ0MsVUFBaEMsQ0FBaEI7QUFDQSxLQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUMxQyxLQUFJLFFBQUosQ0FBYTtBQUNaLFdBQVMsVUFBVSxDQUFWLENBREc7QUFFWixXQUFTLGlCQUFVLFNBQVYsRUFBcUI7QUFDN0IsT0FBSSxRQUFRLFNBQVosRUFBdUI7QUFDdEIsaUJBQWEsaUJBQWlCLE1BQWpCLENBQXdCLE1BQU0sS0FBSyxPQUFMLENBQWEsRUFBM0MsRUFBK0MsTUFBL0MsR0FBd0QsSUFBeEQsR0FBK0QsUUFBL0QsRUFBYjtBQUNBLElBRkQsTUFFTztBQUNOLGlCQUFhLGlCQUFpQixNQUFqQixDQUF3QixNQUFNLEtBQUssT0FBTCxDQUFhLEVBQTNDLENBQWI7QUFDQTtBQUNELEdBUlc7QUFTWixVQUFRO0FBVEksRUFBYjtBQVdBOztBQUVBO0FBQ0QsRUFBRSxzQkFBRixFQUEwQixLQUExQixDQUFnQyxZQUFZO0FBQzNDLEdBQUUsSUFBRixFQUFRLE1BQVIsR0FBaUIsV0FBakIsQ0FBNkIsVUFBN0I7QUFDQSxZQUFXLFlBQVk7QUFDdEIsV0FBUyxVQUFUO0FBQ0EsRUFGRCxFQUVHLElBRkg7QUFJQSxDQU5EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpzaGludCBkZXZlbDp0cnVlICovXG5cbi8qIG5hdmlnYXRpb24gKi9cbnZhciAkbmF2aWdhdGlvbkl0ZW1zID0gJCgnI3BhZ2VIZWFkZXIgbmF2IGxpJyksXG5cdCRuYXZpZ2F0aW9uTGlua3MgPSAkbmF2aWdhdGlvbkl0ZW1zLmZpbmQoJ2EnKSxcblx0c2Nyb2xsU3BlZWQgPSAyOyAvLyBob3cgbWFueSBweCBwZXIgbWlsbGlzZWNvbmRcblxudmFyIGFjdGl2YXRlTGluayA9IGZ1bmN0aW9uICgkbGluaykge1xuXHR2YXIgJHBhcmVudCA9ICRsaW5rLnBhcmVudCgpO1xuXHQvLyBzZXQgY2xhc3Nlc1xuXHQvLyAkbmF2aWdhdGlvbkl0ZW1zLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCBwcmV2Jyk7XG5cdCRwYXJlbnQucHJldigpLmFkZENsYXNzKCdwcmV2Jykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygncHJldicpO1xuXHQkcGFyZW50LmFkZENsYXNzKCdzZWxlY3RlZCcpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG59XG5cbiRuYXZpZ2F0aW9uTGlua3MuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdC8vIHNjcm9sbFxuXHR2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpLm9mZnNldCgpLnRvcCxcblx0XHRjdXJyZW50UG9zaXRpb24gPSAkKCdodG1sJykuc2Nyb2xsVG9wKCksXG5cdFx0ZGlzdGFuY2UgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHRhcmdldCAtIGN1cnJlbnRQb3NpdGlvbikpLFxuXHRcdGJvb3N0ID0gTWF0aC5jZWlsKGRpc3RhbmNlIC8gMTAwMCksXG5cdFx0c3BlZWQgPSBkaXN0YW5jZSAvIHNjcm9sbFNwZWVkIC8gYm9vc3Q7XG5cblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0XG5cdH0sIHNwZWVkKTtcblxuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG52YXIgd2F5cG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2F5cG9pbnQnKTtcbmZvciAodmFyIGkgPSAwOyBpIDwgd2F5cG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cdG5ldyBXYXlwb2ludCh7XG5cdFx0ZWxlbWVudDogd2F5cG9pbnRzW2ldLFxuXHRcdGhhbmRsZXI6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcblx0XHRcdGlmICgndXAnID09IGRpcmVjdGlvbikge1xuXHRcdFx0XHRhY3RpdmF0ZUxpbmsoJG5hdmlnYXRpb25MaW5rcy5maWx0ZXIoJy4nICsgdGhpcy5lbGVtZW50LmlkKS5wYXJlbnQoKS5wcmV2KCkuY2hpbGRyZW4oKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhY3RpdmF0ZUxpbmsoJG5hdmlnYXRpb25MaW5rcy5maWx0ZXIoJy4nICsgdGhpcy5lbGVtZW50LmlkKSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvZmZzZXQ6ICcyNSUnXG5cdH0pO1xufVxuXG4gLyogd29yayAqL1xuJCgnI3dvcmsgYXJ0aWNsZSBoZWFkZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFdheXBvaW50LnJlZnJlc2hBbGwoKTtcblx0fSwgMTAwMCk7XG5cbn0pO1xuXG5cbiJdfQ==

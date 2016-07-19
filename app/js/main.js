/* jshint devel:true */
console.log('Look at app/js/main.js');

 /* work */
jQuery('#work article header').click(function () {
	$(this).parent().toggleClass('selected');
});
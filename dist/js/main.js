!function e(t,r,o){function i(a,s){if(!r[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(n)return n(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var f=r[a]={exports:{}};t[a][0].call(f.exports,function(e){var r=t[a][1][e];return i(r?r:e)},f,f.exports,e,t,r,o)}return r[a].exports}for(var n="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,r){"use strict";var o=$("#pageHeader nav li"),i=o.find("a"),n=2,a=function(e){var t=e.parent();t.prev().addClass("prev").siblings().removeClass("prev"),t.addClass("selected").siblings().removeClass("selected")};i.click(function(e){e.preventDefault();var t=$(this.hash).offset().top,r=$("html").scrollTop(),o=Math.round(Math.abs(t-r)),i=Math.ceil(o/1e3),a=o/n/i;return $("html, body").animate({scrollTop:t},a),!1});for(var s=document.getElementsByClassName("waypoint"),l=0;l<s.length;l++)new Waypoint({element:s[l],handler:function(e){a("up"==e?i.filter("."+this.element.id).parent().prev().children():i.filter("."+this.element.id))},offset:"25%"});$("#work article header").click(function(e){e.preventDefault();var t=$(this).parent(),r=t.hasClass("selected");if(r)t.removeClass("selected");else{t.addClass("selected");var o=t.find("> .details"),i=Math.round(o.offset().top),n=$(window).height();o.removeClass("flash"),i+.25*n>$("html").scrollTop()+n&&($("html").animate({scrollTop:i-.5*n}),o.addClass("flash"))}return setTimeout(function(){Waypoint.refreshAll()},1e3),!1});var d,f=jQuery;f(document).ready(function(){void 0==f("#rev_slider_4_1").revolution?revslider_showDoubleJqueryError("#rev_slider_4_1"):d=f("#rev_slider_4_1").show().revolution({sliderType:"standard",jsFileLocation:"/js/vendor/revolution/js/",sliderLayout:"auto",dottedOverlay:"none",delay:1500,navigation:{onHoverStop:"off"},visibilityLevels:[1240,1024,778,480],gridwidth:600,gridheight:281,lazyType:"smart",shadow:0,spinner:"off",stopLoop:"off",stopAfterLoops:-1,stopAtSlide:-1,shuffle:"off",autoHeight:"on",disableProgressBar:"on",hideThumbsOnMobile:"off",hideSliderAtLimit:0,hideCaptionAtLimit:0,hideAllCaptionAtLilmit:0,debugMode:!1,fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}})}),jQuery("body").on("click",".ga-button",function(){var e=jQuery(this),t=e.attr("data-link")||e.attr("href");t||(t=e.attr("data-actions"),t&&(t=t[0].url),t||(t=e.attr("id"))),__gaTracker("send","event","outbound","click",t,{transport:"beacon"})})},{}]},{},[1]);
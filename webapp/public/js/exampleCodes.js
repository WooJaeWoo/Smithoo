/*
[Random Number Function]
function rand(min, max) {return Math.floor(Math.random() * (max - min) + min)}
*/

/*
[Detecting Browser]
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = false || !!document.documentMode; // At least IE6
*/

/*
[Transitionend Event Check]
(function (window) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  },
  elem = document.createElement('div');
 
  for(var t in transitions){
    if(typeof elem.style[t] !== 'undefined'){
      window.transitionEnd = transitions[t];
      break;
    }
  }
})(window);
*/

/*
[IE addEventListener Check]
if (window.addEventListener) {
		window.addEventListener("load", addAd);
	}
	else {
		window.attachEvent("onload", addAd);
	}
}
*/

/*
[a Tag Scroll Codes with jQuery]
$("a[href*=#]:not([href=#])").on("click", function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		var test = 1;
		if (target.length) {
			$("html, body").animate({
				scrollTop: target.offset().top
			}, 500).animate({
				scrollLeft: target.offset().left
			}, 500, function() {
				test++;
				console.log(test);
			});
			return false;
		}
	}
});
*/
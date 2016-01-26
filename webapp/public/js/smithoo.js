$(document).on("ready", function() {
	SMITHOO.init();
});


var SMITHOO = {
	init : function() {
		console.log("Welcome to Smithoo's blog!");
		$("#encryptButton").on("click", function() {
			console.log(CryptoJS.SHA3($("#password").val(), { outputLength: 256 }).toString());
		});
	}
}

/*
화면 이동 스크립트
$(function() {
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
	
	$("a[href='#test5']").trigger("click");
	window.setTimeout(function() {
		$("#cover").fadeOut(1000);
	}, 1000);
});
*/




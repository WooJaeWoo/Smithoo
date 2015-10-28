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



UI.Ssscroll = {};

UI.Ssscroll.init = function() {
	this.setHeights();
	this.sepScroller();
	$("html").css("overflow", "initial");
	$("main").css("overflow", "initial");
	$("body").css("overflow", "initial");
};

UI.Ssscroll.rand = function(start, end) {
	return Math.floor(Math.random() * ((end - start) + 1) + start);
};

UI.Ssscroll.setHeights = function() {
	$(".side").find("li").each(function(index, element) {
		var height = this.rand(300, 500) + "px"; 
		$(element).css({
			height: height,
			lineHeight: height
		});
	}.bind(this));
	
	$("#center").css("height", this.rand(1200, 1500) + "px");
};

UI.Ssscroll.sepScroller = function() {
	
	var centerHeight = $("#center").outerHeight();
	var moveHeight = centerHeight * (-1) + 500;
	
	$(window).on("scroll", function() {
		var mainTop = $("main").offset().top - $(window).scrollTop();
		
		var ratio;		
		if (mainTop <= 0 && mainTop > moveHeight) {
			ratio = (mainTop / moveHeight).toFixed(2);
		} else if (mainTop > 0) {
			ratio = 0;
		} else {
			ratio = 1;
		}
		$(".side").each(function(index, element){
			var d = (($(element).outerHeight() - centerHeight) * ratio).toFixed(2);
			$(element).css("transform", "translateY(-" + d + "px)");
		});
	});
};

UI.Ssscroll.destroy = function() {
	$(window).off("scroll");
	$("html").css("overflow", "hidden");
	$("main").css("overflow", "hidden");
	$("body").css("overflow", "hidden");
};



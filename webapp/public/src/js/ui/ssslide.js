UI.Ssslide = {};
UI.Ssslide.init = function() {
	$(".ssslide").find(".control").on("click", ".gogo", this.moveSSS.bind(this));
};

UI.Ssslide.moveSSS = function(event) {
	var direction = $(event.target).val();
	var baseWidth = this.getMinWidth();
	var aVelocity = this.getVelocities();

	function gogogo() {
		if (direction === "right") {
			$(".sss").each(function(idx, sss) {
				$(sss).css("left", (parseFloat($(sss).css("left")) - aVelocity[$(sss).attr("id")]) + "px");
			});
			if (parseFloat($("#sss1").css("left")) >= $(document).width() - baseWidth) {
				window.requestAnimationFrame(gogogo);
			}
		} else if (direction === "left") {
			$(".sss").each(function(idx, sss) {
				$(sss).css("left", (parseFloat($(sss).css("left")) + aVelocity[$(sss).attr("id")]) + "px");
			});
			if (parseFloat($("#sss1").css("left")) <= 0) {
				window.requestAnimationFrame(gogogo);
			}
		}
	}
	window.requestAnimationFrame(gogogo);
};

UI.Ssslide.getMinWidth = function() {
	var aWidth = [];
	$(".sss").each(function(idx, sss) {
		aWidth.push($(sss).data("width"));
	});
	return Math.min.apply(null, aWidth);
};

UI.Ssslide.getVelocities = function() {
	var baseWidth = this.getMinWidth();
	var aVelocity = {};
	var multiValue = 10;
	$(".sss").each(function(idx, sss) {
		aVelocity[$(sss).attr("id")] = ($(sss).data("width") / baseWidth) * multiValue;
	});
	return aVelocity;
};

UI.Ssslide.destroy = function() {
	$(".ssslide").find(".control").off();
};
function Ssspin(id, controller) {
	this.ssspin = $("#" + id);
	this.controller = $("#" + controller);
	
	this.init();
}

Ssspin.prototype = {
	init: function() {
		this.controller.on("input", function(event) {
			this.setVelocity($(event.target).val());
			
		}.bind(this));
	},
	setVelocity: function(vel) {
		var aSec;
		vel = Number(vel);
		if (vel > 0) {
			aSec = 11 - vel;
			this.ssspin.removeClass("cspin").addClass("spin");
		} else if (vel === 0) {
			aSec = 0;
			this.ssspin.removeClass("cspin spin");
		} else {
			aSec = 11 + vel;
			this.ssspin.removeClass("spin").addClass("cspin");
		}
		this.ssspin.css("animation-duration", aSec + "s");
	}
}

$(document).ready(function() {
	var ssspin1 = new Ssspin("ssspin1", "velocity1");
	var ssspin2 = new Ssspin("ssspin2", "velocity2");
});
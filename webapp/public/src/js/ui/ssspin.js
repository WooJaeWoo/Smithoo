UI.Ssspin = {};
UI.Ssspin.init = function() {
	this.ssspin1 = new Ssspin("ssspin1", "velocity1");
	this.ssspin2 = new Ssspin("ssspin2", "velocity2");
};

UI.Ssspin.destroy = function() {
	this.ssspin1 = null;
	this.ssspin2 = null;
};

var raf = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(f) { return setTimeout(f, 1000/60); }; // roughly 60 frames per second;

function Ssspin(id, controller) {
	this.ssspin = $("#" + id);
	this.controller = $("#" + controller);
	
	this.start = null;
	this.angle = 0;
	this.velocity = 0;
	this.angularVelocity = 0;
	this.isSpinning = false;
	
	this.init();
}

Ssspin.prototype = {
	init: function() {
		this.controller.on("input change", function(event) {
			this.setVelocity($(event.target).val());
		}.bind(this));
		
		this.animateSpin();
	},
	setVelocity: function(vel) {
		vel = Number(vel);
		if (vel) {
			this.isSpinning = true;
		} else { // vel === 0
			this.isSpinning = false;
		}
		this.velocity = vel;
	},
	setAngle: function(elapsed) {
		var id = this.ssspin.attr("id");
		if (id === "ssspin1") {
			this.angle += this.velocity / 2;
		} else if (id === "ssspin2") {
			this.angle = 180 * Math.sin(this.velocity * elapsed / 4000);
		}
		
	},
	animateSpin: function() {
		var startTime;
		function tick(timestamp) {
			if (!startTime) {
				startTime = timestamp;
			}
			var elapsed = timestamp - startTime;
			this.setAngle(elapsed);
						
			if (this.isSpinning) {
				this.ssspin.css({ transform: "rotate(" + this.angle + "deg)"});
			}
			raf(tick.bind(this));
		}
		
		raf(tick.bind(this));
	}
};
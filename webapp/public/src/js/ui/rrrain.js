UI.Rrrain = {};
UI.Rrrain.init = function() {
	rainDrop();
	setInterval(waterSpotted, 200);
};

UI.Rrrain.destroy = function() {
	
};

function randRange(minNum, maxNum) {
	return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}
var displayWidth = $(window).innerWidth();
var displayHeight = $(window).innerHeight();

function Drop() {
	this.lef;
	this.delay;
	this.element;
	this.init();
}
Drop.prototype = {
	init: function() {
		this.left = randRange(10, displayWidth - 10) + "px";
		this.delay = (randRange(0, 3000) / 1000) + "s";
		this.element = this.makeDrop();
	},
	makeDrop: function() {
		var drop = $(document.createElement("div"));
		drop.addClass("drop").css({
			left: this.left,
			animationDelay: this.delay
		});
		return drop;
	},
	appendDrop: function() {
		$("#sky").append(this.element);
	}
};

function WaterSpot() {
	this.element;
	this.top;
	this.left;
	this.angle;
	this.duration;
	this.imgNum;
	
	this.init();
}
WaterSpot.prototype = {
	init: function() {
		this.top = randRange(30, displayHeight - 30);
		this.left = randRange(30, displayWidth - 30);
		this.angle = randRange(0, 360);
		this.duration = randRange(2500, 3500);
		this.imgNum = randRange(1, 5);
		this.element = this.makeSpot();
	},
	makeSpot: function() {
		var spot = $(document.createElement("div"));

		spot.addClass("spot spot" + this.imgNum).css({
			top: this.top + "px",
			left: this.left + "px",
			transform: "rotate(" + this.angle + "deg)"
		});
		
		return spot;
	},
	appendSpot: function() {
		$("#sky").append(this.element);
		this.fadeOutAfterDuration();
	},
	fadeOutAfterDuration: function() {
		setTimeout(function() {
			this.element.fadeOut(1500, this.element.remove);
		}.bind(this), this.duration);
	}
};


function rainDrop() {
	var nDrops = 150;
	
	for (var i = 0; i < nDrops; i++) {
		var drop = new Drop();
		drop.appendDrop();
	}
}

function waterSpotted() {
	var spot = new WaterSpot();
	spot.appendSpot();
}
function Ssspin(id) {
	this.img = $("#" + id);
	this.velocity = 0;
}

Ssspin.prototype = {
	init: function() {
		
	}
}

$(document).ready(function() {
	var ssspin1 = new Ssspin("ssspin1");
	var ssspin2 = new Ssspin("ssspin2");
});
var UI = UI || {};

var UIManager = {
	changeUI: function(ui) {
		this.changeTitle(ui);
		this.changeMain(ui);
	},
	changeTitle: function(ui) {
		$("nav").find("h1").text(ui);
		
	},
	changeMain: function(newUI) {
		var main = $("main");
		var prevUI = main.data("show");
		if (UI[newUI]) {
			if (UI[prevUI]) {
				UI[prevUI].destroy();
			}
			
			main.fadeOut("slow", function() {
				
				main.empty();
				
				var contents = this.makeTemplate(newUI);
				main.append(contents).fadeIn("slow");
				
				UI[newUI].init();
			}.bind(this));
		}
		main.data("show", newUI);
	},
	makeTemplate: function(ui) {
		var source = $("#" + ui + "Template").html();
		var template = Handlebars.compile(source);
		return template();
	}
};




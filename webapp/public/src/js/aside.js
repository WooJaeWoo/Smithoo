var Aside = {
    init: function() {
        $("aside").on("mouseenter", "li", this.flipBack.bind(this));
        $("aside").on("mouseleave", "li", this.flipFront.bind(this));
		$("aside").on("click", "li", this.changePage.bind(this));
    },
    flipBack: function(event) {
        var flipper = $(event.currentTarget).find(".flipper");
        flipper.addClass("hover");
    },
    flipFront: function(event) {
        var flipper = $(event.currentTarget).find(".flipper");
        flipper.removeClass("hover");
    },
	changePage: function(event) {
		var ui = $(event.currentTarget).data("ui");
		if ($("main").data("show") !== ui) {
			UIManager.changeUI(ui);
		}
	}
};
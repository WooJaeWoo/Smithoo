var Aside = {
    init: function() {
        $("aside").on("mouseenter", "li", this.flipBack.bind(this));
        $("aside").on("mouseleave", "li", this.flipFront.bind(this));
    },
    flipBack: function(event) {
        var flipper = $(event.currentTarget).find(".flipper");
        flipper.addClass("hover");
    },
    flipFront: function(event) {
        var flipper = $(event.currentTarget).find(".flipper");
        flipper.removeClass("hover");
    }
};
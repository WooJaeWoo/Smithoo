$(document).on("ready", function() {
	LOGIN.init();
});


var LOGIN = {
	init : function() {
		console.log("Welcome to Smithoo's blog!");
		$(".encryptButton").on("click", this.login.bind(this));
	},
	login : function(event) {
		var who = $(event.target).data("who");
		var encryptedPW = this.encryptPW(who);
	},
	checkLoginAjax : function() {
		
	},
	encryptPW : function(who) {
		return CryptoJS.SHA3($("#password" + who).val(), { outputLength: 256 }).toString();
	}
}
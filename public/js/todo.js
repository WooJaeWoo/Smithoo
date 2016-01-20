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
		this.checkLoginAjax(encryptedPW);
	},
	checkLoginAjax : function(pw) {
		$.ajax({
			type: "POST",
			url: "/todo/login",
			data: { "pw" : pw },
			dataType: "json",
			success : function(data) {
				console.log(data);
			},
			error : function(err) {
				console.log(err);
			}
		});
	},
	encryptPW : function(who) {
		return CryptoJS.SHA3($("#pw" + who).val(), { outputLength: 256 }).toString();
	}
}
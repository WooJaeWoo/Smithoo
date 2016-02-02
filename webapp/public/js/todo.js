$(document).on("ready", function() {
	LOGIN.init();
});


var LOGIN = {
	init : function() {
		console.log("Welcome to Smithoo's blog!");
		$(".encryptButton").on("click", this.login.bind(this));
	},
	login : function(event) {
		var name = $(event.target).data("who");
		var encryptedPW = this.encryptPW(name);
		console.log(encryptedPW);
		this.checkLoginAjax(name, encryptedPW);
	},
	checkLoginAjax : function(name, pw) {
		$.ajax({
			type: "POST",
			url: "/todo/login",
			data: { "name": name, "password" : pw },
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

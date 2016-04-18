$(document).on("ready", function() {
	console.log("Welcome to Smithoo's blog!");
	var page = UTIL.getCurrentPage();
	if (page === "loginPage") {
		console.log("Login Page");
		LOGIN.init();
	} else if (page === "signupPage") {
		console.log("Sign up Page");
	}
});

var UTIL = {
	getCurrentPage : function() {
		return $("main").attr("id");
	},
	encryptSHA3 : function(word) {
		return CryptoJS.SHA3(word, { outputLength: 256 }).toString();
	},
	isMobile : function() {
		
	}
};

var LOGIN = {
	init : function() {
		$(".encryptButton").on("click", this.login.bind(this));
	},
	login : function(event) {
		var name = $(event.target).data("who");
		var encryptedPW = UTIL.encryptSHA3($("#pw" + name).val());
		console.log(encryptedPW);
		//this.checkLoginAjax(name, encryptedPW);
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
	}
};

var SIGNUP = {
	init : function() {
		$(".encryptButton").on("click", this.signup.bind(this));
	},
	signup : function(event) {
		
	}
};

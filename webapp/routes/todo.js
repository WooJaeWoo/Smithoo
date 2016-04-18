var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get("/", isLoggedIn, function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/todo/todo");
});

router.get("/signup", function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/todo/signup");
});

router.post("/signup", function(req, res, next) {

	//res.render(config.root.VIEW_ROOT + "/todo/signup");
});

router.get("/login", function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/todo/login");
});

router.post("/login", passport.authenticate('todo', { failureRedirect: '/todo/todoError' }) , function(req, res, next) {
	res.redirect('/todo');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/todo/login");
}

function tryAuth(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		console.log(err);
		console.log(user);
		console.log(info);
	});

}

module.exports = router;

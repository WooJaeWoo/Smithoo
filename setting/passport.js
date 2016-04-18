var LocalStrategy = require('passport-local').Strategy;
var User = require(config.root.MODEL_ROOT).user;

module.exports = function(passport) {
	
	passport.use("todo", new LocalStrategy ({
			usernameField: "name",
			passwordField: "password",
			session: true
		},
		function (username, password, done) {
			User.findOne({ username: username }, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (!user.verifyPassword(password)) { return done(null, false); }
				return done(null, user);
			});
		}
	));

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

};

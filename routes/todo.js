var express = require('express');
var router = express.Router();
var TodoUser = require('./../models/todoUser.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(name, pw, done) {
		TodoUser.findOne({ name: name }, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (!user.verifyPassword(pw)) { return done(null, false); }
			return done(null, user);
		});
	}
));

var todoTitle = "우리 이거 하자!"

/* GET todo login page. */
router.get('/login', function(req, res, next) {
	res.render('todo/todoLogin', { title: todoTitle});
});

/* POST todo login page. */
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		var error = err || info;
		if (error) return res.json(401, error);
		if (!user) return res.json(404, {message: "WRONG!"});
		
		res.send({"login": "ok"});
	})(req, res, next);
});

/*
router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/loginSuccess',
		failureRedirect: '/loginFailure'
	})
);

router.get('/loginFailure', function(req, res, next) {
	res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
	res.send('Successfully authenticated');
});
*/

/* GET todo page */
router.get('/', function(req, res, next) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	
	res.render('todo/todo', { title: todoTitle });
});

/* POST todo */
router.post('/', function(req, res, next) {
	res.render('todo/todo', { title: todoTitle });
});


module.exports = router;
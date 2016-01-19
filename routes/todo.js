var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

/* GET todo login page. */
router.get('/login', function(req, res, next) {
	res.render('todo/todo', { title: 'hello'});
});

/* GET todo login page. */
router.post('/login', function(req, res, next) {
	
	res.render('todo/todo', { title: 'Todo' });
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
}); */

/* GET todo page */
router.get('/', function(req, res, next) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	
	res.render('todo/todo', { title: 'Todo' });
});

/* POST todo */
router.post('/', function(req, res, next) {
	res.render('todo/todo', { title: 'Todo' });
});


module.exports = router;
var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var todoTitle = "우리 이거 하자!"

/* GET todo login page. */
router.get('/login', function(req, res, next) {
	res.render('todo/todoLogin', { title: todoTitle});
});

/* POST todo login page. */
router.post('/login', function(req, res, next) {
	console.log(req.body.pw);
	res.send({"login": "ok"});
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
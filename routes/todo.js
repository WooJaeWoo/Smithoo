var express = require('express');
var router = express.Router();


/* GET todo login page. */
router.get('/login', function(req, res, next) {
	res.render('todo/todo', { title: 'hello'});
});

/* GET todo login page. */
router.post('/login', function(req, res, next) {
	
	res.render('todo/todo', { title: 'Todo' });
});

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
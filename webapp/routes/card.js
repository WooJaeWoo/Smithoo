var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/card/card");
});

router.get("/jimin", function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/card/jimin");
});

module.exports = router;

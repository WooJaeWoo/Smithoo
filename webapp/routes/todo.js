var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
	res.render(config.root.VIEW_ROOT + "/todo/todo");
});

module.exports = router;

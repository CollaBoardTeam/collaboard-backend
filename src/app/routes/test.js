var express = require('express');
var router = express.Router();

// Get HOME page
router.get('/', function (req, res, next) {
    res.json('hello world 2');
});

module.exports = router;
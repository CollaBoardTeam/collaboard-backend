var express = require('express');
var router = express.Router();
var path = require('path');

// Get HOME page
router.get('/', function (req, res, next) {
    res.json('hello world');
    next();
});

router.get('/socket', function (req, res, next) {
    res.sendFile(path.resolve('src/app/html/index.html'));
});

module.exports = router;
/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');

// Get HOME page
router.get('/', function (req, res, next) { //http://localhost:3000/
    res.sendFile(path.resolve('src/app/html/rooms.html'));
});

router.get('/socket', function (req, res, next) { //http://localhost:3000/socket
    res.sendFile(path.resolve('src/app/html/index.html'));
});

module.exports = router;
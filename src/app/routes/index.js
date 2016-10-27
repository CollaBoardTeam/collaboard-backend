/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');

// Get HOME page
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/app/html/rooms.html'));
});

module.exports = router;
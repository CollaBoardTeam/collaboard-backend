/**
 * Module dependecies
 */
var wrapper = require('../../../dal/repository/wrapper');

function PublicController() {
}

/**
 * Get whiteboard content given its ID
 * @param req - request from express
 * @param res - response from express
 */
PublicController.prototype.getWhiteboardContent = function (req, res) {
    var result = wrapper.getWhiteboardContent(req.params.wbID, function (err, data) {
            if (err) {
                res.json({ error: true, message: err });
            } else {
                if (data.length !== 0) {
                    var response = JSON.parse(data[0].result);
                    res.json({ error: false, message: response });
                } else {
                    res.json({ error: false, message: data });
                }
            }
        });
}

/**
 * Get a list of users' whiteboards given their ID
 * @param req - request from express
 * @param res - response from express
 */
PublicController.prototype.getWhiteboardsByUser = function (req, res) {
    var result = wrapper.getWhiteboardsByUser(req.params.userID, function (err, data) {
        if (err) {
            res.json({ error: true, message: err });
        } else {
            res.json({ error: false, message: data });
        }
    });
}

/**
 * Get a list of colors
 * @param req - request from express
 * @param res - response from express
 */
PublicController.prototype.getColors = function (req, res) {
    var result = wrapper.getColors(function (err, data) {
        if (err) {
            res.json({ error: true, message: err });
        } else {
            res.json({ error: false, message: data });
        }
    });
}

/**
 * Exporting object
 */
module.exports = new PublicController();
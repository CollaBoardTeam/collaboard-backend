/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function LayoutController() {
}

LayoutController.prototype.createLayoutWhiteboard = function (req, res) {
    var result = wrapper.createLayoutWhiteboard(req.body, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

LayoutController.prototype.getLayouts = function (req, res) {
    var result = wrapper.getLayouts(function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

LayoutController.prototype.getLayoutsById = function (req, res) {
    var result = wrapper.getLayoutById(req.params, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

/**
 * Exporting object
 */
module.exports = new LayoutController();
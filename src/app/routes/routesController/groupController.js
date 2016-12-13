/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function GroupController() {
}

GroupController.prototype.addGroupToWhiteboard = function (req, res) {
    var result = wrapper.addGroupToWhiteboard(req.body, function(err, data){
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

GroupController.prototype.editGroupName = function (req, res) {
    var result = wrapper.editGroupName(req.body, function(err, data){
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

GroupController.prototype.deleteGroup = function (req, res) {
    var result = wrapper.deleteGroup(req.params, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Group deleted!'
            });
        }
    });
}

/**
 * Exporting object
 */
module.exports = new GroupController();
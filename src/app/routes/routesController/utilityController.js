/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function UtilityController() {
}

UtilityController.prototype.getColors = function (req, res) {
    var result = wrapper.getColors(function (err, data){
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
module.exports = new UtilityController();
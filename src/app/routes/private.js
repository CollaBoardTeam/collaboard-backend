/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));


//Create whiteboard with name
router.post('/create-wb', function (req, res, next) { 
    var result = wrapper.createWhiteboard(req.body, function(err, data){
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
});

//Create sticky note
router.post('/create-st', function (req, res, next) { 
    var result = wrapper.createStickyNote(req.body, function(err, data){
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
});



//Edit sticky note
router.put('/edit-st', function (req, res, next) { 
    var result = wrapper.editStickyNote(req.body, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } 
        else {
            res.json({
                error: false,
                message: data
            });
        }
    });
});

//Delete sticky note
router.delete('/delete-st/:stickyID', function (req, res, next) { 
    var result = wrapper.deleteStickyNote(req.params.stickyID, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Sticky Note deleted!'
            });
        }
    });
});

//Edit sticky note color
router.put('/edit-st-color', function (req, res, next) { 
    var result = wrapper.editStickyNoteColor(req.body, function(err, data){
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
});

//Delete whiteboard
router.delete('/delete-wb/:wbid/:userid', function (req, res, next) { 
    var result = wrapper.deleteWhiteboard(req, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Whiteboard deleted!'
            });
        }
    });
});

//Add new group to whiteboard
router.post('/add-group-wb', function (req, res, next) { 
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
});

//Add new group to whiteboard
router.put('/change-wb-name', function (req, res, next) { 
    var result = wrapper.editWhiteboardName(req.body, function(err, data){
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
});

//Add new group to whiteboard
router.put('/change-group-name', function (req, res, next) { 
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
});


//Delete sticky note
router.delete('/delete-group/:groupid', function (req, res, next) { 
    var result = wrapper.deleteGroup(req.params.groupid, function(err, data){
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
});

//Add sticky to a group
router.put('/add-sticky-toGroup', function (req, res, next) { 
    var result = wrapper.addStickyToGroup(req.body, function(err, data){
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
});

//Change wb's state
router.put('/change-wb-state', function (req, res, next) { 
    var result = wrapper.changeStateWhiteboard(req.body, function(err, data){
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
});

//Set an existing layout to whiteboard
router.put('/set-wb-layout', function (req, res, next) { 
    var result = wrapper.setWhiteboardLayout(req.body, function(err, data){
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
});

//Create a new layout to a whiteboard
router.post('/create-wb-layout', function (req, res, next) { 
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
});

// Create a user
// Not completed
router.post('/create-user', function (req, res, next) {
    var result = wrapper.createUser(req.body, function (err, data) {
        if (err) {
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
});

// Invite user to whiteboard
// Not compeleted
router.post('/inv-user', function (req, res, next) {
    var result = wrapper.inviteUserToWhiteboard(req.body, function (err, data) {
        if (err) {
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
});

// Remove user from whiteboard
// Not compeleted
router.delete('/rem-user-wb/:userid/:wbid', function (req, res, next) {
    console.log('private');
    var result = wrapper.removeUserFromWhiteboard(req.params, function (err, data) {
        if (err) {
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
});

// Check invitations
router.get('/check-inv/:userid', function (req, res, next) {
    var result = wrapper.checkInvitations(req.params, function (err, data) {
        if (err) {
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
});

// Accept invitation
router.post('/accept-inv/', function (req, res, next) {
    var result = wrapper.acceptInvitation(req.body, function (err, data) {
        if (err) {
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
});

// Decline invitation
// Not compeleted
router.delete('/decline-inv/:invid', function (req, res, next) {
    var result = wrapper.declineInvitation(req.params, function (err, data) {
        if (err) {
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
});


// Get Whiteboard's Users
router.get('/get-wb-users/:wbid', function (req, res, next) {
    var result = wrapper.getWhiteboardUsers(req.params, function (err, data) {
        if (err) {
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
});

// Remove user from whiteboard
router.delete('/remove-user-wb/:wbid/:userid', function (req, res, next) {
    var result = wrapper.removeUserFromWhiteboard(req.params, function (err, data) {
        if (err) {
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
});

// Get layout by id
router.get('/get-layout/:layoutid', function (req, res, next) {
    var result = wrapper.getLayoutById(req.params, function (err, data) {
        if (err) {
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
});


module.exports = router;
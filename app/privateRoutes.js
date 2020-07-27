var express = require('express');
const storyManager = require("../database/storiesManager");
const usersManager = require("../database/usersManager");
const commentsManager = require("../database/commentsManager");
const readingListsManager = require("../database/readingListsManager")

module.exports = (passport, router) => {

    router.use(function checkIfAdmin(req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if(user.status === 'admin') {
                next();
            } else {
                res.status(500).send("AccessDenied");
                console.log("err", err)
            }
        })(req, res, next)
    });

    router.get('/getAdminPage', (req, res) => {
        console.log('Admin route works');
        usersManager.getUsers(res);
    });

    router.post('/changeUserStatus', (req, res) => {
        console.log('CHANGING his',  req.body.userId, 'status -', req.body.newStatus )
        usersManager.updateUser(res, req.body.userId, 'status', req.body.newStatus);
    })

    router.post('/deleteuser', (req, res) => {
        usersManager.deleteUser(res, req.body.userId);
    })
    
    return router;
}


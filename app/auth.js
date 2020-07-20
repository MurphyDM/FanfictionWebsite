var express = require('express');
const storyManager = require("../config/storiesTable/storyManager")

module.exports = (passport, router) => {
    router.use(function checkAuth(req, res, next) {
        console.log('jwt middle: ', req.header, req.body)
        passport.authenticate('jwt', function (err, user) {
            if (user) {
                console.log("hello" + user.name)
                next();
            } else {
                res.status(500).send("No such user");
                console.log("err", err)
            }
        })(req, res, next)
    });

    router.get('/getUser', (req, res) => {
        passport.authenticate('jwt', function (err, user) {
                res.json(user);
        })(req, res)   
    });

    router.post('/uploadStory', (req, res) => {
        console.log("Your request: ", req.body);
        storyManager.uploadStory(req.body.image, req.body.title, req.body.body, req.body.genre, req.body.userId);
        res.send("Story was uploaded successfully!")

    });
    return router;
}


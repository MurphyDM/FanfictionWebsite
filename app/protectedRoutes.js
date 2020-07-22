var express = require('express');
const storyManager = require("../config/storiesTable/storyManager");
const cloudinary = require("../cloudinary/cloudinary");

module.exports = (passport, router) => {

    router.use(function checkAuth(req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (user) {
                console.log("hello" + user.name);
                req.header = user.id;
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

    router.get('/getUserStories', (req, res) => {
        console.log("/getUserStories route works:");
        console.log("User id #: ", req.header);
        return storyManager.getStoriesWhere(res, "userId", parseInt(req.header) );

    });

    router.post('/uploadStory', (req, res) => {
        console.log("User id #: ", req.header);
        storyManager.uploadStory(res, req.body.image, req.body.title, req.body.description, req.body.body, req.body.genre, req.header);
    });

    router.post('/uploadImage', async (req, res) => {
        try {
            const fileStr = req.body.image;
            console.log(fileStr)
            const uploadResponse = await cloudinary.cloudinary.uploader.upload(fileStr);
            console.log(uploadResponse);
            storyManager.updateStory(req.body.story, 'image', uploadResponse.url)
            res.json({ msg: 'yaya' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    });


    return router;
}


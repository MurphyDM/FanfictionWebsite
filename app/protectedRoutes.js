var express = require('express');
const storyManager = require("../database/storyManager");
const usersManager = require("../database/usersManager");
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

                res.json({
                    id: user.id,
                    name: user.name,
                    status: user.status,
                    avatar: user.avatar
                });
        })(req, res)   
    });

    router.get('/getUserStories', (req, res) => {
        console.log("/getUserStories route works:");
        console.log("User id #: ", req.header);
        return storyManager.getStoriesWhere(res, "userId", parseInt(req.header) );

    });

    router.post('/uploadStory', (req, res) => {
        console.log("User id #: ", req.header);
        console.log("User id #: ", req.body);
        storyManager.uploadStory(res, req.body.image, req.body.title, req.body.description, req.body.body, req.body.genre, req.header);
    });

    /*router.post('/uploadFile', (req, res) => {
        console.log("Request!: ", req.body, 'header', req.headers.storyid);
        storyManager.uploadFile(res, req.body, req.headers.storyid)
    });*/

    router.post('/uploadCover', async (req, res) => {
        try {
            const fileStr = req.body.image;
            console.log(fileStr)
            const uploadResponse = await cloudinary.cloudinary.uploader.upload(fileStr);
            console.log(uploadResponse);
            storyManager.updateStory(res, req.body.story, 'image', uploadResponse.url)
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    });

    router.post('/uploadAvatar', async (req, res) => {
        try {
            const fileStr = req.body.image;
            console.log(fileStr)
            const uploadResponse = await cloudinary.cloudinary.uploader.upload(fileStr);
            console.log(uploadResponse);
            usersManager.updateUser(res, req.header, 'avatar', uploadResponse.url)
            res.json({ msg: 'yaya' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    });

    router.post('/changeUsername', async (req, res) => {
        console.log('New username: ', req.body.newName);
        usersManager.updateUser(res, req.header, 'name', req.body.newName)
    });


    return router;
}


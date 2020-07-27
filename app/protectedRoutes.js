var express = require('express');
const storyManager = require("../database/storiesManager");
const usersManager = require("../database/usersManager");
const commentsManager = require("../database/commentsManager");
const readingListsManager = require("../database/readingListsManager")
const cloudinary = require("../cloudinary/cloudinary");

module.exports = (passport, router) => {

    router.use(function checkAuth(req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (user) {
                console.log("hello" + user.name + 'your status is' + user.status);
                if(user.status === 'inactive') res.send('You need to confirm your email!');
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
        usersManager.updateUser(res, req.header, 'name', req.body.newName);
    });

    router.post('/addComment', async (req, res) => {
        console.log('/addComment', req.body);
        commentsManager.addComment(res, req.header, req.body.storyId, req.body.commentBody);
    });

    router.post('/deleteComment', async (req, res) => {
        console.log('/deleteComment', req.body);
        commentsManager.deleteComment(res, req.header, req.body.commentId);
    });

    router.post('/addToReadingList', async (req, res) => {
        console.log('/addToReadingList', req.body);
        readingListsManager.addToReadingList(res, req.header, req.body.storyId)
    });

    router.post('/deleteFromReadingList', async (req, res) => {
        console.log('/deleteFromReadingList', req.body);
        readingListsManager.deleteFromReadingList(res, req.header, req.body.storyId)
    });

    router.get('/getReadingList', async (req, res) => {
        console.log('/getReadingList', req.query);
        readingListsManager.getReadingList(res, req.header)
    });

    var admin = require('./privateRoutes')(passport, router);
    router.use('/admin', admin);
    
    return router;
}


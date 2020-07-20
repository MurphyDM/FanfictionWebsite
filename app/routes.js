const jwtsecret = "mysecretkey"; // signing key for JWT
const jwt = require('jsonwebtoken'); // auth via JWT for hhtp
const storyManager = require("../config/storiesTable/storyManager")

module.exports = function (app, router, passport) {

    app.post('/signup', (req, res) => {
        passport.authenticate('custom-signup', function (err, user, info) {
            if (err) {
                return res.status(500).json({
                    message: "Oops, smth wrong happened.",
                    error: err.message || 'Inter server error'
                });
            }
            if (! user) 
                return res.status(500).send(info);
            

            req.logIn(user, function (err) {
                if (err) {
                    return res.json({
                        message: "Oops, smth wrong happened.",
                        error: err.message || 'Inter server error'
                    });
                }
                return res.json({message: 'User is authenticated'});
            });

        })(req, res);

    });

    app.post('/signin', (req, res) => {
        console.log("request data: ", req.body)
        passport.authenticate('local-signin', function (err, user, info) {
            console.log("user:::", user)
            if (user == false) {
                res.send("Login1 failed");
            } else { // --payload - информация которую мы храним в токене и можем из него получать
                const payload = {
                    id: user.id,
                    username: user.name,
                    email: user.email
                };
                const token = jwt.sign(payload, jwtsecret); // здесь создается JWT
                console.log("token----->", token);

                res.json({"token": token});
            }
        })(req, res);
    });

    app.post('/login', passport.authenticate('local-signin'), function (req, res) {
        if (! req.user) {
            return res.status(500).json({
                message: "Oops, smth wrong happened.",
                error: err.message || 'Inter server error'
            });
        }
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        return res.status(200).json({message: 'User is logged in'});
    });

    app.get('/signout', function (req, res) {
        console.log('***USER:', req.user, req.session, req.sessionID)
        req.logout();

        console.log('USER***:', req.user, req.session, req.sessionID)
        res.send('user is signed out');
    });

    app.get('/getStories', (req, res) => {
        console.log("/getStories route works:", req.query);
        if(req.query.key) return storyManager.getStoriesWhere(res, req.query.page||0, req.query.key, req.query.quantity||null);
        
        return storyManager.getStories(res, req.query.page||0,  req.query.quantity||null);

    });

    app.get('/getStoriesWhere', (req, res) => {
        console.log("/getStories route works:", req.query.page||0, req.query.key, req.query.quantity||null);

        return storyManager.getStoriesWhere(res, req.query.page||0, req.query.key, req.query.quantity||null);

    });
    app.get('/getSortedStories', (req, res) => {
        console.log("/getStories route works:", req.query.page, req.query.order);

        return storyManager.getStories(res, req.query.page, req.query.order, req.query.quantity||null);

    });

    app.post('/photo', (req, res) => {
        const fs = require('fs');
        let a = req.body.image;
        let m = a.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        let b = Buffer.from(m[2], 'base64');
        fs.writeFile('./' + req.body.name, b, function (err) {
            if (! err) {
                res.send(true);
            } else 
                res.send(err)
            
        });

    });


    var auth = require('./auth')(passport, router);
    app.use('/auth', auth);
};

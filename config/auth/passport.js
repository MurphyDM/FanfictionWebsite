var LocalStrategy = require('passport-local').Strategy;
var CustomStrategy = require('passport-custom').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // Auth via JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // Auth via JWT

const mailSendler = require('./email');

const date = require('../date');
const auth = require('./auth')
const db = require('../../database/dbConnector');
const User = db.User; //

const jwtsecret = "mysecretkey"; // signing key for JWT

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findAll({
            where: {
                id: id
            },
            raw: true
        }).then(users => {
            done(null, users[0]);
        }).catch(err => {
            done(err, null);
        });
    });

    passport.use('custom-signup', new CustomStrategy(function (req, done) {
        console.log('PASSPORT *SIGNUP* FUNCTION WORKS');

        const username = req.body.username,
            email = req.body.email,
            password = req.body.password;


        User.findAll({
            where: {
                email: email
            },
            raw: true
        }).then(users => {
            console.log('passport findAll method:', users);

            if (users.length) {
                return done(null, false, {
                    errors: {
                        'email': 'is already in use'
                    }
                });
            } else {
                const salt = auth.generateSalt();
                User.create({
                    name: username,
                    email: email,
                    password: password,
                    sign_up_date: date.getDateString(),
                    last_sign_in_date: date.getDateString(),
                    status: 'active' //u should create email
                }).then(res => {
                    const user = {
                        id: res.id,
                        name: res.name
                    };
                    console.log('New user was added into db:\n', user);
                    return done(null, user);
                })
            }
        }).catch(err => {
            console.log(err);
            return done(err);
        });
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        console.log('PASSPORT *SIGNIN FUNCTION WORKS')

        User.findAll({
            where: {
                email: email
            },
            raw: true
        }).then(users => {
            console.log('passport find all method:', users);
            if (!users.length) {
                return done(null, false, {
                    errors: {
                        'email or password': 'is invalid'
                    }
                });
            }
            if (!(password === users[0].password)) {
                return done(null, false, {
                    errors: {
                        'email or password': 'is invalid'
                    }
                });
            }
            return done(null, users[0]);
        }).catch(err => {
            console.log(err);
            return done(err);
        });
    }));

    // Ждем JWT в Header

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: jwtsecret
    };

    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
        console.log('JWT**** WORKS:', jwtOptions)

        User.findAll({
            where: {
                id: payload.id
            },
            raw: true
        }).then(users => {
            if (!users.length) {
                return done(null, false);
            }
            console.log("jwt data ***", users[0])
            return done(null, users[0]);
        }).catch(err => {
            console.log(err);
            return done(err);
        });
    }));

};

const express = require('express');
const session = require('express-session');
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //?
const passport = require('passport');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(express.static(path.join(__dirname, "client/public")));

require('./config/auth/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(session({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var router = express.Router();
require('./app/routes.js')(app, router, passport);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.listen(port);
console.log('Port:  ' + port + '...');

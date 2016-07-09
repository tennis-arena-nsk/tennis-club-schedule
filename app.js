'use strict';

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });



// create express server:
const app = express();

// setup mongo / mongoose:
const dbUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI
app.db = mongoose.createConnection(dbUri);
app.db.uri = process.env.MONGODB_URI || process.env.MONGOLAB_URI
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
  console.log('Database connected');
});

// configure models:
require('./config/models')(app, mongoose);


// configure express:
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());

// sass middleware to process frontend:
/* app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
})); */

app.use(logger('dev'));

// accept json/urlencoded form data:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

// configure sessions:
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: dbUri,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// some security:
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// ? 
app.use((req, res, next) => {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});

// configure serving of static files:
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// configure project-wide locals:
app.locals.projectName = process.env.PROJECT_NAME;
app.locals.companyName = process.env.COMPANY_NAME;
app.locals.copyrightYear = new Date().getFullYear();

// configure passport
require('./config/passport')(app,passport);

// setup app routes
require('./config/routes')(app,passport);

// use error handler:
app.use(errorHandler());

// Start Express server.
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;

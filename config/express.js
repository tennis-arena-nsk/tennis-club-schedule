"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const errorHandler = require('errorhandler')
const lusca = require('lusca')
const contentLength = require('express-content-length-validator')
const expressValidator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
//const multer = require('multer')
const flash = require('express-flash')
const passport = require('passport')
//const sass = require('node-sass-middleware');
const compression = require('compression')
const path = require('path')


exports = module.exports = class ApplicationConfig {
  static init(app) {
//    const upload = multer({ dest: path.join(__dirname, '../uploads') })

    // configure express:
    app.disable('x-powered-by');
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    morgan.token('accepts', function getId (req) {
      return req.accepts()
    })

    app.use(morgan(':method :url :status < :accepts > :response-time'));

    app.use(compression());
    app.use(contentLength.validateMax({max: 999}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(helmet());
    app.use(expressValidator());

    // configure sessions:
    app.use(session({
      resave: true,
      saveUninitialized: true,
      maxAge: 1000 * 60 * 60, // 1 hour ( 1000ms, 60s, 60m)
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: app.db.uri,
        autoReconnect: true
      })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    // use friendlier error handler:
    if (process.env.NODE_ENV === 'development') {
      // only use in development
      app.use(errorHandler())
    }

    // some security:
/*    app.use((req, res, next) => {
      if (req.path === '/api/upload') {
        next();
      } else {
        lusca.csrf()(req, res, next);
      }
    });
    app.use(lusca.xframe('SAMEORIGIN'));
    app.use(lusca.xssProtection(true));
*/
    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });

    String.prototype.startsWith = function(needle)
    {
      return(this.indexOf(needle) == 0);
    };

    app.use(function(req, res, next) {
      if ( !(req.path == '/login' || req.path.startsWith('/auth/')) && req.session.returnTo) {
        delete req.session.returnTo
      }
      next()
    })

    // sass middleware to process frontend:
    /* app.use(sass({
     src: path.join(__dirname, 'public'),
     dest: path.join(__dirname, 'public')
     })); */

    // configure project-wide locals:
    app.locals.projectName = process.env.PROJECT_NAME;
    app.locals.companyName = process.env.COMPANY_NAME;
    app.locals.copyrightYear = new Date().getFullYear();

    // configure serving of static files:
    app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

  }
}
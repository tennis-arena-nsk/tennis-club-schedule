"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const winston = require('winston')
const errorHandler = require('errorhandler')
const lusca = require('lusca')
const contentLength = require('express-content-length-validator')
const expressValidator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const helmet = require('helmet')
const flash = require('express-flash')
const passport = require('passport')
//const sass = require('node-sass-middleware');
const compression = require('compression')
const path = require('path')
const mongoose = require('mongoose')
const acceptOverride = require('connect-acceptoverride');


exports = module.exports = class {
  static init(app) {
    // configure express:
    app.disable('x-powered-by');
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    morgan.token('accepts', function getId (req) {
      return req.accepts()
    })


    // init loggers:
    var logger = {}
    if (process.env.NODE_ENV !== 'test') {
      console.log('Development logger')
       logger = new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: 'app.log' })
        ]
      })
      app.use(morgan(':method :url :status < :accepts > :response-time'));
    } else {
      console.log('Test logger')
      // while testing, log only to file, leaving stdout free for unit test status messages
      logger = new (winston.Logger)({
        transports: [
          new (winston.transports.File)({ filename: 'app.log' })
        ]
      })
    }

    app.db.on('error', function(err) {
      logger.error('MongoDB event error: ' + err);
    });

    app.use(compression());
    app.use(contentLength.validateMax({max: 999}));
    app.use(acceptOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
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
    app.use(helmet());

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

    // configure project-wide locals:
    app.locals.projectName = process.env.PROJECT_NAME;
    app.locals.companyName = process.env.COMPANY_NAME;
    app.locals.copyrightYear = new Date().getFullYear();

    // configure serving of static files:
    app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

  }
}
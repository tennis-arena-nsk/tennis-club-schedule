'use strict';

const express = require('express')

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

const ScheduleRouter = require('./routes/schedule.router.js')
const AuthRouter = require('./routes/auth.router.js')

/**
 * Login Required middleware.
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports = module.exports = class RoutesConfig {
  static init(app) {
    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);

    app.get('/contact', contactController.getContact);
    app.post('/contact', contactController.postContact);

    app.get('/account', isAuthenticated, userController.getAccount);
    app.post('/account/profile', isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', isAuthenticated, userController.getOauthUnlink);

    ScheduleRouter.init(app, '/schedule')
    AuthRouter.init( app, '/auth')
  }
};
'use strict';

const express = require('express')

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home')
const userController = require('../controllers/user')

const ReservationRouter = require('./routes/reservation.router.js')
const ScheduleRouter = require('./routes/schedule.router.js')
const ResourceRouter = require('./routes/resource.router.js')
const AuthRouter = require('./routes/auth.router.js')

const isAuthenticated = require('./isAuthenticated')


exports = module.exports = class {
  static init(app) {
    // home controller
    app.get('/', homeController.index)

    // user controller's routes:
    app.get('/login', userController.getLogin)
    app.post('/login', userController.postLogin)
    app.get('/logout', userController.logout)
    app.get('/forgot', userController.getForgot)
    app.post('/forgot', userController.postForgot)
    app.get('/reset/:token', userController.getReset)
    app.post('/reset/:token', userController.postReset)
    app.get('/signup', userController.getSignup)
    app.post('/signup', userController.postSignup)

    app.get('/account', isAuthenticated, userController.getAccount)
    app.post('/account/profile', isAuthenticated, userController.postUpdateProfile)
    app.post('/account/password', isAuthenticated, userController.postUpdatePassword)
    app.post('/account/delete', isAuthenticated, userController.postDeleteAccount)
    app.get('/account/unlink/:provider', isAuthenticated, userController.getOauthUnlink)

    ReservationRouter.init(app, '/reservation')
    ScheduleRouter.init(app, '/schedule')
    ResourceRouter.init(app, '/resource')
    AuthRouter.init( app, '/auth')
  }
};
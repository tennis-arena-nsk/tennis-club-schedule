"use strict"

// import controller
const controller = require('../../controllers/reservation.controller')
const router = require('express').Router()
const isAuthenticated = require('../isAuthenticated')

exports = module.exports = class {
  static init( app, mountPath ) {

    router.all('*', isAuthenticated) // apply security for all routes here

    router.route( '/')
      .get(controller.list)
      .post(controller.create);

    router.route( '/:id/')
      .get(controller.show)
      .post(controller.update)
      .delete(controller.remove);

    app.use( mountPath, router )
  }
}

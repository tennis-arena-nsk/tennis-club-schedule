// import controller
const controller = require('../../controllers/schedule')
const router = require('express').Router()

exports = module.exports = class ScheduleRoutes {
  static init( app, mountPath ) {
    router.route( '/')
      .get(controller.list)
      .post(controller.create);

    router.route( '/:id')
      .get(controller.show)
      .post(controller.update)
      .delete(controller.delete);

    app.use( mountPath, router )
  }


}

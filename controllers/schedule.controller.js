'use strict';

//const Promise = require('bluebird')

const Model = require('../models/schedule.model');

exports = module.exports = class ScheduleController {

  // list all items
  static list(req,res) {
    console.log( 'controller.list');
    Model.list()
        .then(objects => {
          console.log( 'controller.list: then objects:')
          console.log( objects )

          if (req.accepts(['html', 'json']) === 'json' ) {
            console.log( 'return json' )
            res.status(200).json(objects)
          } else {
            console.log( 'return html' )
            res.locals.objects = objects
            res.render('schedule/schedule.list.jade')
          }
          

        })
        .catch(error => res.status(400).json(error));
  }

  // create item
  static create(req,res) {
    let _object = req.body;

    Model.create(_object)
        .then(object => res.status(201).json(object))
        .catch(error => res.status(400).json(error));
  }

  // show single item
  static show(req,res) {
    console.log( 'controller.show');
    Model.show(req.params.id)
        .then(service => res.status(200).json(service))
        .catch(error => res.status(400).json(error));
  }

  // update item
  static update(req,res) {
    console.log( 'controller.update');

    const _id = req.params.id;
    const _object = req.body;

    Model.update(_id, _object)
        .then(object => res.status(200).json(object))
        .catch(error => res.status(400).json(error));
  }

  // delete item
  static delete(req,res) {
    Model.delete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => res.status(400).json(error));
  }

}

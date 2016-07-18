'use strict';

// core modules:
const Promise = require('bluebird')

// project modules:
const _name = 'schedule'
const Model = require('../models/' + _name + '.model');

exports = module.exports = class ScheduleController {

  // list all items
  static list(req,res) {
    console.log( _name + '.controller.list');
    Model.list()
        .then(objects => {
          console.log( 'listed objects:')
          console.log( objects )

          if (req.accepts(['json','html']) === 'json') {
            console.log( 'return as json' )
            res.status(200).json(objects)
          } else {
            console.log( 'return as html' )
            res.locals.objects = objects
            res.render( _name + '/list')
          }
          

        })
        .catch(error => {
          if (req.accepts('json')) {
            console.log( 'return as json' )
            res.status(400).json(error)
          } else {
            console.log( 'return as html' )
            res.locals.objects = error
            res.locals.http_error_code=400
            res.status(400).render( 'html/400')
          }

        });
  }

  // create item
  static create(req,res) {
    console.log( _name + '.controller.create');
    let _object = req.body;

    Model.create(_object)
        .then(object => res.status(201).json(object))
        .catch(error => {
          if (req.accepts('json')) {
            console.log( 'return as json' )
            res.status(400).json(error)
          } else {
            console.log( 'return as html' )
            res.locals.objects = error
            res.locals.http_error_code=400
            res.status(400).render( 'html/400')
          }
        });
  }

  // show single item
  static show(req,res) {
    console.log( 'controller.show');
    Model.show(req.params.id)
        .then(item => {
          res.status(200).json(item)
        })
        .catch(error => {
        if (req.accepts(['json','html']) === 'json') {
          console.log( 'return as json' )
          res.status(400).json(error)
        } else {
          console.log( 'return as html' )
          res.locals.objects = error
          res.locals.http_error_code = 400
          res.status(400).render( 'html/400')
        }
      });

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

'use strict';

const _ = require('lodash')

// project modules:
const ModelName = 'Reservation'
const Title = 'Расписание'
const Model = require(`../models/${ModelName.toLowerCase()}.model`)

exports = module.exports = class {

  // list all items
  static list(req,res) {
    Model.list()
      .then(objects => {
        const responseObject = { items : {}, options: {} }

        // if request is done by none-manager account then clear all reservedBy filelds
        if ( !req.user || (req.user && (req.user.profile.canManageReservations === false))) {
          console.log('Process reservedBy field')
          _.each(objects, (item) => {
              if ( !req.user || item.reservedBy !== req.user._id )
                item.reservedBy = ''
            })
          console.log('Processed objects:')
          console.log(objects)
        }

        responseObject.items = objects
        responseObject.options.canMakeNewReservation = req.user ? req.user.profile.canMakeNewReservation : false

        console.log('Response:')
        console.log(responseObject)

        if (req.accepts(['json','html']) === 'json') {
          return res.status(200).json(responseObject)
        } else {
          res.locals.objects = responseObject
          res.locals.title = Title

          return res.render( `${ModelName}/list` )
        }
      })
      .catch(error => {
        if (req.accepts('json')) {
          return res.status(400).json(error)
        } else {
          res.locals.objects = error
          res.locals.http_error_code=400
          return res.status(400).render( 'html/400')
        }

      });
  }

  // create item
  static create(req,res) {
    console.log( ModelName + '.controller.create');
    const _object = req.body;

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
  static remove(req,res) {
    Model.remove(req.params.id)
      .then(() => res.status(204).end())
      .catch(error => res.status(400).json(error));
  }

}

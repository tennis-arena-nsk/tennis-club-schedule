'use strict';

// project modules:
const ModelName = 'Resource'
const Model = require(`../models/${ModelName.toLowerCase()}.model`)

exports = module.exports = class {

  // list all items
  static list(req,res) {
    Model.list()
      .then(objects =>
        res.format({
          html: () => {
            res.locals.objects = objects
            res.render( `${ModelName}/list`)
          },

          json: () => {
            res.status(200).json(objects)
          }
        })
      )
      .catch(error =>
        res.format({
          html: () => {
            res.locals.objects = error
            res.locals.http_error_code = 400
            res.status(400).render( 'html/400')
          },

          json: () => {
            res.status(400).json(error)
          }
        })
      )
  }

  // create item
  static create(req,res) {
    Model.create(req.body)
      .then(object => res.status(201).json(object))
      .catch(error =>
        res.format({
          html: () => {
            res.locals.objects = error
            res.locals.http_error_code = 400
            res.status(400).render( 'html/400')
          },

          json: () => {
            res.status(400).json(error)
          }
        })
      )
  }

  // show single item
  static show(req,res) {
    Model.show(req.params.id)
      .then(item => res.status(200).json(item) )
      .catch(error =>
        res.format({
          html: () => {
            res.locals.objects = error
            res.locals.http_error_code = 400
            res.status(400).render( 'html/400')
          },

          json: () => {
            res.status(400).json(error)
          }
        })
      )
  }

  // update item
  static update(req,res) {
    const _id = req.params.id;
    const _object = req.body;

    Model.update(_id, _object)
      .then(object => res.status(200).json(object))
      .catch(error =>
        res.format({
          html: () => {
            res.locals.objects = error
            res.locals.http_error_code = 400
            res.status(400).render('html/400')
          },

          json: () => {
            res.status(400).json(error)
          }
        })
      )
  }

  // delete item
  static remove(req,res) {
    Model.remove(req.params.id)
      .then(() => res.status(204).end())
      .catch(error =>
        res.format({
          html: () => {
            res.locals.objects = error
            res.locals.http_error_code = 400
            res.status(400).render('html/400')
          },

          json: () => {
            res.status(400).json(error)
          }
        })
      )
  }
}

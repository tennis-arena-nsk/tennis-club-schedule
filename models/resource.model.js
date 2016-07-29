"use strict"

const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')
const Schema = require('mongoose').Schema

const str = require( '../config/strings')

const ModelName = 'Resource'

const schema = new Schema({
  name: {
    type: String,
    required: true
  }
})

schema.statics.list = () =>
  new Promise((resolve, reject) => {
    const _query = {}
    Model.find(_query)
      .exec((err, _objects) => {
        err ? reject(err) : resolve(_objects)
      })
  })


schema.statics.show = id =>
  new Promise((resolve, reject) => {
    if (!id) {
      return reject(new TypeError(ModelName + str.idParamNotValid))
    }

    Model.findById(id)
      .exec((err, service) => {
        err ? reject(err) : resolve(service);
      })
  })


schema.statics.create = anObject =>
  new Promise((resolve, reject) => {
    if (!_.isObject(anObject)) {
      return reject(new TypeError(ModelName + str.objectParamNotValid))
    }

    new Model(anObject).save((err, saved) => {
      err ? reject(err) : resolve(saved)
    })
  })


schema.statics.update = (id, object) =>
  new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError(ModelName + str.idParamNotValid))
    }

    if (!_.isObject(object)) {
      return reject(new TypeError(ModelName + str.objectParamNotValid ))
    }

    Model.findByIdAndUpdate(id, object)
      .exec((err, updated) => {
        err ? reject(err) : resolve(updated);
      })
  })


schema.statics.remove = id =>
  new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError(ModelName + str.idParamNotValid))
    }

    Model.findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err) : resolve(deleted)
      })
  })


const Model = mongoose.model( ModelName, schema);

exports = module.exports = Model;
"use strict"

const mongoose = require('mongoose')

const ModelName = 'Resource'

const schema = new require('mongoose').Schema({
  name: {
    type: String,
    required: true
  }
})

const Model = mongoose.model( ModelName, schema);

exports = module.exports = Model;
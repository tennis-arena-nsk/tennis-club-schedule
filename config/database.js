"use strict";

const mongoose = require('mongoose');
const bluebird =  require('bluebird');

mongoose.Promise = bluebird;

exports = module.exports = class Database {
  static init(app) {
    // setup mongo / mongoose:
    const dbUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI

    mongoose.connect( dbUri )
    app.db = mongoose.connection;
    app.db.uri = process.env.MONGODB_URI || process.env.MONGOLAB_URI
    app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
    app.db.once('open', function () {
      console.log('Database connected');
    });

  }
}; 
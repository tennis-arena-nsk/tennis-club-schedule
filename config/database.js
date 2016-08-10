"use strict";

const mongoose = require('mongoose');
const bluebird =  require('bluebird');

mongoose.Promise = bluebird;

exports = module.exports = class Database {
  static init(app) {
    // setup mongo / mongoose:
    const dbUri = process.env.MONGODB_URI + '/' + process.env.NODE_ENV

    mongoose.connect( dbUri )
    app.db = mongoose.connection;
    app.db.uri = dbUri
//    app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
    app.db.once('open', () => {
      console.log(`Database ${dbUri} connected, (${process.env.NODE_ENV}, ${process.env.MONGODB_URI})`);
    })

  }
}; 
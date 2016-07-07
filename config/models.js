'use strict';

exports = module.exports = (app, mongoose) => {
  // schema files:
  require('../models/User.js')(app, mongoose);
};


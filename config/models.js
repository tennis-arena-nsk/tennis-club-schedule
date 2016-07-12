'use strict';

exports = module.exports = class Model {

  static init(app) {
    // schema files:
    require('../models/User.js')(app);
  }
};


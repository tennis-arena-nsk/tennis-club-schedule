'use strict';

exports = module.exports = class Model {

  static init(app) {
    // schema files:
    require('../models/User.js')(app);
    require('../models/resource.model.js')
    require('../models/schedule.model.js')
    require('../models/reservation.model.js')
  }
};


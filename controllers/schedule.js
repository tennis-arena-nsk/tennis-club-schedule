'use strict';


/**
 * GET /schedule
 * Render basic schedule view.
 */
exports.getSchedule = (req, res) => {
  res.render('schedule/index', {
    title: 'Расписание'
  });
};

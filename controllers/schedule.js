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

exports.getWeek = (req,res)=> {
  res.json( { reservations: [
    { slot: "9:00", duration: 2, info: { type: "user" } },
    { slot: "17:00", duration: 1, info: { type: "user" } },
    { slot: "19:00", duration: 1, info: { type: "user" } }
  ]});
};


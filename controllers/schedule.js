'use strict';

const User = require('../models/user');

exports = module.exports = class ScheduleController {
  static list(req,res) {
    res.status(200).json('{ msg: "ok"}')
  }

  static create(req,res) {
    res.status(200).json('{ msg: "ok"}')
  }
  static show(req,res) {
    res.status(200).json('{ msg: "ok"}')
  }
  static update(req,res) {
    res.status(200).json('{ msg: "ok"}')
  }
  static delete(req,res) {
    res.status(200).json('{ msg: "ok"}')
  }
}

/*
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

exports.getAccountReservation = (req, res) => {
  if (!req.user) {
    req.flash('errors', { msg: 'Please login to access reservation info' });
    return res.redirect('/login');
  }

  res.json( { reservations: [
      { "id": 1, "startTime": "9:00", "endTime:": "12:00", "type": "confirmed" },
      { "id": 1, "startTime": "18:00", "endTime:": "19:00", "type": "confirmed" }
    ]}
  );

};

exports.userAddReservation = (req,res) => {

};
*/
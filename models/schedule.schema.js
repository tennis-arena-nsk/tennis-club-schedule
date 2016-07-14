"use strict"

const Schema = require('mongoose').Schema;

const _Schema = {
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startHour: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    startMin: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    },
    endHour: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    endMin: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    },
    slotSize: {
        type: Number,
        required: true,
        min: 0
    }
};

exports = module.exports = Schema(_Schema);
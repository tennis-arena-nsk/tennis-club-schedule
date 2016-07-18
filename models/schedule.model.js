"use strict"

const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')

const schema = require('mongoose').Schema({
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
});

schema.statics.list = () => {
    return new Promise((resolve, reject) => {
        const _query = {};

        console.log( 'model.list');
        Model.find(_query)
            .exec((err, _objects) => {
                err ? reject(err) : resolve(_objects);
            });
    });
};

schema.statics.show = id => {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new TypeError('Id is not defined.'));
        }

        Model.findById(id)
            .exec((err, service) => {
                err ? reject(err) : resolve(service);
            });
    });
};

schema.statics.create = anObject => {
    console.log( 'model.create' )
    console.log( anObject )

    return new Promise((resolve, reject) => {
        if (!_.isObject(anObject)) {
            return reject(new TypeError('object param is not a valid object.'));
        }

        let _object = new Model( anObject);

        console.log( 'new object:')
        console.log( _object )

        _object.save((err, saved) => {
            console.log( 'saved!')

            err ? reject(err) : resolve(saved);
        });
    });
};

schema.statics.update = (id, object) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id)) {
            return reject(new TypeError('Id param is not a valid string.'));
        }

        if (!_.isObject(object)) {
            return reject(new TypeError('object param is not a valid object.'));
        }

        Model.findByIdAndUpdate(id, object)
            .exec((err, updated) => {
                err ? reject(err) : resolve(updated);
            });
    });
};

schema.statics.remove = id => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id)) {
            return reject(new TypeError('Id is not a valid string.'));
        }

        Model.findByIdAndRemove(id)
            .exec((err, deleted) => {
                err ? reject(err) : resolve(deleted);
            });
    });
};

let Model = mongoose.model('Schedule', schema);

exports = module.exports = Model;
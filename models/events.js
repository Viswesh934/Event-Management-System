const mongoose = require('mongoose');
const db = require('../db/connect');
const eventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true,
        unique: true,
    },
    eventdescription: {
        type: String,
        required: true,
    },
    eventdate: {
        type: Date,
        required: true,
    },
    eventtime: {
        type: String,
        required: true,
    },
    eventvenue: {
        type: String,
        required: true,
    },
    eventorganizer: {
        type: String,
        required: true,
    },
    eventorganizeremail: {
        type: String,
        required: true,
    },
    eventorganizerphonenumber: {
        type: Number,
        required: true,
    }
});
const events = mongoose.model('events', eventSchema);
module.exports = events;
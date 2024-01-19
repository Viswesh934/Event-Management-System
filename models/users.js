const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../db/connect');
const schema = mongoose.Schema;
// define user schema with username,password,email,phone number
const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }
    ,
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required: true,
        minlength: 10,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

});
const user = mongoose.model('user', userSchema);
module.exports = user;
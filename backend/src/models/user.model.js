// const db = require('../config/db.config');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    city: {
        type: String,
    },
    dob: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    image: {
        type: String,
        default: "/default.jpeg"
    }
}, {
    versionKey: false
});

const User = mongoose.model('user', UserSchema);




module.exports.User = User
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String, // Changed semicolon to comma
        required: true
    },
    password: {
        type: String, // Changed semicolon to comma
        required: true
    },
    date: {
        type: Date, // Changed semicolon to comma
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema); // Note: model name should be capitalized for conventions

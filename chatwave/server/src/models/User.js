const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'Hey there! I am using ChatWave.'
        }

}, {timestamps: true });

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String,
        default: '',
    },
    skills: {
        type: [String],
        default: [],
    },
    github: {
        type: String,
        default: '',
    },
    linkedin: {
        type: String,
        default: '',
    }, 
},  { timestamps: true});

modue.exports = mongoose.model('User', userSchema);
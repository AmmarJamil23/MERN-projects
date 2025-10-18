const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String, 
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    techStack: {
        type: [String],
        default: [],
    },
    githubLink: {
        type: String,
        default: '',
    },
    livelink: {
        type: String,
        default: '',
    },

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
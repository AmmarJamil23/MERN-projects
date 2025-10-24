const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            default: ''
        },
        seen: {

            type: Boolean,
            default: false
        }
    }, 
    { timestamps: true}
);

module.exports = mongoose.model('Message', messageSchema);
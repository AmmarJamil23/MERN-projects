const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.sendMessage = async (req, res) => {
    try {
        const {conversationId, text } = req.body;
        const senderId = req.user._id;

        const message = await Message.create({
            conversationId,
            senderId,
            text
        });

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: text
        });

        res.status(201).json(message);

    } catch (error){
        res.status(500).json({ message: 'Server error'})
    }
}

exports.getMessages = async (req, res) => {
    try {
        const {conversationId} = req.params;
        const messages = await Message.find({ conversationId}).populate(
            'senderId',
            'name email avatar'
        );
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: 'Server error'});

    }
};
const Conversation = require('../models/Conversation');

exports.createOrGetConversation = async (req, res) => {
    try {
        const { userId } = req.body;
        const loggedInsderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [loggedInUserId, userId]
            }
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [loggedInUserId, userId]
            });
        }

        res.status(200).json(conversation);

    } catch (error){
        res.status(500).json({ message: 'Server error'});
    }
}
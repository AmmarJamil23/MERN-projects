const Conversation = require('../models/Conversation');

exports.createOrGetConversation = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [loggedInUserId, userId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [loggedInUserId, userId]
      });
    }

    res.status(200).json(conversation);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    })
    .populate('participants', 'name email avatar status')
    .sort({ updatedAt: -1 });

    res.status(200).json(conversations);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

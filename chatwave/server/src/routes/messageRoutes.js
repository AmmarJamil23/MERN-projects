const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/:conversationId', authMiddleware, getMessages);

module.exports = router;

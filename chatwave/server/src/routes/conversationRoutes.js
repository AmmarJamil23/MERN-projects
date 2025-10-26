const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createOrGetConversation, getInbox} = require('../controllers/conversationController');

const router = express.Router();

router.post('/', authMiddleware, createOrGetConversation);
router.get('/', authMiddleware, getInbox);

module.exports = router;
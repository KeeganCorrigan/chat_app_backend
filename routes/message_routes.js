const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message_controller')

router.post('/', MessageController.createMessage)
router.get('/', MessageController.getMessages)

module.exports = router

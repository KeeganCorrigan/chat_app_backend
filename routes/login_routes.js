const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login_controller')

router.post('/', LoginController.create)
router.post('/connect', LoginController.connectRecipient)
module.exports = router

const express = require('express');

const router = express.Router();

const { postMessage, getMessage } = require('../controllers/message');

// add message
router.post('/', postMessage);

//get message
router.get('/:conversationId', getMessage);

module.exports = router;

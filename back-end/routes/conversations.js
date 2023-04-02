const express = require('express');

const router = express.Router();

const {
   postConversation,
   getConversation,
   getTwoConversation,
} = require('../controllers/conversations');

// new conversation
router.post('/', postConversation);

//get conversation of a user
router.get('/:userId', getConversation);

//get conversation includes two userId
router.get('/find/:firstUserId/:secondUserId', getTwoConversation);

module.exports = router;

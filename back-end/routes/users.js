const express = require('express');

const router = express.Router();

const {
   updateUser,
   deleteUser,
   getUser,
   followUser,
   unFollowUser,
   getFriends,
} = require('../controllers/users');

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

// Get a user
router.get('/', getUser);

// Get friends
router.get('/friends/:userId', getFriends);

// Follow a user
router.put('/:id/follow', followUser);

// UnFollow a user
router.put('/:id/unfollow', unFollowUser);

module.exports = router;

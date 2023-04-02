const express = require('express');

const router = express.Router();

const {
   postPost,
   updatePost,
   deletePost,
   likePost,
   getPost,
   getTimeline,
   getUserPosts,
} = require('../controllers/posts');

// create a post
router.post('/', postPost);

// update a post
router.put('/:id', updatePost);

// delete a post
router.delete('/:id', deletePost);

// like a post
router.put('/:id/like', likePost);

// get a post
router.get('/:id', getPost);

// get timeline posts
router.get('/timeline/:userId', getTimeline);

// get user's all posts
router.get('/profile/:username', getUserPosts);

module.exports = router;

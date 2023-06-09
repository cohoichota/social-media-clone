const Post = require('../models/Post');
const User = require('../models/User');

exports.postPost = async (req, res) => {
   const newPost = new Post(req.body);
   try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.updatePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
         await post.updateOne({ $set: req.body });
         res.status(200).json('the post has been updated');
      } else {
         res.status(403).json('you can update only your post');
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.deletePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
         await post.deleteOne({ $set: req.body });
         res.status(200).json('the post has been deleted');
      } else {
         res.status(403).json('you can delete only your post');
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.likePost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
         await post.updateOne({ $push: { likes: req.body.userId } });
         res.status(200).json('the post has been liked');
      } else {
         await post.updateOne({ $pull: { likes: req.body.userId } });
         res.status(200).json('the post has been disliked');
      }
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.getPost = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.getTimeline = async (req, res) => {
   try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
         currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
         })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
   } catch (error) {
      res.status(500).json(error);
   }
};

exports.getUserPosts = async (req, res) => {
   try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
   } catch (error) {
      res.status(500).json(error);
   }
};

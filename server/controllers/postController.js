const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
    const newPost = await new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(500).json(err);
    }
}

//update post method
const updatePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        console.log(post);
        if (post.username === req.body.userId) {
            await post.updateOne({ $set : req.body });
            res.status(200).json("The post has been updated");
        } else {
          res.status(403).json("You can only update your own post");
        }
    } catch(err){
        res.status(500).json(err);
    }
}

//delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can only delete your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// like/dislike a post
const likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push : {likes : req.body.userId} });
            res.status(200).json("Post has been liked");
        } else{
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }
    } catch(err){
        res.status(500).json(err);
    }
}

const getPost = async (req ,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
}

const timelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({username : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                Post.find({ username: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timelinePost
};
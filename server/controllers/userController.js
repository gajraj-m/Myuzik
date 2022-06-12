const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user
const putUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  !user && res.status(500).json("No such user found");

  if (req.body.userId === req.params.id || user.isAdmin) {
    // if user tries to update the password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    // update any other field if required
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
}

// Delete function
const deleteUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  !user && res.status(500).json("No such user found");

  if (req.body.userId === req.params.id || user.isAdmin) {
    // update any other field if required
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
}

// Get function
const getUser = async (req, res) => {
  
  try{
    const user = await User.findById({ _id: req.params.id });
    !user && res.status(500).json("No such user found");
    const {password, updatedAt, ...other} = user._doc;
    res.status(200).json(other); // we don't want password and updatedAt property
  } catch(err){
    res.status(500).json(err);
  }
}

// Follow user
// req.params.id = user to be followed
const followUser = async (req, res) => {
  if(req.body.userId === req.params.id) res.status(403).json("You can't follow yourself");
  else{
    try{
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // if current user is NOT already a follower
      if (!userToFollow.followers.includes(req.body.userId)) {

        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user follower and following updated");

      } else {
        res.status(403).json("You already follow this user");
      }
    } catch(err){
      res.status(500).json("couldn't add value " + err);
    }
  }
}

// Unfollow user
const unfollowUser = async (req, res) => {
  if (req.body.userId === req.params.id)
    res.status(403).json("You can't follow yourself");
  else {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // if current user is already a follower
      if (userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user follower and following removed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json("couldn't delete value " + err);
    }
  }
}

module.exports = {
  putUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};
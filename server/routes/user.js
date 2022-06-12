const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    res.send("You are inside user route");
})

// update user
router.put("/:id", userController.putUser);

//delete user
router.delete("/:id", userController.deleteUser);

// get user
router.get("/:id", userController.getUser);

//follow user
router.put("/:id/follow", userController.followUser);

// unfollow user
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// create a post
router.post("/", postController.createPost);

// update a post
router.put("/:id", postController.updatePost); // the id is of post.. not user

// delete a post
router.delete("/:id", postController.deletePost);

//like a post
router.put("/:id/like", postController.likePost);

//get a post
router.get("/:id", postController.getPost);

//get timeline post
router.get("/timeline/:userId", postController.timelinePost);

module.exports = router;
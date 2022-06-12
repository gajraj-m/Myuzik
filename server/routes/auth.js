const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", (req, res) => {
  res.send("get route working well");
});

// Register
router.post("/register", authController.register);

 //LOGIN
router.post("/login", authController.login);


module.exports = router;

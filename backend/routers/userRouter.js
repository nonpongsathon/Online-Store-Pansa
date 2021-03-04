const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { isAuth } = require("../utils");

router.post("/register", UserController.registerUser);
router.post("/signin", UserController.signinUser);
router.get("/:id", isAuth, UserController.getUser);
router.put("/profile", isAuth, UserController.updateUser);

module.exports = router;

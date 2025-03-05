const express = require("express");
const userController = require("../../controllers/admin/user.controller");
const { authenticateJWT } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", userController.checkRun);
router.get("/list", authenticateJWT, userController.getUsers);

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.post("/update-role", authenticateJWT, userController.updateRole)
router.post("/update", authenticateJWT, userController.updateUser)
router.post("/delete", authenticateJWT, userController.deleteUser)

module.exports = router;

const express = require("express");
const { movieAdminController, movieController } = require("../../controllers/system/movie.controller");
const { authenticateJWT } = require("../../middlewares/authMiddleware");

const router = express.Router();

// Admin Only
router.get("/list", authenticateJWT, movieAdminController.getMovies);
router.post("/create", authenticateJWT, movieAdminController.createMovie);
router.post("/update", authenticateJWT, movieAdminController.updateMovie);
router.post("/delete", authenticateJWT, movieAdminController.deleteMovie);
router.post("/update-status", authenticateJWT, movieAdminController.updateStatusMovie);

// Landing Page Only
router.get("/", movieController.getMovies);

module.exports = router;

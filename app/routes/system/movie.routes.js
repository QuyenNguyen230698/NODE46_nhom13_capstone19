const express = require("express");
const { movieAdminController, movieController } = require("../../controllers/system/movie.controller");
const { authenticateJWT } = require("../../middlewares/authMiddleware");
const { checkAdminRole } = require('../../middlewares/checkRole.middleware');

const router = express.Router();

// Admin Only
router.get("/list", authenticateJWT, checkAdminRole, movieAdminController.getMovies);
router.post("/create", authenticateJWT, checkAdminRole, movieAdminController.createMovie);
router.post("/update", authenticateJWT, checkAdminRole, movieAdminController.updateMovie);
router.post("/delete", authenticateJWT, checkAdminRole, movieAdminController.deleteMovie);
router.post("/update-status", authenticateJWT, checkAdminRole, movieAdminController.updateStatusMovie);

// Landing Page Only
router.get("/", movieController.getMovies);

module.exports = router;

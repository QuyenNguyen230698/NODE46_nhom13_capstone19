const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/admin/user.routes');
const movieRoutes = require('../routes/system/movie.routes');
const theaterRoutes = require('../routes/system/theater.routes');
const cloudinaryRoutes = require('../routes/cloudinary/cloudinary.routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/theaters', theaterRoutes);
router.use('/cloudinary', cloudinaryRoutes);

module.exports = router;
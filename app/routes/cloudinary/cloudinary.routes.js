const express = require('express');
const multer = require('multer');
const { uploadImage, deleteImage } = require('../../controllers/cloudinary/cloudinary.controller');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.delete('/delete', deleteImage);

module.exports = router;

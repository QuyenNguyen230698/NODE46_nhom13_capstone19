const { uploadToCloudinary, deleteFromCloudinary } = require('../../services/cloudinary/cloudinary.service');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedImage = await uploadToCloudinary(req.file);
    res.status(200).json({
      message: 'Image uploaded successfully',
      data: uploadedImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'Missing public_id' });
    }

    const result = await deleteFromCloudinary(public_id);

    if (result.result !== 'ok') {
      return res.status(400).json({ error: 'Failed to delete image' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadImage, deleteImage };

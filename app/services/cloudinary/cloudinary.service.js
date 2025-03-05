const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../../common/constant/app.constant');
const Cloudinary = require('../../models/cloudinary/cloudinary.model'); // Assuming the Cloudinary model is defined in this file
const { responseSuccess } = require('../../common/helpers/responsive.helper');

dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'Capstone 19' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
        const cloudinaryData = new Cloudinary({
          public_id: result.public_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          bytes: result.bytes,
          secure_url: result.secure_url,
        });
        cloudinaryData.save();
        responseSuccess(`File uploaded successfully`, cloudinaryData);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const deleteFromCloudinary = async (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) return reject(error);

      try {
        const cloudinaryData = await Cloudinary.findOne({ public_id });
        if (!cloudinaryData) {
            return resolve(responseSuccess('File not found'));
        }
        await cloudinaryData.deleteOne({ _id: cloudinaryData._id });
        resolve(responseSuccess(`File deleted successfully`, cloudinaryData));
      } catch (error) {
        reject(error);
      }
    });
  });
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };

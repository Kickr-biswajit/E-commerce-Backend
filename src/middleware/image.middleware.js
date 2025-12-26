import { upload } from '../db/cloudinary.js';

export const imageUpload = (fieldName) => {
  return (req, res, next) => {
    const handler = upload.single(fieldName);

    handler(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || 'Image upload failed',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: `${fieldName} image is required`,
        });
      }

      next();
    });
  };
};

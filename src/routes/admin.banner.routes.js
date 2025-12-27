import express from 'express';
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';
import { addBanner, 
         deleteBanner, 
         editBanner, 
         getAllBanner, 
         getBannerById
             } from '../controllers/admin.banner.controllers.js';
import { imageUpload } from '../middleware/image.middleware.js';
import { upload } from '../db/cloudinary.js';

const router = express.Router();

router.post('/add',adminProtectRoute,imageUpload("bannerImage",upload),addBanner);

router.get('/all',adminProtectRoute,getAllBanner);

router.get('/:bannerId',adminProtectRoute,getBannerById);

router.delete('/:bannerId',adminProtectRoute,deleteBanner);

router.put('/:bannerId',adminProtectRoute,imageUpload("bannerImage",upload),editBanner);

export default router;
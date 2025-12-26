import express from 'express'
import { login, signup, updateProfilePic, userProfile } from '../controllers/user.controllers.js'
import { userProtectRoute } from '../middleware/protect.middleware.js'
import { upload } from '../db/cloudinary.js';
import { imageUpload } from '../middleware/image.middleware.js';
// import upload from '../db/imageMiddleware.js'

const router = express.Router()

router.post('/signup',signup);

router.post('/login',login);

router.get('/profile',userProtectRoute,userProfile);

// router.put('/profile-pic',userProtectRoute,upload.single("avatar"),updateProfilePic);

router.put('/profile-pic',userProtectRoute,imageUpload("profile", upload),updateProfilePic)

export default router
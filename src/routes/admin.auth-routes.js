import express from 'express'
import { adminProfile, adminSignup, login } from '../controllers/admin.controllers.js'
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';

const router = express.Router()

router.post('/signup',adminSignup);

router.post('/login',login)

router.get('/admin-profile',adminProtectRoute,adminProfile)

export default router
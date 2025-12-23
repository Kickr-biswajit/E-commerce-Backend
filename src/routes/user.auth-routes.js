import express from 'express'
import { login, signup, userProfile } from '../controllers/user.controllers.js'
import { userProtectRoute } from '../middleware/protect.middleware.js'

const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.get('/profile',userProtectRoute,userProfile)

export default router
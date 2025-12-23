import express from 'express'
import { addCategory, getMyCategory } from '../controllers/admin.category.controllers.js'
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js'

const router = express.Router()

router.post('/add-category',adminProtectRoute,addCategory);

router.get('/my-category',adminProtectRoute,getMyCategory);

export default router;   
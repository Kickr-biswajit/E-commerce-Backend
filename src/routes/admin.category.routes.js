import express from 'express'
import { addCategory, 
        deleteCategory, 
        editCategory, 
        getMyCategory, 
        getMyCategoryById
        } from '../controllers/admin.category.controllers.js'
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js'

const router = express.Router()

router.post('/add',adminProtectRoute,addCategory);

router.get('/all',adminProtectRoute,getMyCategory);

router.get('/all/:categoryId',adminProtectRoute,getMyCategoryById)

router.put('/edit/:categoryId',adminProtectRoute,editCategory);

router.delete('/delete/:categoryId',adminProtectRoute,deleteCategory);

export default router;   
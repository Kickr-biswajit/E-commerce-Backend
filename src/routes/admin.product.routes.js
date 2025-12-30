import express from 'express'
import { addProduct, 
         deleteProduct, 
         editProducts, 
         getMyProducts, 
         getMyProductsById, 
         getProductsByCategory
         } from '../controllers/admin.product.controllers.js';
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';
import { imageUpload } from '../middleware/image.middleware.js';
import { upload } from '../db/cloudinary.js';

const router = express.Router();

router.post('/add',adminProtectRoute,imageUpload("productImage",upload),addProduct);

router.get('/all',adminProtectRoute,getMyProducts);

router.get('/all/:productId',adminProtectRoute,getMyProductsById)

router.get('/category/:categoryId',adminProtectRoute,getProductsByCategory);

router.put('/edit/:productId',adminProtectRoute,editProducts);

router.delete('/delete/:productId',adminProtectRoute,deleteProduct);

export default router;  
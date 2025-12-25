import express from 'express'
import { addProduct, 
         deleteProduct, 
         editProducts, 
         getMyProducts, 
         getMyProductsById, 
         getProductsByCategory
         } from '../controllers/admin.product.controllers.js';
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';

const router = express.Router();

router.post('/add',adminProtectRoute,addProduct);

router.get('/all',adminProtectRoute,getMyProducts);

router.get('/all/:productId',adminProtectRoute,getMyProductsById)

router.get('/category/:categoryId',adminProtectRoute,getProductsByCategory);

router.put('/edit/:productId',adminProtectRoute,editProducts);

router.delete('/delete/:productId',adminProtectRoute,deleteProduct);

export default router;  
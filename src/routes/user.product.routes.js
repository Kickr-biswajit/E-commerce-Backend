import express from 'express'
import { userProtectRoute } from '../middleware/protect.middleware.js';
import { allProducts, 
         findProductsById, 
         getProductsByCategory
                 } from '../controllers/user.product.controllers.js';

const router = express.Router();

router.get('/all',userProtectRoute,allProducts);

router.get('/all/:productId',userProtectRoute,findProductsById);

router.get('/category/:categoryId',userProtectRoute,getProductsByCategory);

export default router;
import express from 'express'
import { addProduct, getMyProducts, getProductsByCategory } from '../controllers/admin.product.controllers.js';
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';

const router = express.Router();

router.post('/add-product',adminProtectRoute,addProduct);

router.get('/my-products',adminProtectRoute,getMyProducts);

router.get('/product-by-category/:id',adminProtectRoute,getProductsByCategory);

export default router;  
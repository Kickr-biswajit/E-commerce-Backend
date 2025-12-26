import express from 'express'
import { userProtectRoute } from '../middleware/protect.middleware.js';
import { addToCart, getMyCart, removeFromCart } from '../controllers/user.cart.controllers.js';

const router = express.Router();

router.post('/add',userProtectRoute,addToCart);

router.get('/all',userProtectRoute,getMyCart);

router.put('/remove/:productId',userProtectRoute,removeFromCart );

export default router;
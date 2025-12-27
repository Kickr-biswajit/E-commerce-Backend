import express from 'express';
import { buyItems, getMyOrderedItems, totalOrderHistroy } from '../controllers/user.order.controllers.js';
import { userProtectRoute } from '../middleware/protect.middleware.js';

const router = express.Router();

router.post('/buy',userProtectRoute,buyItems);

router.get('/all',userProtectRoute,totalOrderHistroy);

router.get('/all/:orderId',userProtectRoute,getMyOrderedItems);

export default router;
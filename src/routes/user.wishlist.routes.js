import express from 'express';
import { userProtectRoute } from '../middleware/protect.middleware.js';
import { getMyWishlist, toogleWishList } from '../controllers/user.wishlist.controllers.js';

const router = express.Router();

router.put('/toogle/:productId',userProtectRoute,toogleWishList);

router.get('/',userProtectRoute,getMyWishlist)

export default router;
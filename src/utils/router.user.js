import {Router} from 'express'
import auth from '../routes/user.auth-routes.js'
import products from '../routes/user.product.routes.js'
import cart from '../routes/user.cart.routes.js'
import banner from '../routes/user.banner.routes.js'
import order from '../routes/user.order.routes.js'
import wishlist from '../routes/user.wishlist.routes.js'

const router = Router();

router.use('/auth',auth);

router.use('/products',products);

router.use('/cart',cart);

router.use('/banner',banner);

router.use('/order',order);

router.use('/wishlist',wishlist)

export default router;
import {Router} from 'express'
import auth from '../routes/user.auth-routes.js'
import products from '../routes/user.product.routes.js'
import cart from '../routes/user.cart.routes.js'

const router = Router();

router.use('/auth',auth);

router.use('/products',products);

router.use('/cart',cart)

export default router;
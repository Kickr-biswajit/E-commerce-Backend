import { Router } from "express"
import products from '../routes/admin.product.routes.js'
import category from '../routes/admin.category.routes.js'
import adminUser from '../routes/admin.user.routes.js'
import auth from '../routes/admin.auth-routes.js'
import banner from '../routes/admin.banner.routes.js'
import notification from '../routes/admin.notification.routes.js'

const router = Router();

router.use('/product',products);    

router.use('/category',category);

router.use('/user',adminUser);

router.use('/auth',auth);

router.use('/banner',banner);

router.use('/notification',notification)

export default router
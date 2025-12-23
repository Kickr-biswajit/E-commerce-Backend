import express from 'express'
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';
import { getAllUsers, getUsersById } from '../controllers/admin.user.controller.js';

const router = express.Router();

router.get('/all-users',adminProtectRoute,getAllUsers)

router.get('/all-user/:id',adminProtectRoute,getUsersById)

export default router;
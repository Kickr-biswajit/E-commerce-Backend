import express from 'express'
import { adminProtectRoute } from '../middleware/admin.protectMiddleware.js';
import { blockUser,
         deleteUser,
         getAllUsers,
         getBlockedUsers,
         getUsersById, 
         unblockUser } from '../controllers/admin.user.controller.js';

const router = express.Router();

router.get('/all',adminProtectRoute,getAllUsers);

router.get('/all/:id',adminProtectRoute,getUsersById);

router.delete('/delete/:id',adminProtectRoute,deleteUser);

router.post('/block-user/:id',adminProtectRoute,blockUser);

router.post('/unblock-user/:id',adminProtectRoute,unblockUser);

router.get('/blocked-user',adminProtectRoute,getBlockedUsers);

export default router;
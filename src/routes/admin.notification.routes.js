import express from "express";
import { adminProtectRoute } from "../middleware/admin.protectMiddleware.js";
import { allUserNotification, sendNotification } from "../controllers/admin.notification.controllers.js";

const router = express.Router();

router.get('/all',adminProtectRoute,allUserNotification);

router.post('/send',adminProtectRoute,sendNotification)

export default router;
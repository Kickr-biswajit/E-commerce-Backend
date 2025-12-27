import express from "express";
import { getAllBanner, getBannerById } from "../controllers/user.banner.controller.js";
import { userProtectRoute } from "../middleware/protect.middleware.js";

const router  = express.Router();

router.get('/all',userProtectRoute,getAllBanner);

router.get('/:bannerId',userProtectRoute,getBannerById)

export default router;
import { Router } from "express";
import userRoutes from './userRoutes'
import testimonialRoutes from './testimonialRoutes'

const router=Router()

router.use("/user",userRoutes);
router.use("/testimonial",testimonialRoutes)

export default router;
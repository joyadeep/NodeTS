import { Router } from "express";
import {addTestimonial, check, getActiveTestimonial, getTestimonials, toggleTestimonial} from '../controllers/testimonialController'
import {auth} from '../middleware/auth'
const router=Router();

router.get("/check",check)
router.get("/",auth,getTestimonials)
router.get("/active",getActiveTestimonial)
router.post("/",addTestimonial)
router.put("/:id",auth,toggleTestimonial)

export default router;
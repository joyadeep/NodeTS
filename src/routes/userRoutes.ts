import { auth } from "../middleware/auth";
import { checkAcess, loginUser, registerUser } from "../controllers/userController";
import { Router } from "express";

const router=Router();

router.get("/check",(req,res)=>{
    res.status(200).json({message:"checked. OK !"})
})


router.post("/signup",registerUser);
router.post("/login",loginUser)
router.get("/lookup",auth,checkAcess)

export default router;
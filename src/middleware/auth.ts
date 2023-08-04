import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'


export const auth=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        // @ts-ignore
        req.auth=decodeToken
        next();
    } catch (error) {
        return res.status(403).json({message:"invalid token"})
    }
}
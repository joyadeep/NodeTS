import { Request,Response } from "express"
import { prisma } from "../lib/db";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register user
export const registerUser = async(req:Request,res:Response)=>{
    try {
        const {username,email,password}=req.body;
        const existingUser= await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if (existingUser)
            return res.status(403).json({message:"user already exist"})
        const hashedPW= bcrypt.hashSync(password);
        const result= await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPW
            }
        })
        if (!result)
            return res.status(400).json({message:"incomplete field"})
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({message:"cannot register user"})
    } finally{
        prisma.$disconnect();
        console.log("prisma disconnected successfully")
    }
}

// login user
export const loginUser= async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        const user=await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if (!user)
            return res.status(403).json({message:"invalid email or password"})
        const verifyPW=await bcrypt.compare(password,user.password);
        if(!verifyPW)
            return res.status(403).json({message:"invalid email or password"})
        const token=jwt.sign(
            {
                id:user.id,
                email:user.email
        },process.env.JWT_SECRET,{expiresIn:'4h'})
        res.status(200).json({user,token})
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message:"cannot login user ! server error"})
    }
}

export const checkAcess=async(req:Request,res:Response)=>{
    // @ts-ignore
    const {id}=req.auth;
    res.status(200).json({id})
}
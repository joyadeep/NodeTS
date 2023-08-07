import { Request,Response } from "express"
import {prisma} from '../lib/db'

export const check=async(req:Request,res:Response)=>{
    res.status(200).json({message:"checked OK!"})
}

// GET : get all testimonial list
export const getTestimonials=async(req:Request,res:Response)=>{
    try {
        const result=await prisma.testimonial.findMany();
        if(!result)
            return res.status(404).json({message:"result is empty"})
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({message:"cannot fetch testimonials"})
    } finally{
        prisma.$disconnect()
    }
}
//  POST : create new testimonial
export const addTestimonial=async(req:Request,res:Response)=>{
    try {
        const {name,email,image,message,designation}=req.body;
        const result=await prisma.testimonial.create({
            data:{
                name:name,
                email:email,
                image:image,
                message:message,
                designation:designation
            }
        })
        if (!result)
            return res.status(400).json({message:"testimonial not created"})
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({message:"cannot complete operation"})
    } finally{
        prisma.$disconnect()
    }
}
// GET : get active testimonial
export const getActiveTestimonial=async(req:Request,res:Response)=>{
    try {
        const result=await prisma.testimonial.findMany({
            where:{status:true}
        })
        if(!result){
            return res.status(404).json({message:"no data found!"})
        }
        return res.status(200).json({result})
    } catch (error) {
        res.status(500).json({message:"something went wrong in server"})
    } finally{
        prisma.$disconnect()
    }
}

// PUT : update testimonial
export const toggleTestimonial=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.testimonial.findFirst({
            where:{id:id}
        })
        if(!data)
            return res.status(404).json({message:"testimonial not found"})
        const result=await prisma.testimonial.update({
            where:{id:id},
            data:{status:!data.status}
        })
        if(!result)
            return res.status(400).json({message:"cannot update testimonial"})
        res.status(200).json({result})
    } catch (error) {
        res.status(500).json({message:"an error occured !"})
    } finally{
        prisma.$disconnect()
    }
}
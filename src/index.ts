import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app= express();

dotenv.config();
app.use(cors());
app.use(express.json())


app.get("/",(req,res)=>{
    return res.status(200).json({message:"hello from server"})
})

app.listen(3000,()=>{
    console.log("working fine !!")
})

// console.log("working fine")
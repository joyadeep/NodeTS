import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import router from './routes/route'
import router from './routes/index'
const app= express();
const PORT=process.env.PORT || 5001

dotenv.config();
app.use(cors());
app.use(express.json())

app.use("/api/v1",router);

app.get("/",(req,res)=>{
    return res.status(200).json({message:"hello from server"})
})


app.listen(PORT,()=>{
    console.log(`server connected at port ${process.env.PORT}`)
})

// console.log("working fine")
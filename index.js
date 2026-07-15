import mongoose from "mongoose";
import express from 'express'
import { userSchema } from "./schema/user.js";


const app = express()

app.listen(8080,()=>console.log("Server Running"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb://localhost:27017/coading_ott")
.then(()=>console.log("DB Connected"))
.catch(()=>console.log("DB Connection failed"))

app.post("/login",(req,res)=>{
    res.json({message:'login success'})
})

app.post("/signup",async (req,res)=>{
    try{
        const payload = req.body
        await userSchema.create(payload)
        res.status(200).json({message:'Signup Success'})

    }catch(err)
    {
      res.status(500).json({message: err.message})
    }

})
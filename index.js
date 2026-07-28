import mongoose from "mongoose";
import express from 'express'
import { userSchema } from "./schema/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
const secret = 'fcf904ba15d0cfffa4555196bd951449'


const app = express()

app.listen(8080,()=>console.log("Server Running"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect("mongodb://localhost:27017/coading_ott")
.then(()=>console.log("DB Connected"))
.catch(()=>console.log("DB Connection failed"))

app.post("/login",async (req,res)=>{

    try{
     const payload = req.body
    const user = await userSchema.findOne({email:payload.email})
    if(user)
    {
    const tokenPayLoad = {
        id:user.id,
        fullname:user.fullname,
        email:user.email
    }
    const isLogin = await bcrypt.compare(payload.password,user.password)
    if(isLogin)
    {
    const token = jwt.sign(tokenPayLoad, secret, {expiresIn:'7d'})
     res.json({message:'Login Success',
        user:tokenPayLoad,
        token: token
     })
    }else{
        res.status(401).json({message:'Incorrect password'})
    }
    }else{
        res.status(404).json({message:'User not found'})
    }
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

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
import mongoose from "mongoose";
import express from 'express'

const app = express()

app.listen(8080,()=>console.log("Server Running"))

mongoose.connect("mongodb://localhost:27017/coading_ott")
.then(()=>console.log("DB Connected"))
.catch(()=>console.log("DB Connection failed"))

app.post("/login",(req,res)=>{
    res.json({message:'login success'})
})

app.post("/signup",(res,req)=>{
    res.json({message:'signup success'})
})
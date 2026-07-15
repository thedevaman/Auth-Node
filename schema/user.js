import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import emailValidator from 'email-validator'

const schema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate:{
            validator:(email)=>{
             return emailValidator.validate(email)
            },
        message:"Invalid Email"    
        }
    },
    password:{
        type:String,
        required: true
    }
},{timestamps:true})
//pre save run just before data storing in database

//encrypt password
schema.pre('save',async function(){
  const encryptedPassword = await bcrypt.hash(this.password.toString(),12)
  this.password = encryptedPassword
})
//validate uniq email
schema.pre('save',async function(){
   const count = await model('User').countDocuments({email: this.email})
    if(count > 0)
        throw new Error("Email Already Exists")
})

export const userSchema = model("User", schema)
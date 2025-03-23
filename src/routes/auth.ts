import {Router} from "express"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User"
import { JWT_SECRET } from "../constants";

const router= Router();

router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10); 
        const newUser=new User({username,email,password: hashedPassword}) 
        await newUser.save();
        res.status(201).json({message:"User Created Successfullt",data:newUser})

    }catch(error: any){
        res.status(500).json({error: error.message? error.message : `[createUser] Something Went Wrong`})
    }
})

router.post("/login", async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            throw new Error("User Not Found")
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) throw new Error("Invalid Credentials")
        const token=jwt.sign({userId:user._id, role: user.role},JWT_SECRET,{expiresIn: "1h"})      
        res.status(200).json({token: token,role: user.role})
    }catch(error: any){
        res.status(500).json({error: error.message? error.message : `[login] Something Went Wrong`})

    }
})
export default router;
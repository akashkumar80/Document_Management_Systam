import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MONGO_URL, PORT } from "./constants";
import authRoutes from "./routes/auth"
import documentRoutes from "./routes/documents"
import mongoose from "mongoose"
import path from "path";

dotenv.config()

mongoose.connect(MONGO_URL)
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err => console.log("Mongo Connect Error:-",err))
    
const app= express()

app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/documents",documentRoutes)

const port= PORT

app.get("/",(req,res)=>{
    res.send("Server is Running")
})

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})
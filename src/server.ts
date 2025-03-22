import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./constants";

dotenv.config()

const app= express()

app.use(express.json())
app.use(cors())

const port= PORT

app.get("/",(req,res)=>{
    res.send("Server is Running")
})

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})
import express from "express"
import uploads from "../middleware/upload"
import path from "path";
import fs from "fs"
import { BACKENDURL } from "../constants";

const router = express.Router()

router.post("/upload",uploads.single("file"),(req,res)=>{
    if(!req.file){
        res.status(400).json({error:"File Not Uploaded"});
    }else{
        console.log(req.file.path)
        res.json({message:"FIle uploaded successfullt",URL:`${BACKENDURL}/api/documents/${req.file.path}`.replace(/\\/g, "/")})
    }
    
})

router.get("/uploads/:filename",(req,res)=>{
    try{
        const dirname=__dirname.split("src")[0]
        const filePath=path.join(dirname,"uploads",req.params.filename)
        if(!fs.existsSync(filePath)){
            throw new Error()
        }
        res.sendFile(filePath)
    }catch(error: any){
        res.status(404).json({error:"File Not Found"})
    }
    
})
export default router;
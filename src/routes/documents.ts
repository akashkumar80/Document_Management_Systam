import express from "express"
import uploads from "../middleware/upload"

const router = express.Router()

router.post("/upload",uploads.single("file"),(req,res)=>{
    if(!req.file){
        res.status(400).json({error:"File Not Uploaded"});
    }else{
        res.json({message:"FIle uploaded successfullt",filepath:req.file.path})
    }
    
})
export default router;
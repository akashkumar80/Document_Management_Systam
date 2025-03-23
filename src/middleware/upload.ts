import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
     destination: (req,file,cb)=>{
        cb(null,"./uploads")
     },
     filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
     }
})

const uploads=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const allowedTypes= ["application/pdf", "application/msword", "image/png", "image/jpeg"];
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Error("Only .pdf,.doc,.png,.jpg files are allowed"))
            
        }   
        cb(null,true)
    }
})

export default uploads;  
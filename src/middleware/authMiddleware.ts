import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import { IDecodeRequest } from "../interfaces"
import { JWT_SECRET } from "../constants"

export const authenticateUser=(req: IDecodeRequest,res:Response,next:NextFunction)=>{
    try{
        const token=req.header("Authorization")?.split(" ")[1]

        if(!token){
            throw new Error("UnAuthorized: Token NOt Provided")
        }
        if(!JWT_SECRET) throw new Error("JWT_SECRET is missing");
        const decode= jwt.verify(token,JWT_SECRET) as {userId: string, role: string}
        req.user=decode
        next()
    }catch(error: any){
        res.status(401).json(error.message? error.message : {error: "Unauthorized Invalid Token"})
    }
}

export const authorizeRole = (role: string[])=>{
    return (req: IDecodeRequest, res:Response, next: NextFunction)=>{
        try{
            if(!req.user || !role.includes(req.user.role)){
                throw new Error()
            }
            next()
        }catch(error: any){
            res.status(403).json({error:"Forbidden: Access denied"})
        }
       
    }
}
import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import { IDecodeRequest } from "../interfaces"
import { JWT_SECRET } from "../constants"

export const authenticateUser=(req: IDecodeRequest,res:Response,next:NextFunction)=>{
    const token=req.header("Authorization")?.split(" ")[1]

    if(!token){
        return res.status(401).json({error:"UnAuthorized: Token NOt Provided"})

    }
    try{
        if(!JWT_SECRET) throw new Error("JWT_SECRET is missing");
        const decode= jwt.verify(token,JWT_SECRET) as {userId: string, role: string}
        req.user=decode
        next()
    }catch(error: any){
        res.status(401).json({error: "Unauthorized Invalid Token"})
    }
}

export const authorizeRole = (role: string[])=>{
    return (req: IDecodeRequest, res:Response, next: NextFunction)=>{
        if(!req.user || !role.includes(req.user.role)){
            return res.status(403).json({error:"Forbidden: Access denied"})

        }
        next()
    }
}
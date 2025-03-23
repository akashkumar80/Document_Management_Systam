import {Request } from "express"
export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    role: "admin" | "editor" | "viewer"
}

export interface IDecodeRequest extends Request {
    user? : { userId: string,role: string}
}
import dotenv from "dotenv"

dotenv.config()

export const PORT=process.env.PORT ||8000
export const BACKENDURL=process.env.BACKENDURL || "http://localhost:8000"
export const MONGO_URL= process.env.MONGO_URL || "Mongo Connect URL"
export const JWT_SECRET= process.env.JWT_SECRET || "your_secret_jwt_key"
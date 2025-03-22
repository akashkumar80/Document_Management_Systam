import dotenv from "dotenv"

dotenv.config()

export const PORT=process.env.PORT ||8000
export const BACKENDURL=process.env.BACKENDURL || "http://localhost:8000"

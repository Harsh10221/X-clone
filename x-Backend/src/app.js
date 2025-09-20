import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// require('dotenv').config();
// In app.js or index.js
import fs from 'fs';
import path from 'path';

// Define the temporary directory path
// console.log("hello from app.js")
const tmpDir = path.join(process.cwd(), "public", "tmp");

// ✅ Ensure the temporary directory exists
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
    console.log("Created temporary directory for uploads:", tmpDir);
}



const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json())
//browser bundles the form data this middleware encode and 
// made available in our request.body
app.use(express.urlencoded({extended:true,limit:"16kb"})) 
app.use(express.static("public"))
app.use(cookieParser())

//routes

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)

app.listen(8000,()=>{
    console.log('Server running on http://localhost:8000');
    
})

export {app}
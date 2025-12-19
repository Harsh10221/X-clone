import connectDb from "./src/db/connection.js";
// import connectDb from "./src/db/connection.js";
// import connectDb from "./db/index.js";
import express from "express";
// import {app} from "./app.js"
import {app} from "./src/app.js"

// const otpStore = new Map()



import dotenv from 'dotenv'
dotenv.config({path:'./env'})

console.log("The running port is : ",process.env.PORT)

connectDb()

// export default otpStore
import mongoose from "mongoose"
import { DB_NAME } from "../constatns.js"

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host} `);
        
    } catch (error) {
        console.log("Mongodb connection error",error);
        throw error
        
        
    }
}

export default connectDb
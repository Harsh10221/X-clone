import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

// Why the refresh token login is not here like when the accessToken is expired 
// why not directly here ?

// Because the refresh token logic will be visible to every request and like in 
// sql injection attack the attacker can send data/command to manuplate the req
// like the search_Parameter (search bar) like when the search is running 
// then as the accessToken is expired becauese of that the refresthtoken will run and the 
// code will run in the database


const verifyJwt = async (req, res, next) => {
    try {

        const accessToken = req.cookies.accessToken

        // console.log("This is a  ccesstoken ",accessToken)
        // console.log("This is a  ccesstoken ",req.cookies)
        
        if (!accessToken) {
            const error = new Error("Unauthorized request: No token provided")
            error.statuscode = 401
            throw error
        }
        
        
        // console.log("I am here")
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        // console.log("This is a  ccesstoken ",decodedToken)
        

        if (!decodedToken) {
            const error = new Error("There was a error while decoding the token")
            error.statuscode = 400
            throw error
        }

        const user = await User.findById(
            decodedToken._id
        ).select("-password -refreshToken")


        if (!user) {
            const error = new Error("User not found")
            error.statuscode = 400
            throw error
        }

        // console.log("THis is cookies", user)

        req.user = user
        next()
    } catch (error) {
        const customError = new Error(error?.message || "Invalid or expired access token");
        customError.statusCode = 401;
        throw customError
    }
}

// const asyncHandler = (requestHandler) =>{
//     return (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next).catch((err)=> next(err)))
//     }
// }

export default verifyJwt
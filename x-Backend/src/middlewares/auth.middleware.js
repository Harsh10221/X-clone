import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJwt = async (req, res, next) => {
try {
    
        const accessToken = req.cookies.accessToken
    
        if (!accessToken) {
            const error = new Error("Cookies not found")
            error.statuscode = 401
            throw error
        }
    
    
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
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
    const customError = new Error("Invalid or expired access token");
    customError.statusCode = 401;
}
}

// const asyncHandler = (requestHandler) =>{
//     return (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next).catch((err)=> next(err)))
//     }
// }

export default verifyJwt
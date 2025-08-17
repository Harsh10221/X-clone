
const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next).catch((error) => next(error)))
    }
}

export default asyncHandler

//The function wraped is created first , when the app
// start the function has already been created
//  and then the working start 
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log("i am runned successfully")
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("This is response cloudinary",response)

        fs.unlinkSync(localFilePath);
        // console.log("This is response form cloudinary",response)

        return response
    } catch (error) {
        // console.log("i am not done ")

        fs.unlinkSync(localFilePath)
        console.error("Cloudinary upload error", error)
        return null

    }

}


export { uploadOnCloudinary }
import { useState } from "react";

export const useImagePreview = () =>{
    const [selectedImage, setSelectedImage] = useState(null)
    // console.log("This is seleceted,image",selectedImage)
    
    const openPreview = (imageUrl) =>{
        setSelectedImage(imageUrl)
    }

    const closePreview = () =>{
        setSelectedImage(null)
    }
    
    return {
        selectedImage,
        openPreview,
        closePreview
    }
    
}


// export {selectedImage,setSelectedImage,handleCloseModal}
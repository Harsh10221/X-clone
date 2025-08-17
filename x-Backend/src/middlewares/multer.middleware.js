import express from "express";
import multer from "multer";

// const path = (null,'/temp/uploads') => {

// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tmp')

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage:storage })
export default upload


// C:\Users\phans\Desktop\x-Backend\public\tmp
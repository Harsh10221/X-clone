import express from "express";
import multer from "multer";
import path from "path";

// const path = (null,'/temp/uploads') => {

// }

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// console.log("I am from multer",file)
		cb(null, "./public/tmp");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });
export default upload;

// C:\Users\phans\Desktop\x-Backend\public\tmp

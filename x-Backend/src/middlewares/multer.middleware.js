import express from "express";
import multer from "multer";
import path from "path";

// const path = (null,'/temp/uploads') => {

// }

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// const tmpDir = path.join(process.cwd(), "public", "tmp");
		// console.log("Multer writing to:", tmpDir); // 👈 log it
		// // cb(null, path.join(process.cwd(), "public", "tmp"));
		// cb(null, tmpDir)
		cb(null, "./public/tmp");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });
export default upload;

// C:\Users\phans\Desktop\x-Backend\public\tmp

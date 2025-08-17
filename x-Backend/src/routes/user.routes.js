import { Router } from "express";
import { checkUserEmail, checkUserExist, checkUserName, checkUserPassword, generateOtp, loginUser, logoutUser, otpCheck, registerUser } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/register").post(upload.fields(
    [
        { name: 'avatar', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]
    
), registerUser)


router.route("/check-email").post(checkUserEmail)
router.route("/check-username").post(checkUserName)

router.route("/check-userexist").get(checkUserExist)
router.route("/check-password").post(checkUserPassword)


router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser)

router.route("/check-otp").post(otpCheck)
router.route("/generate-otp").post(generateOtp)


export default router


import { Router } from "express";
import { checkUserEmail, checkUserExist, checkUserName, checkUserPassword, generateOtp, loginUser, logoutUser, otpCheck, registerUser } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getfeedTweet, getUserTweet } from "../controllers/tweet.controller.js";
import { followUser, getfollowerList,  getUserProfileInfo, unFollowUser } from "../controllers/follow.controller.js";
import generateRefreshToken from "../utils/refreshToken.js";
import { like, unLike } from "../controllers/like.controller.js";
import { User } from "../models/user.model.js";

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

router.route("/generate-refreshtoken").get(generateRefreshToken)



router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/logout").post(logoutUser)

router.route("/check-otp").post(otpCheck)
router.route("/generate-otp").post(generateOtp)


router.route("/create-post").post(upload.fields(
    [
        { name: 'image', maxCount: 4 },
        { name: 'video', maxCount: 1 },
    ]
),createTweet)

// router.route("/create-post").post(upload.any(),createTweet)

// router.route("/create-post").post(
//     (req, res, next) => {
//         // Use your original .fields() configuration here
//         upload.fields([
//             { name: 'image', maxCount: 4 },
//             { name: 'video', maxCount: 1 },
//         ])(req, res, (err) => {
//             if (err) {
//                 // This will catch any errors from .fields()
//                 console.error("❌ MULTER ERROR CAUGHT:", err);
//                 return res.status(500).json({ message: "File upload failed", error: err });
//             }
//             next();
//         });
//     }, 
//     createTweet // Your original controller
// );


// router.route("/create-post").post(
//     // We will wrap the middleware execution in a custom function
//     (req, res, next) => {
//         // Use the 'any' method to accept all files and debug
//         upload.any()(req, res, (err) => {
//             if (err) {
//                 // ✅ If Multer throws any error, we will catch it here.
//                 console.error("❌ MULTER ERROR CAUGHT:", err);
//                 return res.status(500).json({ message: "File upload failed", error: err });
//             }
//             // If there's no error, move on to the next middleware or controller
//             next();
//         });
//     }, 
//     createTweet // Your original controller
// );


// router.route("/create-post").post(
//     // Use this robust callback structure
//     (req, res, next) => {
//         upload.fields([
//             { name: 'image', maxCount: 4 },
//             { name: 'video', maxCount: 1 },
//         ])(req, res, (err) => {
//             // This will catch any error, including subtle ones from field mismatches.
//             if (err) {
//                 console.error("❌ MULTER ERROR CAUGHT:", err);
//                 return res.status(400).json({ message: "File upload error", error: err.message });
//             }
//             // If everything is fine, proceed to the controller.
//             next();
//         });
//     }, 
//     createTweet
// );



router.route("/get-latest-tweets").get(verifyJwt,getfeedTweet)
router.route("/delete-tweet").post(deleteTweet)


router.route("/follow-user").post(verifyJwt,followUser)
router.route("/unfollow-user").post(verifyJwt,unFollowUser)
router.route("/getuser-posts/:username").get(verifyJwt,getUserTweet)
// router.route("/getuser-posts/:username").get(getUserTweet)
router.route("/get-followerlist/:userId").get(verifyJwt,getfollowerList)
// router.route("/get-userprofileInfo/:userId").get(verifyJwt,getUserProfileInfo)

router.route("/like-user").post(verifyJwt,like)
router.route("/unlike-user").delete(verifyJwt,unLike)

export default router

// posts,
// likeby = by me / logged in User
// islikedbyme = true /false


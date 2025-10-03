import { Router } from "express";
import {
	checkUserEmail,
	checkUserExist,
	checkUserName,
	checkUserPassword,
	generateOtp,
	googleLogin,
	loginUser,
	logoutUser,
	otpCheck,
	registerUser,
	searchForUser,
	updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import {
	createTweet,
	deleteTweet,
	getfeedTweet,
	getPostComments,
	getUserTweet,
} from "../controllers/tweet.controller.js";
import {
	followUser,
	getfollowerList,
	getUserProfileInfo,
	unFollowUser,
} from "../controllers/follow.controller.js";
import generateRefreshToken from "../utils/refreshToken.js";
import { like, unLike } from "../controllers/like.controller.js";
import { User } from "../models/user.model.js";

const router = Router();

router.route("/register").post(
	upload.fields([
		{ name: "avatar", maxCount: 1 },
		{ name: "banner", maxCount: 1 },
	]),
	registerUser
);

router.route("/check-email").post(checkUserEmail);
router.route("/check-username").post(checkUserName);

router.route("/check-userexist").get(checkUserExist);
router.route("/check-password").post(checkUserPassword);

router.route("/generate-refreshtoken").get(generateRefreshToken);

router.route("/google-login").post(googleLogin);

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/update-profile").post(
	upload.fields([
		{ name: "avatar", maxCount: 1 },
		{ name: "banner", maxCount: 1 },
	]), verifyJwt,updateProfile
);

	
router.route("/logout").post(logoutUser);

router.route("/check-otp").post(otpCheck);
router.route("/generate-otp").post(generateOtp);

router.route("/find-user/:query").get(searchForUser);

router.route("/create-post").post(
	upload.fields([
		{ name: "image", maxCount: 4 },
		{ name: "video", maxCount: 1 },
	]),
	createTweet
);

router.route("/get-latest-tweets").get(verifyJwt, getfeedTweet);
router.route("/delete-tweet").post(deleteTweet);

router.route("/follow-user").post(verifyJwt, followUser);
router.route("/unfollow-user").post(verifyJwt, unFollowUser);
router.route("/getuser-posts/:username").get(verifyJwt, getUserTweet);
// router.route("/getuser-posts/:username").get(getUserTweet)
router.route("/get-followerlist/:userId").get(verifyJwt, getfollowerList);
router.route("/get-postcomments/:postid").get(verifyJwt, getPostComments);
// router.route("/get-userprofileInfo/:userId").get(verifyJwt,getUserProfileInfo)

router.route("/like-user").post(verifyJwt, like);
router.route("/unlike-user").delete(verifyJwt, unLike);

export default router;

// posts,
// likeby = by me / logged in User
// islikedbyme = true /false

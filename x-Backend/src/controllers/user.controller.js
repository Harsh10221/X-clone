// import cookieParser from "cookie-parser";
import { User } from "../models/user.model.js";
import otpStore from "../otpStore.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import {semnd}
import sendCodeAndCheck from "../utils/otpCheck.js";
// cookieParser

const checkUserEmail = asyncHandler(async (req, res) => {
	// console.log(req.body)
	const email = req.body.email;
	// console.log("this is email ",email)

	if (!email) {
		const err = new Error("Email is requiered");
		err.statuCode = 400;
		throw err;
	}

	const isExist = await User.findOne({
		email,
	});

	if (isExist) {
		return res.status(400).json({
			message: "Email is already registered",
			statusCode: 400,
		});
	}

	return res.status(200).json({
		message: "User is not Exist",
		statusCode: 200,
	});
});

const checkUserName = asyncHandler(async (req, res) => {
	const userName = req.body.userName;

	const result = await User.findOne({ userName });

	if (result) {
		return res.status(400).json({
			message: "Username is already taken",
		});
	} else {
		return res.status(200).json({
			message: "Username is unique",
		});
	}
});

const registerUser = asyncHandler(async (req, res) => {
	// console.log(req.body)
	// console.log(req.files.avatar[0].path)
	console.log("This is req.body", req.body);

	const { userName,fullName, password, email, bio, year, month, day } = req.body;

	const dateOfBirth = new Date(year, month - 1, day);

	console.log("This is date of birth", dateOfBirth);
	console.log("This is This is uername", userName);

	if (!userName || !password || !email) {
		const error = new Error("All fields are required");
		error.statuCode = 400;
		throw error;
	}

	const result = await User.findOne({
		$or: [
			{
				userName,
			},
			{ email },
		],
	});

	// console.log("this is user",result);

	if (result) {
		const error = new Error();
		error.message = "User already exist";
		error.statusCode = 400;
		throw error;
	}

	const avatarPath = req.files.avatar[0].path;
	// const bannerPath = req.files.banner[0].path

	const avatarUrl = await uploadOnCloudinary(avatarPath);
	// const bannerUrl = await uploadOnCloudinary(bannerPath)

	// console.log(data)

	const user = await User.create({
		userName,
		password,
		email,
		fullName,
		// fullName,
		dob: dateOfBirth,
		avatarUrl: avatarUrl.url,
		// bannerUrl: bannerUrl.url,

		bio,
	});

	console.log("This is user", user);

	return res.json({
		statuCode: 201,
		message: "user created successfully",
	});
});

const loginUser = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { userName, email, password } = req.body;

	const user = await User.findOne({
		$or: [{ userName }, { email }],
	});

	if (!user) {
		const error = new Error("User not exist");
		error.statusCode = 400;
		throw error;
	}

	const result = await user.isPasswordCorrect(password);

	// console.log("This is result ",result)

	if (!result) {
		const error = new Error("Password is incorrect");
		error.statusCode = 401;
		throw error;
	}
	// let userData = user
	// delete userData.password
	// delete userData.updatedAt
	// // userData.delete = updatedAt
	let userData = user.toObject();
	delete userData.password;
	delete userData.updatedAt;

	// console.log("This is userdata", userData.password)
	// console.log("This is user", userData)

	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();

	const Updatedoc = await User.findByIdAndUpdate(
		user._id,
		{ refreshToken: refreshToken },
		{ new: true }
	);
	// console.log("THis is doc of usercontroller", Updatedoc)

	// console.log("This is access token ", accessToken)
	// console.log("This is refresh token ", refreshToken);

	const options = {
		httpOnly: true,
		secure: false,
	};
	// console.log("THis is new refreshtoken ",refreshToken)

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json({
			success: true,
			message: "User logged in successfully",
			userData,
		});
});

const checkUserExist = asyncHandler(async (req, res) => {
	const username_or_email = req.query.emailorUsername;

	// console.log("This is req.query", req.query)

	if (!username_or_email) {
		const error = new Error("Username or Email is required");
		error.statuCode = 400;
		throw error;
	}

	const userExist = await User.findOne({
		$or: [
			{
				userName: username_or_email,
			},
			{
				email: username_or_email,
			},
		],
	});

	if (userExist) {
		return res.status(200).json({
			exists: true,
			message: "User found",
		});
	} else {
		return res.status(200).json({
			exists: false,

			message: "User not found",
		});
	}
});

const checkUserPassword = asyncHandler(async (req, res) => {
	const { password, emailorUsername } = req.body;
	// console.log("This is req.body", req.body);
	// console.log("This is email", emailorUsername)
	// console.log("This is hello form checkpass")

	const user = await User.findOne({
		$or: [{ email: emailorUsername }, { userName: emailorUsername }],
	});
	// console.log("THis is user ", user);

	if (!user) {
		const error = new Error("User not exist");
		error.statusCode = 400;
		throw error;
	}

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect) {
		throw new ApiError(400, "Password is incorrect");
	}

	const userData = user.toObject();
	delete userData.password;
	delete userData.updatedAt;

	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();
	// console.log("THis is password status", isPasswordCorrect)

	const Updatedoc = await User.findByIdAndUpdate(
		user._id,
		{ refreshToken: refreshToken },
		{ new: true }
	);

	// const options = {
	// 	httpOnly: true,
	// 	secure: false,
	// 	maxAge:
	// };

	// if (isPasswordCorrect) {
	return res
		.status(200)
		.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		})
		.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			maxAge: 10 * 24 * 60 * 60 * 1000,
		})
		.json({
			success: true,
			message: "User logged in successfully",
			userData,
		});
	// } else {
	// 	return res.status(400).json({
	// 		message: "Password is incorrect ",
	// 	});
	// }
});

const logoutUser = asyncHandler(async (req, res) => {
	// const user_id = req.user._id
	// console.log("i am here logout ", req.cookies);

	const options = {
		httpOnly: true,
		secure: false,
		// sameSite:"none",
		// path: "/"
	};

	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json({
			success: true,
			message: "User logged out successfully",
		});
});

const otpCheck = asyncHandler(async (req, res) => {
	const email = req.body.email;
	const userOtp = req.body.otp;

	if (!email || !userOtp) {
		const error = new Error("Email or User otp is required");
		error.statusCode = 400;
		throw error;
	}

	const storedData = otpStore.get(email);
	console.log("This is stored data", storedData);
	console.log("This is formated time", storedData.expires);

	if (storedData.otpCode == userOtp) {
		return res.status(200).json({
			message: "Your verification was successfully",
		});
	}
	if (Date.now() >= storedData.expires) {
		return res.status(400).json({
			message: "Your Otp was expired",
		});
	} else {
		return res.status(400).json({
			message: "Otp didnt match",
		});
	}

	// const otp = await sendCodeAndCheck(email)

	// console.log("This is otp ",otp)
});

const generateOtp = asyncHandler(async (req, res) => {
	// console.log("This is req,body",req.body);

	const email = req.body.email;

	// console.log("This is email",email);
	if (!email) {
		const error = new Error("Email is required");
		error.statusCode = 400;
		throw error;
	}

	sendCodeAndCheck(email);

	return res.json({
		message: "The otp generate successfully",
	});
});

const searchForUser = asyncHandler(async(req,res)=>{
	const searchQuery = req.params.query
	// console.log("thi is searchQuery",searchQuery)
	
	if (!searchQuery) {
		throw new ApiError(400,"Search query is empty")
	}
	
	const searchRegex = new RegExp(searchQuery,'i')
	
	// console.log("thi is searchregex",searchRegex)


	const results = await User.find({
		userName:{$regex:searchQuery}
	}).select("-refreshToken -password -email -updatedAt -__v ")

	return res.status(200).json({
		message:"ok",
		results
	})


})

export {
	registerUser,
	loginUser,
	logoutUser,
	checkUserEmail,
	otpCheck,
	generateOtp,
	checkUserName,
	checkUserExist,
	checkUserPassword,
	searchForUser
};

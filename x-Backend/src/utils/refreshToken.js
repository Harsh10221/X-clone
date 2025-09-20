import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";
import jwt from "jsonwebtoken";

const generateNewRefreshToken = async (req, res) => {
	try {
		const userRefreshToken = req.cookies.refreshToken;

		if (!userRefreshToken) {
			throw new ApiError(
				401,
				"Unauthorized request: Refresh token is required"
			);
		}

		const isValid = jwt.verify(
			userRefreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		const user = await User.findById(isValid._id);

		if (!user) {
			throw new ApiError(401, "Invalid refresh token: User not found");
		}

		if (user.refreshToken !== userRefreshToken) {
			throw new ApiError(400, "Token didnt match ");
		}

		const newAccessToken = user.generateAccessToken();
		const newRefreshToken = user.generateRefreshToken();

		// const updateDoc = await User.findByIdAndUpdate(
		//     isValid._id,
		//     { refreshToken: newRefreshToken },
		//     { new: true }

		// )
		user.refreshToken = newRefreshToken;
		await user.save({ validateBeforeSave: false });

		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.cookie("accessToken", newAccessToken, options)
			.cookie("refreshToken", newRefreshToken, options)
			.json({
				success: true,
				message: "The refresh token generated",
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
	} catch (error) {
		throw new ApiError(400, error || "Error while generating refreshToken");
	}
};

export default generateNewRefreshToken;

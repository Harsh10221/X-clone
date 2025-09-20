import mongoose from "mongoose";
import { FollowerModel } from "../models/follow.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const followUser = asyncHandler(async (req, res) => {
	const { followerId, followingId } = req.body;

	const session = await mongoose.startSession();

	if (!followingId || !followerId) {
		throw new ApiError(400, "All fields required");
	}

	const isExist = await FollowerModel.findOne({
		follower: followerId,
		following: followingId,
	});

	if (isExist) {
		throw new ApiError(400, "Already followed");
	}

	session.startTransaction();

	const result = await FollowerModel.create(
		[
			{
				follower: followerId,
				following: followingId,
			},
		],
		{ session }
	);

	const followingUpdate = await User.findByIdAndUpdate(
		followerId,
		{
			$inc: { followings: 1 },
		},
		{ session }
	);

	const followerUpdate = await User.findByIdAndUpdate(
		followingId,
		{
			$inc: { followers: 1 },
		},
		{ session }
	);

	await session.commitTransaction();

	return res.json({
		message: "follow successfull",
	});
});

const unFollowUser = asyncHandler(async (req, res) => {
	const { followingId, followerId } = req.body;

	const session = await mongoose.startSession();

	if (!followingId || !followerId) {
		throw new ApiError(400, "All fields are required");
	}

	// session.startTransaction();

	// const result = await FollowerModel.findOne({
	// 	follower: followerId,
	// 	following: followingId,
	// });
	try {
		session.startTransaction();

		const result = await FollowerModel.deleteOne(
			{
				follower: followerId,
				following: followingId,
			},
			{ session }
		);

		if (result.deletedCount === 0) {
			throw new ApiError(
				404,
				"Could not find the follow relationship to delete."
			);
		}

		const followingDecrement = await User.findByIdAndUpdate(
			followerId,
			{ $inc: { followings: -1 } },
			{ session, new: true } // 'new: true' returns the updated doc for logging
		);
		const followerDecrement = await User.findByIdAndUpdate(
			followingId,
			{ $inc: { followers: -1 } },
			{ session, new: true }
		);

		// console.log("All operations successful. Committing transaction...");
		await session.commitTransaction();

		return res
			.status(200)
			.json(new ApiResponse(200, {}, "Unfollowed user successfully."));
	} catch (error) {
		await session.abortTransaction();

		console.error("❌ TRANSACTION FAILED AND ROLLED BACK:", error);

		throw new ApiError(500, "Transaction failed.", [], error.stack);
	}

	return res.json({
		message: "unfollow user successfully",
	});
});

const getfollowerList = asyncHandler(async (req, res) => {
	// const userId = req.user._id
	const userId = req.body.userId;

	const result = await FollowerModel.find({
		following: userId,
		// }).populate("follower","userName")
	}).populate("follower", "-password -__v -updatedAt -refreshToken ");

	console.log("this is result ", result);

	return res.json({
		result,
		message: "Fetched successfullly",
	});
});

const getUserProfileInfo = asyncHandler(async (req, res) => {
	const userId = req.params.userId;
	// console.log("THis is userid",req.params.userId)

	// console.log("this is userid",userId)
	const result = await User.findById(userId);
	// console.log("this is result ",result)

	return res.json({
		result,
	});
});

export { followUser, unFollowUser, getfollowerList, getUserProfileInfo };

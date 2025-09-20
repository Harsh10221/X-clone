import {
	HardforkMismatchError,
	TransactionRevertedWithoutReasonError,
} from "web3";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Tweet } from "../models/tweet.model.js";
import { LikeModel } from "../models/like.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
// import session from "express-session";

const like = asyncHandler(async (req, res) => {
	const mongosession = await mongoose.startSession();
	try {
		const { postId } = req.body;
		const likedBy = req.user._id;

		// console.log("this are data", postId, likedBy);

		if (!likedBy || !postId) {
			throw new ApiError(400, "All fields are required");
		}

		// console.log("i am at 1");

		const postExist = await Tweet.findById(postId);
		// console.log("i am at 2");

		if (!postExist) {
			throw new ApiError(404, "Post not found ");
		}

		const alreadyLiked = await LikeModel.findOne({ postId, likedBy });
		// console.log("i am at 3");

		if (alreadyLiked) {
			throw new ApiError(400, "You have already liked this post.");
		}

		const authorExist = await User.findById(postExist.author);

		if (!authorExist) {
			throw new ApiError(502, "Author not found ");
		}

		mongosession.startTransaction();

		const result = await LikeModel.create(
			[
				{
					postId,
					likedBy,
					author: authorExist._id,
				},
			],
			{ mongosession }
		);
		// console.log("this is postid", postId);

		const post = await Tweet.findByIdAndUpdate(
			postId,
			{ $inc: { likeCount: +1 } },
			{ mongosession }
		);
		// await Tweet.updateOne({postId}, { $inc: { likeCount: +1 } }, { session });
		// console.log("this is updatedpost", post);

		await mongosession.commitTransaction();

		// console.log("this is doc",doc)

		if (!result) {
			throw new ApiError(501, "Error while creating doc  ");
		}

		return res.status(201).json({
			message: "ok",
			result,
		});
	} catch (error) {
		if (mongosession.inTransaction()) {
			await mongosession.abortTransaction();
			// console.log("Transaction aborted due to an error.");
		}
		throw error;
	} finally {
		await mongosession.endSession();
	}
});

const unLike = asyncHandler(async (req, res) => {
	const mongosession = await mongoose.startSession();
	try {
		const { postId } = req.body;
		const likedBy = req.user._id;

		// console.log("this are data", postId, likedBy);

		if (!likedBy || !postId) {
			throw new ApiError(400, "All fields are required");
		}

		mongosession.startTransaction();

		const deletedPost = await LikeModel.deleteOne(
			{
				postId,
				likedBy,
			},
			{ mongosession }
		);
		// console.log("This is delete status", deletedPost);

		if (deletedPost.deletedCount == 0) {
			throw new ApiError(400, "Error while Unlike the post");
		}

		await Tweet.updateOne(
			{ _id: postId },
			{ $inc: { likeCount: -1 } },
			{ mongosession }
		);

		await mongosession.commitTransaction();

		// if (!result) {
		// 	throw new ApiError(501, "Error while creating doc  ");
		// }

		return res.status(201).json({
			message: "Unlike post success",
		});
	} catch (error) {
		await mongosession.abortTransaction();
		throw error;
	} finally {
		await mongosession.endSession();
	}
});

export { like, unLike };

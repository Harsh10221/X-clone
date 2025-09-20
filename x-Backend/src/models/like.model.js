import mongoose, { Mongoose, Schema } from "mongoose";

const LikeSchema = new Schema({
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tweet",
		require: true,
	},
	likedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		require: true,
	},
});

export const LikeModel = mongoose.model("LikeModel", LikeSchema);

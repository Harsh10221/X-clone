import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const followSchema = new Schema({
	follower: {
		// jinhone kiya muze hai, shub
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	},
	following: {
		// kisko kiya hai , harsh
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
	},
});

export const FollowerModel = mongoose.model("FollowerModel", followSchema);

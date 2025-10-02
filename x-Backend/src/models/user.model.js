import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		fullName: {
			type: String,
			// required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},

		// password: {
		// 	type: String,
		// 	required: function () {
		// 		return this.authProvide === "local";
		// 	},
		// 	trim: true,
		// },
		// authProvider: {
		// 	type: String,
		// 	required: true,
		// 	enum: ["local", "google"],
		// 	default: "local",
		// },
		// googleId: {
		// 	type: String,
		// 	unique: true,
		// 	sparse: true,
		// },

		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid address",
			],
		},
		avatarUrl: {
			type: String,
			// required: true,
			trim: true,
		},
		bannerUrl: {
			type: String,
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
		},
		dob: {
			type: Date,
			// required:true,
		},
		refreshToken: {
			type: String,
		},
		followers: {
			type: Number,
			default: 0,
		},
		followings: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	//on first singnup this will return true as there is not doc exist yet
	// when the doc update this will run normal
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

export const User = mongoose.model("User", userSchema);

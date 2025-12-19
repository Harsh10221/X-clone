// import { promises } from "nodemailer/lib/xoauth2/index.js";
import { Tweet } from "../models/tweet.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import { FollowerModel } from "../models/follow.model.js";
import { clients } from "../app.js";

// const tweet = await Tweet.findById(someId).populate('author');

const createTweet = asyncHandler(async (req, res) => {
	const { author, userInput, parentTweetId, type } = req.body;
	// console.log("This is userobj",req.user)
	// console.log("This is username",req.user.userName)

	if (!author || userInput.length == 0) {
		const error = new Error("All fields are required");
		error.status = 400;
		throw error;
	}

	const tweedData = {
		author,
		text: userInput,
		parentTweetId,
	};

	if (type) {
		const localFilePath = req.files[type]?.map((item) => item.path);
		const uploadPromise = localFilePath?.map((path) =>
			uploadOnCloudinary(path)
		);

		const cloudinaryResponse = await Promise.all(uploadPromise);
		const urls = cloudinaryResponse.map((obj) => obj.url);

		const media = {
			mediaType: type,
			urls,
		};
		tweedData.media = media;
	}

	const newTweet = await Tweet.create(tweedData);

	if (!newTweet) {
		throw new ApiError(500, "Error while creating a post");
	}

	// return res.json({ message: "The tweet is created Successfully" });

	try {
		const followers = await FollowerModel.find({ following: author });
		const followersIds = followers.map((doc) => doc.follower);

		// console.log("this is followers", followersIds);

		// const followers = author.followers;

		const tweetData = await Tweet.findById(newTweet._id).populate(
			"author",
			"-password -__v -email -updatedAt -refreshToken "
		);
		// console.log("This is tweetdata",tweetData)

		const notification = {
			type: "NEW_POST",
			payload: {
				message: `New post from  ${tweetData?.userName}`,
				post: tweetData,
			},
		};

		followersIds.forEach((followerId) => {
			// console.log("This is one followerid",followerId)
			const followerSocket = clients.get(followerId.toString());

			if (followerSocket && followerSocket.readyState === WebSocket.OPEN) {
				{
					// console.log("messeage send ")

					followerSocket.send(JSON.stringify(notification));
				}
			} else {
				console.log("i am not sending message sorry from websocket ");
			}
		});
	} catch (error) {
		console.error("WebSocket notification error:", error);
	}

	return res.json({ message: "The tweet is created Successfully" });
});

const editTweet = asyncHandler(async (req, res) => {
	// urserinput changed
	// previousimgae
	// remove preimage
	// newimgage

	const { postId, type, userInput, prevImg } = req.body;

	console.log("This is req.body", req.body);
	console.log("This is req.files", req.files);

	console.log("This is previous image", prevImg);

	if (!postId || !userInput) {
		throw new ApiError(400, "All fields are required");
	}

	const editedData = {
		text: userInput,
	};
	//preserve previous image and chagned the userinput

	if (prevImg) {
		console.log("i am from when previous image");

		const resultWhenImgSame = await Tweet.findByIdAndUpdate(
			postId,
			{
				$set: {
					text: userInput,
					// media: {
					// 	mediaType: type,
					// 	urls: prevImg ,
					// },
				},
			},
			{ new: true }
		);

		return res.json({
			message: "Post updated successfully , with same image",
		});
	}

	if (!prevImg && !type) {
		console.log("i am from when No previous image");

		const resultWhenNoImage = await Tweet.findByIdAndUpdate(
			postId,
			{
				$set: {
					text: userInput,
					media: {
						mediaType: null,
						urls: null,
					},
				},
			},
			{ new: true }
		);

		return res.json({
			message: "Post updated successfully , with no image",
		});
	}

	if (type) {
		console.log("i am from when New  image");

		console.log(req.files);

		const localFilePath = req.files[type]?.map((item) => item.path);
		const uploadPromise = localFilePath?.map((path) =>
			uploadOnCloudinary(path)
		);

		const cloudinaryResponse = await Promise.all(uploadPromise);

		console.log("This is response", cloudinaryResponse);

		const urls = cloudinaryResponse.map((obj) => obj.url);
		const pubId = cloudinaryResponse.map((obj) => obj.public_id);

		const media = {
			mediaType: type,
			urls,
			pubId,
		};

		const resultWhenNewImage = await Tweet.findByIdAndUpdate(
			postId,
			{
				$set: {
					text: userInput,
					media,
				},
			},
			{ new: true }
		);

		return res.json({
			message: "Post updated successfully , with new image",
		});

		// editedData.media = media

		// const responseFromCloudinary = uploadOnCloudinary()

		// const resultWhenNoImage = await Tweet.findByIdAndUpdate(
		// 	postId,
		// 	{
		// 		$set: {
		// 			text: editedData,
		// 			media: {
		// 				mediaType: null,
		// 				urls: null ,
		// 			},
		// 		},
		// 	},
		// 	{ new: true }
		// );
	}

	// 	return console.log(
	// 		"This is result when no change in image",
	// 		resultWhenImgSame
	// 	);
	// }

	// const result = Tweet.findByIdAndUpdate({
	// 	postId,
	// 	$set: { text: userInput, type,
	// 		mediaType:{

	// 		}
	// 	 },
	// });

	// console.log("This is postid", postId);

	// const result = await Tweet.findByIdAndUpdate(postId, {
	// 	set: {
	// 		text,
	// 		mediaType,
	// 	},
	// });

	// console.log("This is result", result);

	return res.json({
		message: "ok",
	});
});

const deleteTweet = asyncHandler(async (req, res) => {
	const tweetId = req.body.postId;
	// console.log("This is tweetid ", tweetId);
	// console.log("This is body ", req.body);

	if (!tweetId) {
		const error = new Error("Tweet id is required");
		// error.message("Tweet id is required")
		error.status = 400;
	}

	const result = await Tweet.findByIdAndDelete(tweetId);

	// console.log("This is result ", result);
	if (result) {
		return res.status(200).json({
			message: "The tweet is deleted",
		});
	} else {
		return res.status(404).json({
			message: "No tweet found ",
		});
	}
});

const getUserTweet = asyncHandler(async (req, res) => {
	// const authorId = 0;
	const loggedInUser = req.user._id;
	const authorId = req.params.username;

	const result = await Tweet.aggregate([
		[
			{
				$match: {
					author: new mongoose.Types.ObjectId(authorId),
				},
			},
			{
				$lookup: {
					from: "followermodels",
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [
										{
											$eq: [
												"$follower",
												new mongoose.Types.ObjectId(loggedInUser),
											],
										},
										{
											$eq: [
												"$following",
												new mongoose.Types.ObjectId(authorId),
											],
										},
									],
								},
							},
						},
					],
					as: "isfollowed",
				},
			},
			{
				$lookup: {
					from: "likemodels",
					let: {
						postid: "$_id",
					},
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [
										{
											$eq: [
												"$likedBy",
												new mongoose.Types.ObjectId(loggedInUser),
											],
										},
										{
											$eq: ["$postId", "$$postid"],
										},
									],
								},
							},
						},
					],
					as: "isliked",
				},
			},
			{
				$addFields: {
					isFollowedByYou: {
						$gt: [
							{
								$size: "$isfollowed",
							},
							0,
						],
					},
					isLikedByYou: {
						$gt: [
							{
								$size: "$isliked",
							},
							0,
						],
					},
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "author",
					foreignField: "_id",
					as: "author",
				},
			},
			{
				$unwind: "$author",
			},
			{
				$project: {
					isfollowed: 0,
					isliked: 0,
					"author.password": 0,
					"author.updatedAt": 0,
					"author.refreshToken": 0,
					"author.__v": 0,
					"author.email": 0,
				},
			},
		],
	]);
	// console.log("this is result", result);

	return res.status(200).json({
		message: "fetched sucessfully",
		result,
	});
});

const getfeedTweet = asyncHandler(async (req, res) => {
	// console.log("This is cookies",req.cookies)

	// const latestTweets = await Tweet.find({
	// 	parentTweetId: { $exists: false },
	// })
	// 	.populate("author", "-password -__v -updatedAt -refreshToken -email -dob ")
	// 	.sort({ createdAt: -1 })
	// 	// .sort({ parentTweetId: "" })
	// 	.limit(10);

	const loggedInUser = req.user._id;

	// const page = parseInt(req.query.page) || 1;
	// const skip = (page - 1) * limit;

	const cursor = req.query.cursor;
	const limit = parseInt(req.query.limit) || 10;

	// console.log("this is cursor",req.query)

	const matchCriteria = {};

	if (cursor) {
		matchCriteria.createdAt = { $lt: new Date(cursor) };
	}

	const latestTweets = await Tweet.aggregate([
		{
			$match: matchCriteria,
			// $match: { parentTweetId: { $exists: false } },
		},
		{
			$match: { parentTweetId: { $exists: false } },
		},
		{ $sort: { createdAt: -1 } },
		{
			$limit: limit,
		},
		{
			$lookup: {
				from: "users",
				localField: "author",
				foreignField: "_id",
				as: "author",
			},
		},
		{
			$unwind: "$author",
		},
		{
			$lookup: {
				from: "likemodels",
				let: { postId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{
										$eq: [
											"$likedBy",
											new mongoose.Types.ObjectId(loggedInUser),
										],
									},
									{ $eq: ["$postId", "$$postId"] },
								],
							},
						},
					},
				],
				as: "result",
			},
		},
		{
			$addFields: {
				isLikedByYou: { $gt: [{ $size: "$result" }, 0] },
			},
		},
	]);

	const nextCursor =
		latestTweets.length === limit
			? latestTweets[latestTweets.length - 1].createdAt
			: null;

	// console.log("Latest tweets", latestTweets)

	return res.json({
		// latestTweets,
		posts: latestTweets,
		nextCursor,
	});
});

const getPostComments = asyncHandler(async (req, res) => {
	const postId = req.params.postid;

	if (!postId) {
		throw new ApiError(400, "Post id is required");
	}

	// parentTweetId: ObjectId("68c07b34a60e647c938cf2f5"),
	// parentTweetId: postId,
	const result = await Tweet.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "author",
				foreignField: "_id",
				as: "author",
			},
		},
		{
			$match: {
				parentTweetId: new mongoose.Types.ObjectId(postId),
			},
		},
		{
			$unwind: "$author",
		},
		{
			$sort: { createdAt: -1 },
		},
	]);

	// if (result.length <= 0) {
	// 	throw new ApiError(400, "");

	// }

	return res.json({
		message: "ok",
		result,
	});
});

const getPostWithId = asyncHandler(async (req, res) => {
	// console.log("This is user",req.user)
	const loggedInUser = req.user._id;
	const postId = req.params.query;
	// console.log("This is postid", postId);

	const result = await Tweet.aggregate([
		[
  {
    '$match': {
      '_id': new mongoose.Types.ObjectId(postId)
    }
  }, {
    '$lookup': {
      'from': 'likemodels', 
      'let': {
        'postid': '$_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$and': [
                {
                  '$eq': [
                    '$$postid', '$postId'
                  ]
                }, {
                  '$eq': [
                    '$likedBy', new mongoose.Types.ObjectId(loggedInUser)
                  ]
                }
              ]
            }
          }
        }
      ], 
      'as': 'likedStatus'
    }
  }, {
    '$addFields': {
      'isLikedByYou': {
        '$gt': [
          {
            '$size': '$likedStatus'
          }, 0
        ]
      }
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'author', 
      'foreignField': '_id', 
      'as': 'author'
    }
  }, {
    '$unwind': '$author'
  }, {
    '$project': {
      '__v': 0, 
      'author.password': 0, 
      'author.updatedAt': 0, 
      'author.refreshToken': 0, 
      'author.__v': 0, 
      'author.email': 0, 
      'likedStatus': 0
    }
  }
]
	]);

	// console.log("This is result from aggegration pipeline", result);

	return res.json({
		message: "Ok",
		result,
	});
});

export {
	createTweet,
	deleteTweet,
	getfeedTweet,
	getUserTweet,
	getPostComments,
	editTweet,
	getPostWithId,
};

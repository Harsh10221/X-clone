
const loggedInUser = req.user._id; //id  68a0f15b808d18692450216a
const user_id = req.params.username; //id  6897a9ddcc6ae94342f248fb

{
follower = loggedinuser
following = user_id 
}

likedBy = loggedinuser
post_id = current doc post id 













































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
			$match: { "author.userName": userName },
		},
		
		{
			$lookup: {
				from: "followermodels", // target collection
				let: { author_id: "$author._id" }, // variables from parent doc
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ["$follower", new mongoose.Types.ObjectId(loggedInUser)] },
									{ $eq: ["$following", "$$author_id"] },
								],
							},
						},
					},
				],
				as: "isfollowed",
			},
		},
		{
			$addFields: {
				isFollowedByYou: { $gt: [{ $size: "$isfollowed" }, 0] },
			
			},
		},
		{
			$lookup: {
				from: "likemodels",
				// localField: "author",
				let: { tweetId: "$_id" }, //tweet colletion ka id
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ["$postId", "$$tweetId"] },
									{
										$eq: [
											"$likedBy",
											new mongoose.Types.ObjectId(loggedInUser),
										],
									},
								],
							},
						},
					},
					{
						$project: { _id: 1 },
					},
				],
				as: "likeStatus",
			},
		},
		{
			$addFields: {
				isLikedByYou: { $gt: [{ $size: "$likeStatus" }, 0] },
			},
		},
		{
			$project: {
				likeStatus: 0,
				__v: 0,
				isfollowed: 0
			},
		},
		{ $sort: { createdAt: -1 } },
		{ $skip: 0 },
		{ $limit: 10 },
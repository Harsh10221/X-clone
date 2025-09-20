import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import { arrayBuffer } from "stream/consumers";

const tweetSchema = new Schema({
    parentTweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    text: {
        type: String,
        required: true

    },

    media: {

        mediaType: {
            type: String,
            enum: ['image', "video"]
        },
        urls: {
            type: Array,
        }
    },

    likeCount: {
        type: Number,
        default:0
    },
    repostCount: {
        type: Number,
        default:0
    },
    commentCount: {
        type: Number,
        default:0
    }
}, { timestamps: true }
)

export const Tweet = mongoose.model("Tweet", tweetSchema)
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
},

description: {
    type: String,
    required: true,
},

thumbnailUrl: {
    type: String,
    required: true,
},

videoUrl: {
    type: String,
    required: true,
},

uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},

channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
},

category: {
    type: String,
    required: true,
},

views: {
    type: Number,
    default: 0,
},

likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],

dislikes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
],

},
{
timestamps: true,
}
);

const Video = mongoose.model("Video", videoSchema);

export default Video; 
import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },
    },
    { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
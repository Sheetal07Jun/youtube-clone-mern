import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// 💬 CREATE COMMENT (Protected)
export const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { videoId } = req.params;

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const newComment = await Comment.create({
            videoId,
            userId: req.user.id,
            text,
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 💬 GET COMMENTS FOR A VIDEO
export const getCommentsByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ videoId })
            .populate("userId", "username")
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 💬 UPDATE COMMENT (Only Owner)
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        comment.text = req.body.text || comment.text;
        await comment.save();

        res.status(200).json({
            message: "Comment updated successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 💬 DELETE COMMENT (Only Owner)
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await comment.deleteOne();

        res.status(200).json({
            message: "Comment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
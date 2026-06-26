import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// 🎥 CREATE VIDEO
export const createVideo = async (req, res) => {
    try {
        const {
            title,
            description,
            thumbnailUrl,
            videoUrl,
            category,
        } = req.body;

        const channel = await Channel.findOne({
            owner: req.user.id,
        });

        if (!channel) {
            return res.status(400).json({
                message:
                    "You must create a channel before uploading videos",
            });
        }

        const newVideo = await Video.create({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            category,
            uploader: req.user.id,
            channelId: channel._id,
        });

        res.status(201).json({
            message: "Video created successfully",
            video: newVideo,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🎥 GET ALL VIDEOS
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate("uploader", "username")
            .populate("channelId", "channelName");

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🎥 GET SINGLE VIDEO
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate("uploader", "username")
            .populate("channelId", "channelName");

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🎥 UPDATE VIDEO
export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        if (video.uploader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🎥 DELETE VIDEO
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        if (video.uploader.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await video.deleteOne();

        res.status(200).json({
            message: "Video deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 👍 LIKE VIDEO
export const likeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        const userId = req.user.id;

        // Safety for old videos
        if (!video.likes) video.likes = [];
        if (!video.dislikes) video.dislikes = [];

        const alreadyLiked = video.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            return res.status(400).json({
                message: "Video already liked",
            });
        }

        // Remove dislike
        video.dislikes = video.dislikes.filter(
            (id) => id.toString() !== userId
        );

        video.likes.push(userId);

        await video.save();

        res.status(200).json({
            message: "Video liked successfully",
            likes: video.likes.length,
            dislikes: video.dislikes.length,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 👎 DISLIKE VIDEO
export const dislikeVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        const userId = req.user.id;

        // Safety for old videos
        if (!video.likes) video.likes = [];
        if (!video.dislikes) video.dislikes = [];

        const alreadyDisliked = video.dislikes.some(
            (id) => id.toString() === userId
        );

        if (alreadyDisliked) {
            return res.status(400).json({
                message: "Video already disliked",
            });
        }

        // Remove like
        video.likes = video.likes.filter(
            (id) => id.toString() !== userId
        );

        video.dislikes.push(userId);

        await video.save();

        res.status(200).json({
            message: "Video disliked successfully",
            likes: video.likes.length,
            dislikes: video.dislikes.length,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 📊 GET VIDEO REACTIONS
export const getVideoReactions = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        res.status(200).json({
            likes: video.likes ? video.likes.length : 0,
            dislikes: video.dislikes
                ? video.dislikes.length
                : 0,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 👀 ADD VIEW
export const addView = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        video.views += 1;

        await video.save();

        res.status(200).json({
            message: "View added successfully",
            views: video.views,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// 🔍 SEARCH VIDEOS
export const searchVideos = async (req, res) => {
    try {
        const keyword = req.params.keyword;

        const videos = await Video.find({
            title: {
                $regex: keyword,
                $options: "i",
            },
        })
            .populate("uploader", "username")
            .populate("channelId", "channelName");

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// 🔥 TRENDING VIDEOS
export const getTrendingVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .sort({ views: -1 })
            .populate("uploader", "username")
            .populate("channelId", "channelName");

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//  GET VIDEOS BY CATEGORY
export const getVideosByCategory = async (req, res) => {
    try {
        const videos = await Video.find({
            category: req.params.category,
        })
            .populate("uploader", "username")
            .populate("channelId", "channelName");

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
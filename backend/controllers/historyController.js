import History from "../models/History.js";
import Video from "../models/Video.js";

// Add Video To History
export const addToHistory = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        const history = await History.create({
            userId: req.user.id,
            videoId: req.params.videoId,
        });

        res.status(201).json({
            message: "Added to watch history",
            history,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get User History
export const getHistory = async (req, res) => {
    try {
        const history = await History.find({
            userId: req.user.id,
        })
            .populate("videoId")
            .sort({ createdAt: -1 });

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
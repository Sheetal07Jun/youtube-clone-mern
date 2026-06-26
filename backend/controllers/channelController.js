import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// 📺 CREATE CHANNEL (Protected)
export const createChannel = async (req, res) => {
    try {
        const { channelName, description, channelBanner } = req.body;

        const existingChannel = await Channel.findOne({
            owner: req.user.id,
        });

        if (existingChannel) {
            return res
                .status(400)
                .json({ message: "User already has a channel" });
        }

        const newChannel = await Channel.create({
            channelName,
            description,
            channelBanner,
            owner: req.user.id,
        });

        res.status(201).json({
            message: "Channel created successfully",
            channel: newChannel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📺 GET CHANNEL BY ID
export const getChannelById = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.id)
            .populate("owner", "username");

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📺 GET VIDEOS BY CHANNEL
export const getVideosByChannel = async (req, res) => {
    try {
        const videos = await Video.find({
            channelId: req.params.channelId,
        }).populate("uploader", "username");

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
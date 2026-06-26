import User from "../models/User.js";
import Channel from "../models/Channel.js";

//  Subscribe to a Channel
export const subscribeChannel = async (req, res) => {
    try {
        const userId = req.user.id;
        const channelId = req.params.channelId;

        const user = await User.findById(userId);
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        // Check if already subscribed
        if (user.subscriptions.includes(channelId)) {
            return res.status(400).json({
                message: "Already subscribed",
            });
        }

        // Add channel to subscriptions
        user.subscriptions.push(channelId);
        await user.save();

        // Increase subscriber count
        channel.subscribers += 1;
        await channel.save();

        res.status(200).json({
            message: "Subscribed successfully",
            subscribers: channel.subscribers,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//  Unsubscribe from a Channel
export const unsubscribeChannel = async (req, res) => {
    try {
        const userId = req.user.id;
        const channelId = req.params.channelId;

        const user = await User.findById(userId);
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        user.subscriptions = user.subscriptions.filter(
            (id) => id.toString() !== channelId
        );

        await user.save();

        if (channel.subscribers > 0) {
            channel.subscribers -= 1;
            await channel.save();
        }

        res.status(200).json({
            message: "Unsubscribed successfully",
            subscribers: channel.subscribers,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//  Get Subscriber Count
export const getSubscribers = async (req, res) => {
    try {
        const channel = await Channel.findById(req.params.channelId);

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        res.status(200).json({
            channelName: channel.channelName,
            subscribers: channel.subscribers,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
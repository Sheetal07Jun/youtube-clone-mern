import Playlist from "../models/Playlist.js";
import Video from "../models/Video.js";

// Create Playlist
export const createPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.create({
            name: req.body.name,
            owner: req.user.id,
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get My Playlists
export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({
            owner: req.user.id,
        });

        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Single Playlist
export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate("videos");

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Playlist
export const updatePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        playlist.name = req.body.name || playlist.name;

        await playlist.save();

        res.status(200).json({
            message: "Playlist updated successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Playlist
export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        await playlist.deleteOne();

        res.status(200).json({
            message: "Playlist deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Add Video To Playlist
export const addVideoToPlaylist = async (req, res) => {
    try {
        const { playlistId, videoId } = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                message: "Video not found",
            });
        }

        const alreadyExists = playlist.videos.some(
            (id) => id.toString() === videoId
        );

        if (alreadyExists) {
            return res.status(400).json({
                message: "Video already exists in playlist",
            });
        }

        playlist.videos.push(videoId);

        await playlist.save();

        res.status(200).json({
            message: "Video added successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Remove Video From Playlist
export const removeVideoFromPlaylist = async (req, res) => {
    try {
        const { playlistId, videoId } = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found",
            });
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        playlist.videos = playlist.videos.filter(
            (id) => id.toString() !== videoId
        );

        await playlist.save();

        res.status(200).json({
            message: "Video removed successfully",
            playlist,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
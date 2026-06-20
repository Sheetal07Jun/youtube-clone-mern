import express from "express";
import {
    createPlaylist,
    getPlaylists,
    getPlaylistById,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlistController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Playlist
router.post("/", authMiddleware, createPlaylist);

// Get My Playlists
router.get("/", authMiddleware, getPlaylists);

// Get Single Playlist
router.get("/:id", authMiddleware, getPlaylistById);

// Update Playlist Name
router.put("/:id", authMiddleware, updatePlaylist);

// Delete Playlist
router.delete("/:id", authMiddleware, deletePlaylist);

// Add Video To Playlist
router.post(
    "/:playlistId/videos/:videoId",
    authMiddleware,
    addVideoToPlaylist
);

// Remove Video From Playlist
router.delete(
    "/:playlistId/videos/:videoId",
    authMiddleware,
    removeVideoFromPlaylist
);

export default router;
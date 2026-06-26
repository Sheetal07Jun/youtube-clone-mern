import express from "express";
import {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    likeVideo,
    dislikeVideo,
    addView,
    searchVideos,
    getVideoReactions,
    getTrendingVideos,
    getVideosByCategory
} from "../controllers/videoController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🎥 Video CRUD
router.post("/", authMiddleware, createVideo);
router.get("/", getAllVideos);
router.get("/search/:keyword", searchVideos);
router.get("/trending", getTrendingVideos);
router.get("/category/:category", getVideosByCategory);
router.get("/:id", getVideoById);
router.put("/:id", authMiddleware, updateVideo);
router.delete("/:id", authMiddleware, deleteVideo);

// 👍 👎 Reactions

router.post("/:videoId/like", authMiddleware, likeVideo);
router.post("/:videoId/dislike", authMiddleware, dislikeVideo);

//  Views

router.post("/:videoId/view", addView);
router.get("/:videoId/reactions", getVideoReactions);

export default router;

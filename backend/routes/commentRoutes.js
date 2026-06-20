import express from "express";
import {
    createComment,
    getCommentsByVideo,
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", authMiddleware, createComment);
router.get("/:videoId", getCommentsByVideo);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
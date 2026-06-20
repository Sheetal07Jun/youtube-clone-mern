import express from "express";
import {
    addToHistory,
    getHistory,
} from "../controllers/historyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", authMiddleware, addToHistory);

router.get("/", authMiddleware, getHistory);

export default router;
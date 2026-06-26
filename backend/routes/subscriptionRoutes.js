import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    subscribeChannel,
    unsubscribeChannel,
    getSubscribers,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Subscribe
router.post(
    "/:channelId/subscribe",
    authMiddleware,
    subscribeChannel
);

// Unsubscribe
router.post(
    "/:channelId/unsubscribe",
    authMiddleware,
    unsubscribeChannel
);

// Get subscriber count
router.get(
    "/:channelId/subscribers",
    getSubscribers
);

export default router;
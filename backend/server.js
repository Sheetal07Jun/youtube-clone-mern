import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
    res.send("YouTube Clone Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    userId: req.user.id,
  });
});
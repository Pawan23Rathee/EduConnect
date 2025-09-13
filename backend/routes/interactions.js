const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Video = require("../models/Video");
const User = require("../models/User");

// Like a video
router.post("/like/:videoId", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // toggle like
    const index = video.likes.indexOf(req.user.id);
    if (index === -1) video.likes.push(req.user.id);
    else video.likes.splice(index, 1);

    await video.save();
    res.json({ message: "Like updated", likes: video.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on a video
router.post("/comment/:videoId", authMiddleware, async (req, res) => {
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ error: "Comment required" });

  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    video.comments.push({ user: req.user.id, comment });
    await video.save();
    res.json({ message: "Comment added", comments: video.comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subscribe to a user
router.post("/subscribe/:userId", authMiddleware, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    if (!currentUser.subscriptions.includes(targetUser._id)) {
      currentUser.subscriptions.push(targetUser._id);
      targetUser.subscribers.push(currentUser._id);
    } else {
      currentUser.subscriptions.pull(targetUser._id);
      targetUser.subscribers.pull(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "Subscription updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const Video = require("../models/Video");

const router = express.Router();

// ✅ Storage setup for local uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure uploads folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Upload a video
router.post("/", authMiddleware, upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    const newVideo = new Video({
      title,
      description,
      s3Url: file.path,   // ✅ now schema and route match
      uploader: req.user.id,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Error uploading video" });
  }
});

// ✅ Get video details by ID
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploader", "username");
    if (!video) return res.status(404).json({ error: "Video not found" });

    res.json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Error fetching video" });
  }
});

module.exports = router;

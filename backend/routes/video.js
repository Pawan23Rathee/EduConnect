const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const Video = require("../models/Video");
const jwt = require("jsonwebtoken");

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check auth
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Upload video
router.post("/upload", authMiddleware, upload.single("video"), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "No video uploaded" });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: Date.now() + "_" + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    const video = new Video({
      title,
      description,
      s3Url: data.Location,
      uploader: req.user.id,
    });
    await video.save();
    res.json({ message: "Video uploaded successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().populate("uploader", "email");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

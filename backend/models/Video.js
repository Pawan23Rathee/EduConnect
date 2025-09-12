const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  s3Url: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.models.Video || mongoose.model("Video", videoSchema);

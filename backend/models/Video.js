const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    s3Url: { type: String, required: true }, // ✅ match with upload route
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);

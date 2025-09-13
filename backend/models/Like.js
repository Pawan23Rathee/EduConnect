const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Prevent same user liking twice
likeSchema.index({ videoId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);

const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Prevent duplicate subscription
subscribeSchema.index({ channelId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Subscribe", subscribeSchema);

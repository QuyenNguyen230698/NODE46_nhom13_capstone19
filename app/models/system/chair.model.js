const mongoose = require("mongoose");

const ChairSchema = new mongoose.Schema(
  {
    maGhe: { type: Number, required: true },
    tenGhe: { type: String, required: true },
    loaiGhe: { type: String, required: true, default: "THUONG" },
    maRap: { type: Number, required: true },
    placed: { type: Boolean, default: false },
    accountPlaced: { type: String, default: "" },
  }
);

// Compound index to ensure uniqueness of maGhe within a maRap
ChairSchema.index({ maGhe: 1, maRap: 1 }, { unique: true });

module.exports = mongoose.model("Chair", ChairSchema);

const mongoose = require("mongoose");

const TheaterSchema = new mongoose.Schema(
  {
    theaterCode: { type: String, unique: true },
    theaterName: { type: String, required: true },
    slug: { type: String, required: true },
    logo: { type: String, required: true }
  }
);

module.exports = mongoose.model("Theater", TheaterSchema);

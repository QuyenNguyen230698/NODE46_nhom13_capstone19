const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    bannerCode: { type: Number },
    movieCode: { type: Number, unique: true },
    bannerImage: { type: String, required: true },
  }
);

module.exports = mongoose.model("Banner", BannerSchema);

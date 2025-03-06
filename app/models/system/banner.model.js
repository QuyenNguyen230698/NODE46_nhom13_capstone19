const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    bannerCode: { type: Number },
    movieCode: { type: Number, unique: true },
    bannerImage: { type: String, required: true },
  }
);

// Middleware to auto-increment bannerCode
BannerSchema.pre('save', async function(next) {
  if (!this.bannerCode) {
    try {
      const lastBanner = await this.constructor.findOne({}, {}, { sort: { 'bannerCode': -1 } });
      this.bannerCode = lastBanner ? lastBanner.bannerCode + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Banner", BannerSchema);

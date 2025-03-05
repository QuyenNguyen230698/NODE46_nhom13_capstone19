const mongoose = require("mongoose");

const ChairSchema = new mongoose.Schema(
  {
    maGhe: { type: Number, unique: true },
    tenGhe: { type: String, required: true },
    loaiGhe: { type: String, required: true },
    maRap: { type: String }
  }
);

module.exports = mongoose.model("Chair", ChairSchema);

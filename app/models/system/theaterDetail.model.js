const mongoose = require("mongoose");

const TheaterDetailSchema = new mongoose.Schema(
  {
    maRap: { type: Number, unique: true },
    tenRap: { type: String, required: true },
    maCumRap: { type: String, required: true },
  }
);

module.exports = mongoose.model("TheaterDetail", TheaterDetailSchema);

const mongoose = require("mongoose");

const TheaterComplexSchema = new mongoose.Schema(
  {
    theaterCode: { type: String }, 
    maCumRap: { type: String, unique: true },
    tenCumRap: { type: String, required: true },
    diaChi: { type: String, required: true },
    danhSachRap: { type: Array, default: [] }
  }
);

module.exports = mongoose.model('TheaterComplex', TheaterComplexSchema);

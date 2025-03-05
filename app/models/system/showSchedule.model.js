const mongoose = require("mongoose");

const ShowScheduleSchema = new mongoose.Schema(
  {
    maLichChieu: { type: Number, required: true },
    maRap: { type: Number, required: true },
    theaterCode: { type: String, required: true },
    releaseDate: { type: String, required: true },
    price: { type: Number, required: true }
  }
);

module.exports = mongoose.model("ShowSchedule", ShowScheduleSchema);

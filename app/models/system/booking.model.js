const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    maLichChieu: { type: Number, required: true },
    maGhe: { type: Number, unique: true },
  }
);

module.exports = mongoose.model("Booking", BookingSchema);

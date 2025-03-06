const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  maGhe: { type: Number, required: true },
  price: { type: Number, required: true }
})

const BookingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    maLichChieu: { type: Number, required: true },
    danhSachVe: { type: [TicketSchema], default: [] }
  }
);

module.exports = mongoose.model("Booking", BookingSchema);

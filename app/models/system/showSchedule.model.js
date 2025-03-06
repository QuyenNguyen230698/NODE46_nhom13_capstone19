const mongoose = require("mongoose");

const ShowScheduleSchema = new mongoose.Schema(
  {
    maLichChieu: { type: Number },
    maRap: { type: Number, required: true },
    maCumRap: { type: String, required: true },
    theaterCode: { type: String, required: true },
    releaseDate: { type: String, required: true },
    price: { type: Number, required: true }
  }
);

// Pre-save hook to auto-increment movieCode
ShowScheduleSchema.pre('save', async function (next) {
  const count = await this.model('ShowSchedule').countDocuments();
  this.maLichChieu = count + 100; // Start from 100
  next();
});

module.exports = mongoose.model("ShowSchedule", ShowScheduleSchema);

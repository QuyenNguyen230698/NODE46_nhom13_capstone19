const mongoose = require("mongoose");
const Chair = require("./chair.model");

const ShowScheduleSchema = new mongoose.Schema(
  {
    maLichChieu: { type: Number },
    maRap: { type: Number, required: true },
    maCumRap: { type: String, required: true },
    theaterCode: { type: String, required: true },
    releaseDate: { type: String, required: true },
    price: { type: Number, required: true },
    movieCode: { type: Number, required: true },
    seat: { type: Array }
  }
);

// Pre-save hook to auto-increment movieCode
ShowScheduleSchema.pre('save', async function (next) {
  const count = await this.model('ShowSchedule').countDocuments();
  this.maLichChieu = count + 100; // Start from 100
  next();
});

ShowScheduleSchema.pre('save', async function(next) {
  try {
    const chairs = [];
    for (let i = 1; i <= 160; i++) {
      const chair = await Chair.findOne({ maGhe: i });
      if (chair) {
        chair.maRap = this.maRap; // Update maRap if needed
        chairs.push(chair);
      }
    }
    this.seat = chairs;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("ShowSchedule", ShowScheduleSchema);

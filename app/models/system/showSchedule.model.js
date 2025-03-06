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

// Pre-save hook to populate 'seat' with 160 chair objects
ShowScheduleSchema.pre('save', async function(next) {
  try {
    const chairs = [];
    for (let i = 1; i <= 160; i++) {
      const chair = new Chair({
        maGhe: i,
        tenGhe: `${i}`,
        loaiGhe: (i >= 35 && i <= 46) 
        || (i >= 51 && i <= 62) 
        || (i >= 67 && i <= 78) 
        || (i >= 83 && i <= 94) 
        || (i >= 99 && i <= 110) 
        || (i >= 115 && i <= 126) ? 'vip' : 'normal',
        maRap: this.maRap
      });
      await chair.save();
      chairs.push(chair);
    }
    this.seat = chairs;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("ShowSchedule", ShowScheduleSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    movieCode: { type: Number, unique: true },
    movieName: { type: String, required: true },
    movieImage: { type: String, required: true },
    movieDescription: { type: String, required: true },
    movieTrailer: { type: String, required: true },
    movieDuration: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: Number, required: true },
    isShowing: { type: Boolean, required: true },
    comingSoon: { type: Boolean, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
    status: {
        type: String,
        default: "draft",
        enum: ["draft", "published", "archived"],
      }
  },
  { timestamps: true }
);

// Pre-save hook to auto-increment movieCode
MovieSchema.pre('save', async function (next) {
  const count = await this.model('Movie').countDocuments();
  this.movieCode = count + 1000; // Start from 1000
  next();
});

module.exports = mongoose.model("Movie", MovieSchema);

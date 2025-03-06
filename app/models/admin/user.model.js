const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    roles: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    avatar: { type: String , default: "https://res.cloudinary.com/dy3tzo2kg/image/upload/v1741069754/avatar-default_q3pzgr.png"},
    position: { type: String , default: "Guest", enum: ["Guest", "Staff", "Developer"]},
    status: { type: String, default: "ACTIVE", enum: ["ACTIVE", "INACTIVE"] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

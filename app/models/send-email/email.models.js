const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: Array, required: true },
  subject: { type: String, required: true },
  text: { type: String },
  status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  isOpen: { type: Boolean, default: false }, // ➕ Thêm trường theo dõi đã mở email chưa
  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;

const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: { type: [String], required: true }, // ✅ Đảm bảo mảng chứa chuỗi email hợp lệ
  subject: { type: String, required: true },
  text: { type: String },
  status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  isOpen: { type: Boolean, default: false }, // ✅ Theo dõi xem email đã mở chưa
  openedAt: { type: Date }, // ➕ Lưu thời gian mở email
  openedIp: { type: String, default: "" }, // ✅ Địa chỉ IP khi mở email
  templateData: { type: Object, default: {} }, // ➕ Lưu dữ liệu render template (tránh lỗi undefined)
  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;

const express = require("express");
const router = express.Router();
const emailQueue = require("../../configs/redis");
const Email = require("../../models/send-email/email.models");

// ✅ Route hiển thị trang "Thanks"
router.get("/thanks", (req, res) => {
  res.render("thanks/index");
});

// ✅ API gửi email (thêm vào queue)
router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, name, path } = req.body;

    if (!subject || !name || !path) {
      return res.status(400).json({ error: "Missing email parameters" });
    }

    let emailRecords = [];

    for (const recipient of to) {
      const newEmail = new Email({
        to: recipient,
        subject,
        templateData: { name, path },
        status: "pending",
        isOpen: false, // Mặc định chưa mở email
      });

      const savedEmail = await newEmail.save();
      emailRecords.push(savedEmail);

      // Thêm tracking pixel vào templateData
      const trackingUrl = `http://14.225.204.233:4000/track-email/${savedEmail._id}`;
      const updatedTemplateData = { ...newEmail.templateData, trackingUrl };

      // Thêm vào hàng đợi riêng
      await emailQueue.add({
        emailId: savedEmail._id,
        to: recipient,
        subject,
        templateData: updatedTemplateData,
      });
    }

    res.json({
      message: "Emails are being processed!",
      emails: emailRecords.map((email) => ({ emailId: email._id, to: email.to })),
    });
  } catch (error) {
    console.error("❌ Error queueing emails:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// ✅ API theo dõi trạng thái mở email
router.get("/track-email/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;

    const email = await Email.findById(emailId);
    if (!email) {
      return res.status(404).send("Email not found");
    }

    // Cập nhật trạng thái đã mở email
    email.isOpen = true;
    await email.save();

    // Trả về ảnh tracking pixel 1x1
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88xAAAIMAIHSZADYAAAAASUVORK5CYII=",
      "base64"
    );
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(pixel);
  } catch (error) {
    console.error("❌ Error tracking email:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ API kiểm tra trạng thái email
router.get("/emails", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    console.error("❌ Error fetching emails:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;

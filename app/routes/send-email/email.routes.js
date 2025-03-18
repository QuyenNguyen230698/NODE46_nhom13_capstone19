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

    if (!Array.isArray(to) || to.length === 0) {
      return res.status(400).json({ error: "Invalid 'to' field. Must be an array of email addresses." });
    }

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
      });

      const savedEmail = await newEmail.save();
      emailRecords.push(savedEmail);

      // Thêm vào hàng đợi riêng
      await emailQueue.add({
        emailId: savedEmail._id,
        to: recipient,
        subject,
        templateData: { name, path },
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

// ✅ API kiểm tra trạng thái của 1 email cụ thể
router.get("/emails/:emailId", async (req, res) => {
  try {
    const email = await Email.findById(req.params.emailId);

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    res.json(email);
  } catch (error) {
    console.error("❌ Error fetching email details:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;

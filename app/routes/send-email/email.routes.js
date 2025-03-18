const express = require("express");
const router = express.Router();
const emailQueue = require("../../configs/redis");
const Email = require("../../models/send-email/email.models");

router.get('/thanks', (req, res) => {
    res.render('thanks/index');
})

// API gửi email (thêm vào queue)
router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, name, path } = req.body;

    if (!to || !subject || !name || !path) {
      return res.status(400).json({ error: "Missing email parameters" });
    }

    const email = new Email({
      to,
      subject,
      templateData: { name, path },
      status: "pending",
    });
    await email.save();

    await emailQueue.add({ emailId: email._id, to, subject, templateData: { name, path } });

    res.json({ message: "Email added to queue", emailId: email._id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// API kiểm tra trạng thái email
router.get("/emails", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;

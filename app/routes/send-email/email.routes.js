const express = require("express");
const axios = require("axios");
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
  
    for (const recipient of Array.isArray(to) ? to : [to]) { // Đảm bảo 'to' là một mảng
      const newEmail = new Email({
        to: recipient,
        subject,
        templateData: { name, path },
        status: "pending",
        isOpen: false, // Mặc định chưa mở email
      });
  
      const savedEmail = await newEmail.save();
      emailRecords.push(savedEmail);
  
      // ✅ Thêm tracking pixel vào templateData
      const trackingUrl = `http://14.225.204.233:4000/api/email/track-email/${savedEmail._id}`;
      const updatedTemplateData = { 
        name, // Đảm bảo có name
        path, // Đảm bảo có path
        ...(savedEmail.templateData || {}), 
        trackingUrl 
      };
      
      console.log("📬 Data pushed to queue:", JSON.stringify(updatedTemplateData, null, 2));
  
      // ✅ Thêm vào hàng đợi gửi email
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

// ✅ API theo dõi trạng thái mở email + tracking IP + vị trí địa lý
router.get("/track-email/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;

    // Lấy địa chỉ IP của người mở email
    let userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (userIp.includes("::ffff:")) {
      userIp = userIp.replace("::ffff:", ""); // Chuyển IPv6-mapped IPv4 về IPv4
    }

    const email = await Email.findById(emailId);
    if (!email) {
      return res.status(404).send("Email not found");
    }

    // 📌 Gọi API lấy vị trí từ IP
    let locationData = {};
    try {
      const geoRes = await axios.get(`http://ip-api.com/json/${userIp}`);
      if (geoRes.data.status === "success") {
        locationData = {
          country: geoRes.data.country,
          city: geoRes.data.city,
          lat: geoRes.data.lat,
          lon: geoRes.data.lon,
        };
      }
    } catch (geoError) {
      console.error("⚠️ Không lấy được vị trí IP:", geoError.message);
    }

    // Cập nhật trạng thái đã mở email + lưu IP & vị trí địa lý
    email.isOpen = true;
    email.openedAt = new Date();
    email.openedIp = userIp;
    email.location = locationData;
    await email.save();

    console.log(`📩 Email ${emailId} opened from IP: ${userIp}, Location: ${JSON.stringify(locationData)}`);

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

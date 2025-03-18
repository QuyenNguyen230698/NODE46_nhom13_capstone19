const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Gửi email với template .ejs
 * @param {string} to - Email người nhận
 * @param {string} subject - Tiêu đề email
 * @param {object} data - Dữ liệu cần render vào template
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, data) => {
  try {
    // Render template EJS
    const templatePath = path.join(__dirname, `../views/${data.path}`);
    const html = await ejs.renderFile(templatePath, data);

    // Gửi email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
  }
};

module.exports = sendEmail;

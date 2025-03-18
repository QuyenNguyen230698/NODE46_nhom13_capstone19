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
 */
const sendEmail = async (to, subject, data) => {
  try {
    // Render template EJS
    const templatePath = path.join(__dirname, `../views/${data.path}`);
    const htmlContent = await ejs.renderFile(templatePath, data);

    // Thêm tracking pixel vào email
    const trackingPixel = `<img src="${data.trackingUrl}" width="1" height="1" style="display:none;" />`;
    const finalHtml = htmlContent + trackingPixel;

    // Gửi email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: finalHtml,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
  }
};

module.exports = sendEmail;

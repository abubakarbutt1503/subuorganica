require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.SHOP_EMAIL || process.env.SMTP_USER,
      subject: '✅ Test Email from SuBu Organica Server',
      text: 'This is a test email to confirm SMTP is working correctly!',
    });

    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}

sendTestEmail();

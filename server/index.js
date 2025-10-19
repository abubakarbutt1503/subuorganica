const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Verify .env is loaded correctly
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS length:', process.env.SMTP_PASS?.length);

// 📬 Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Verify Gmail SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ Gmail SMTP Server is ready to send emails');
  }
});

// 📨 Route to handle checkout form
app.post('/api/checkout', async (req, res) => {
  const { formData, items, total } = req.body;

  if (!formData || !items || !total) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  const orderDetails = `
🛍️ New Order Received!

👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
🏠 Address: ${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}

🛒 Ordered Items:
${items
  .map(
    (item) =>
      `- ${item.product.name} (x${item.quantity}) — Rs.${item.product.price}`
  )
  .join('\n')}

💰 Total Amount: Rs.${total}

📝 Notes: ${formData.notes || 'N/A'}
`;

  try {
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.SHOP_EMAIL,
      subject: `🧾 New Order from ${formData.firstName}`,
      text: orderDetails,
    });

    console.log('📬 Order email sent:', info.response);
    res.json({ success: true, message: 'Order email sent successfully' });
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// 🚀 Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

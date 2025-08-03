const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service like 'hotmail', 'yahoo', or use SMTP config
  auth: {
    user: process.env.EMAIL_USER, // your email from .env
    pass: process.env.EMAIL_PASS, // app password or email password
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"MercadoTáctico" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;

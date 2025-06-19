const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

transporter.verify().then(() => {
  console.log("Ready to send emails");
}).catch(err => {
  console.error("Mailtrap verification failed:", err);
});

const sendAppointmentEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Hospital Admin" <admin@hospital.com>',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully (check Mailtrap inbox)');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
};

module.exports = sendAppointmentEmail;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SUPERADMIN_EMAIL,
    pass: process.env.SUPERADMIN_PASSWORD
  }
});

const sendApprovalEmail = async (to) => {
  await transporter.sendMail({
    from: '"Talent App" <your-email@gmail.com>',
    to,
    subject: 'You are now approved!',
    html: '<p>You have been approved by the Super Admin. You can now log in.</p>'
  });
};

module.exports = sendApprovalEmail;

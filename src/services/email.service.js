const nodemailer = require("nodemailer");
console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_USER =", process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // MUST true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome to Orange Tree LMS</h2>
      <p>Click below to verify your email:</p>
      <a href="${verificationUrl}">
        Verify Email
      </a>
    `
  });
};

module.exports = { sendVerificationEmail };
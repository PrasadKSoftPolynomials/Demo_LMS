const nodemailer = require("nodemailer");
const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const sendVerificationEmail =
  async (
    email,
    name,
    verificationToken
  ) => {
    const verificationUrl =
      `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "Verify Your Orange LMS Account",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering.</p>
        <p>Please verify your email by clicking the button below:</p>

        <a
          href="${verificationUrl}"
          style="
            background:#f97316;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Verify Email
        </a>

        <p>If the button doesn't work:</p>
        <p>${verificationUrl}</p>
      `
    });
  };

module.exports = {
  sendVerificationEmail
};
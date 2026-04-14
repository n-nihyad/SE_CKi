const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Reset Password",
    html: `
      <h3>Reset mật khẩu</h3>
      <p>Click vào link bên dưới:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  await sgMail.send(msg);
};

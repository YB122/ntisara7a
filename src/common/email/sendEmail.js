import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // 587 if false 465 if true
    secure: false,
    auth: {
      user: "youssefbenyamine2eme@gmail.com",
      pass: "vkgq azbq izjl yqbd",
    },
  });

  let info = await transporter.sendMail({
    from: "app saraha",
    to: email,
    subject: subject,
    text: text,
    html: html,
  });
};

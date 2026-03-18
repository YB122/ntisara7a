import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // 587 if false
    secure: false,
    auth: {
      user: "youssefbenyamine2eme@gmail.com",
      pass: "vkgq azbq izjl yqbd",
    },
  });

  let info = transporter.sendMail({
    from: "pandeyji1999",
    to: email,
    subject: subject,
    text: text,
  });
};

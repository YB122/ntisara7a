import express from "express";
import authRouter from "./module/auth/auth.controller.js";
import userRouter from "./module/users/user.controller.js";
import messageRouter from "./module/message/message.controller.js";
import { dataBaseConnection } from "./database/connection.js";
import { sendEmail } from "./common/email/sendEmail.js";
export const callServer = () => {
  let app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));
  dataBaseConnection();
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  // sendEmail("01223b2d87@emailax.pro","subjewsct","textdxsassa");
  // sendEmail("01223b2d87@emailax.pro","subjecsasaat","texadscdtssa");
  app.listen(3000, () => {
    console.log("server 3000 open");
  });
};

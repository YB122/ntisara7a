import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const dataBaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://youssefbenyamine2eme_db_user:youssef@cluster0.fcv7kg6.mongodb.net/nti-sara7a",
    )
    .then(() => console.log("data base connected"))
    .catch((err) => console.log(err));
};

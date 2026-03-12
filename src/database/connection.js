import mongoose from "mongoose";

export const dataBaseConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://youssefbenyamine2eme_db_user:xl8Gs4ec8d17g499@cluster0.vybdbft.mongodb.net/nti-sara7a",
    )
    .then(() => console.log("data base connected"))
    .catch((err) => console.log(err));
};

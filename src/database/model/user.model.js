import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: false },
    image: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("users", userSchema);

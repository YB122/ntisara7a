import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    reciverid: { type: mongoose.Types.ObjectId, required: true },
    content: { type: String, required: true },
    image: { type: [String], required: false },
  },
  { timestamps: true },
);

export const messageModel = mongoose.model("message", messageSchema);

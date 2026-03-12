import { userModel } from "../../database/model/user.model.js";
import { messageModel } from "../../database/model/message.model.js";

export const sendMessage = async (req, res) => {
  let { content, reciverid } = req.body;
  let userFound = await userModel.findById(reciverid);
  if (!userFound) {
    return res.json({ message: "in-valid receiver ID" });
  }
  let images;
  if (req.files) {
    images = req.files.map((file) => {
      return `http://localhost:3000/uploads/${file.originalname}`;
    });
  }
  let message = await messageModel.insertMany({
    content,
    reciverid,
    image: images,
  });
  if (message) {
    res.json({ message: "message send", data: message });
  } else {
    res.json({ message: "send faild" });
  }
};
export const getAllMessages = async (req, res) => {
  let messageFound = await messageModel.find({ reciverid: req.user._id });
  if (messageFound.length) {
    res.json({ message: "done", data: messageFound });
  } else {
    res.json({ message: "faild" });
  }
};
export const getAllMessagesById = async (req, res) => {
  let { id } = req.params;
  let messageFound = await messageModel.findOne({
    reciverid: req.user._id,
    _id: id,
  });
  if (messageFound) {
    res.json({ message: "done", data: messageFound });
  } else {
    res.json({ message: "faild" });
  }
};
export const deleteMessage = async (req, res) => {
  let { id } = req.params;
  let messageFound = await messageModel.findOneAndDelete({
    reciverid: req.user._id,
    _id: id,
  });
  if (messageFound) {
    res.json({ message: "done", data: messageFound });
  } else {
    res.json({ message: "faild" });
  }
};

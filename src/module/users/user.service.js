import { userModel } from "../../database/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../../config/env.service.js";

export const profile = async (req, res) => {
  let userFound = await userModel.findOne({ _id: req.user._id });
  if (userFound) {
    res.json({ message: "user found", data: userFound });
  } else {
    res.json({ message: "user not found" });
  }
};

export const edit = async (req, res) => {
  let { name, userName, password, oldPassword } = req.body;
  let userFound = await userModel.findOne({ _id: req.user._id });
  if (userFound) {
    let all = {};
    name ? (all.name = name) : null;
    userName ? (all.userName = userName) : null;
    if (password) {
      let checkPassword = await bcrypt.compare(oldPassword, userFound.password);
      if (checkPassword) {
        let hashedPassword = await bcrypt.hash(password, 10);
        all.password = hashedPassword;
      } else {
        return res.json({ message: "pass nor matched" });
      }
    }
    let edited = await userModel.findByIdAndUpdate(req.user._id, all, {
      new: true,
    });
    if (edited) {
      res.json({ message: "updated", data: edited });
    } else {
      res.json({ message: "not updated" });
    }
  } else {
    res.json({ message: "user not found" });
  }
};

export const deleteUser = async (req, res) => {
  let userFound = await userModel.findByIdAndDelete(req.user._id, {
    new: true,
  });
  if (userFound) {
    res.json({ message: "deleted", data: userFound });
  } else {
    res.json({ message: "user not found" });
  }
};

export const profileURL = async (req, res) => {
  if (req.user) {
    let userFound = await userModel.findById(req.user._id);
    if (userFound) {
      let profileUrl = `${env.base_url}/user/${userFound.userName}`;
      res.json({ message: "done", data: profileUrl });
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "login first" });
  }
};

export const getUserData = async (req, res) => {
  let { url } = req.body;
  let data = url.split("/").pop();
  let userFound = await userModel.findOne({ userName: data });
  if (userFound) {
    res.json({ message: "done", data: userFound });
  } else {
    res.json({ message: "user not found" });
  }
};

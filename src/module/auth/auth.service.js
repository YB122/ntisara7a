import { userModel } from "../../database/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  let { name, email, password, confirmPassword, role, userName } = req.body;
  let emailSearch = await userModel.findOne({ email });
  if (emailSearch) {
    return res.json({ message: "email already exist" });
  }
  let userNameSearch = await userModel.findOne({ userName });
  if (userNameSearch) {
    return res.json({ message: "userName already exist" });
  }
  if (password != confirmPassword) {
    return res.json({ message: "password not matched" });
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  let image;
  if (req.file) {
    image = `http://localhost:3000/uploads/${req.file.originalname}`;
  }
  let user = await userModel.insertMany({
    name,
    email,
    password: hashedPassword,
    userName,
    role,
    image,
  });
  if (user) {
    res.json({ message: "success", data: user });
  } else {
    res.json({ message: "fail" });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  let userSearch = await userModel.findOne({ email });
  if (userSearch) {
    let data = await bcrypt.compare(password, userSearch.password);
    if (data) {
      let signature = "";
      switch (userSearch.role) {
        case "admin":
          signature = "signatureAdmin";
          break;
        case "user":
          signature = "signatureUser";
          break;
      }
      let accessToken = jwt.sign({ _id: userSearch._id }, signature, {
        expiresIn: "30m",
      });
      let refreshToken = jwt.sign({ _id: userSearch._id }, signature, {
        expiresIn: "1y",
      });
      res.json({
        message: "login success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.json({ message: "not found user or wrong password" });
    }
  } else {
    res.json({ message: "not found user or wrong password" });
  }
};

export const generateNewAccessToken = async (req, res) => {
  let { authorization } = req.headers;
  let [bearer, refreshToken] = authorization.split(" ");
  let signature = "";
  switch (bearer) {
    case "admin":
      signature = "signatureAdmin";
      break;
    case "user":
      signature = "signatureUser";
      break;
  }
  let decode = jwt.verify(refreshToken, signature);
  if (decode) {
    let accessToken = jwt.sign({ _id: decode._id }, signature, {
      expiresIn: "30m",
    });
    res.json({ message: "accessToken", accessToken: accessToken });
  }
};

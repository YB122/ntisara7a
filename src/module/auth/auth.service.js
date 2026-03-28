import { userModel } from "../../database/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../common/email/sendEmail.js";
import { env } from "../../../config/env.service.js";

export const signup = async (req, res) => {
  let { name, email, password, confirmPassword, userName } = req.body;
  let emailSearch = await userModel.findOne({ email });
  if (emailSearch) {
    return res.status(400).json({ message: "email already exist" });
  }
  let userNameSearch = await userModel.findOne({ userName });
  if (userNameSearch) {
    return res.status(400).json({ message: "userName already exist" });
  }
  if (password != confirmPassword) {
    return res.status(400).json({ message: "password not matched" });
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  let image;
  if (req.file) {
    image = `${env.base_url}/uploads/${req.file.originalname}`;
  }
  let user = await userModel.insertMany({
    name,
    email,
    password: hashedPassword,
    userName,
    image,
  });
  if (user) {
    let token = jwt.sign({ email }, env.verifySignature, { expiresIn: "15m" });
    let verifyButton = `<button>
    <a href="${env.base_url}/auth/verify-email?token=${token}">verify account</a>
    </button>`;
    sendEmail(email, "verify your email", "verify", verifyButton);
    res.status(200).json({ message: "success, SignUp" });
  } else {
    res.status(400).json({ message: "fail" });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;
  let userSearch = await userModel.findOne({ email });
  if (userSearch) {
    let data = await bcrypt.compare(password, userSearch.password);
    if (data) {
      if (!userSearch.isVerified) {
        return res.status(400).json({ message: "your email not verified" });
      }
      let accessToken = generateToken(userSearch);
      let refreshToken = generateToken(userSearch);
      res.status(200).json({
        message: "login success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).json({ message: "not found user or wrong password" });
    }
  } else {
    res.status(400).json({ message: "not found user or wrong password" });
  }
};

export const generateNewAccessToken = async (req, res) => {
  let { authorization } = req.headers;
  let [bearer, refreshToken] = authorization.split(" ");
  let signature = "";
  switch (bearer) {
    case "admin":
      signature = env.signatureAdmin;
      break;
    case "user":
      signature = env.refreshToken;
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

export const verifyEmail = async (req, res) => {
  let { token } = req.query;
  let decode = jwt.verify(token, env.verifySignature);
  if (!decode) return res.status(400).json({ message: "invalid token" });
  let userFound = await userModel.findOne({ email: decode.email });
  if (userFound.isVerified) {
    return res.status(400).json({ message: "your email already verified" });
  }
  let user = await userModel.findByIdAndUpdate(
    userFound._id,
    {
      isVerified: true,
      otp: null,
    },
    { new: true },
  );
  if (user) {
    return res.status(200).json({ message: "email verified successfully" });
  } else {
    return res.status(400).json({ message: "user not found" });
  }
};

export const resendEmail = async (req, res) => {
  let { email } = req.body;
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.status(400).json({ message: "user not found" });
  }
  if (userFound.isVerified) {
    return res.status(400).json({ message: "your email already verified" });
  }
  let token = jwt.sign({ email }, env.verifySignature, { expiresIn: "15m" });
  let verifyButton = `<button>
    <a href="${env.base_url}/auth/verify-email?token=${token}">Reverify your account</a>
    </button>`;
  sendEmail(email, "Reverify your email", "Reverify", verifyButton);
  res.status(200).json({ message: "success, Reverify your email" });
};

export const forgetPassword = async (req, res) => {
  let { email } = req.body;
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.json({ message: "user not found" });
  }
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  userFound.otp = otp;
  await userFound.save();
  sendEmail(email, "verify your email", `your otp is ${otp}`);
  res.json({ message: "check ur mail" });
};

export const resetPassword = async (req, res) => {
  let { email, otp, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return res.json({ message: "password not matched" });
  }
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.json({ message: "user not found" });
  }
  if (otp != userFound.otp) {
    return res.json({ message: "otp not correct" });
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  userFound.password = hashedPassword;
  userFound.otp = null;
  await userFound.save();
  res.json({ message: "done" });
};

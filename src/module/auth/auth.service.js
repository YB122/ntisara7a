import { userModel } from "../../database/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../common/email/sendEmail.js";

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
    let token = jwt.sign({ email }, "verify", { expiresIn: "5m" });
    let verifyButton = `<button>
    <a href="http://localhost:3000/auth/verify-email?token=${token}">verify account</a>
    </button>`;
    sendEmail(email, "verify your email", "verify", verifyButton);
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
      if (!userSearch.isVerified) {
        return res.json({ message: "your email not verified" });
      }
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
      res.json({ message: "not found user or wrong password dssd" });
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

export const verifyEmail = async (req, res) => {
  let { token } = req.query;
  let decode = jwt.verify(token, "verify");
  if (!decode) return res.json({ message: "invalid token" });
  let user = await userModel.findByIdAndUpdate(
    decode.email,
    {
      isVerified: true,
      otp: null,
    },
    { new: true },
  );
  if (user) {
    return res.json({ message: "email verified successfully" });
  } else {
    return res.json({message:'user not found'})
  }
};

export const resendOTP = async (req, res) => {
  let { email } = req.body;
  let userFound = await userModel.findOne({ email });
  if (!userFound) {
    return res.json({ message: "user not found" });
  }
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  userFound.otp = otp;
  await userFound.save();
  res.json({ message: "check ur mail" });
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

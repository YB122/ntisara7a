import joi from "joi";

export const signupValidate = joi.object({
  name: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(30),
  confirmPassword: joi.string().required().min(8).max(30),
  userName: joi.string().min(3).max(20).required(),
  image: joi.string().optional(),
  role: joi.string().valid("user", "admin").optional(),
});

export const loginValidate = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(30),
});

export const verifyValidate = joi.object({
  email: joi.string().email().required(),
  otp: joi.string().required(),
});
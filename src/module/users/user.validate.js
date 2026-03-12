import joi from "joi";

export const editValidate = joi.object({
  name: joi.string().optional().min(3).max(20),
  userName: joi.string().optional().min(3).max(20),
  password: joi.string().optional().min(8).max(30),
  oldPassword: joi.string().optional().min(8).max(30).valid(joi.ref("password")),
});

import joi from "joi";

export const messageValidate = joi.object({
  reciverid: joi.string().required(),
  content: joi.string().required(),
  image: joi.string().optional(),
});

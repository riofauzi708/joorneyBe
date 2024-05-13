import Joi from "joi";
import { IRegister } from "../../types/app";

export const registerSchema = Joi.object<IRegister>({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
});

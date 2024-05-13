import Joi from "joi";
import { ILogin } from "../../types/app";

export const loginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

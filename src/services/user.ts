import { PrismaClient } from "@prisma/client";
import { registerSchema } from "../libs/validation/register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "../libs/validation/login";
import { ILogin, IRegister } from "../types/app";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
};

export const getUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      posts: true,
      bookmarks: true,
    },
  });
};

export const Register = async (payload: IRegister) => {
  const { error, value } = registerSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });
  if (existingUser) {
    throw new Error("Email sudah digunakan.");
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  value.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: {
      // fullname: value.fullname,
      // email: value.email,
      // password: hashedPassword,
      // phone: value.phone,
      ...value,
    },
  });

  const profile = await prisma.profile.create({
    data: {
      userId: newUser.id,
    },
  });

  return { newUser, profile };
};

export const Login = async (payload: ILogin): Promise<string> => {
  const { error, value } = loginSchema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: value.email,
    },
  });
  if (!existingUser) {
    throw new Error("Email tidak ditemukan.");
  }

  const isMatch = await bcrypt.compare(value.password, existingUser.password);
  if (!isMatch) {
    throw new Error("Password salah.");
  }

  const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });

  return token;
};

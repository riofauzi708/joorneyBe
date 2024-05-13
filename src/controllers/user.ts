import { Request, Response } from "express";
import * as userService from "../services/user";

export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.send({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await userService.Register(body);
    res.send({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    const err = error as Error;

    if (err.message === "Email sudah digunakan") {
      return res.status(400).send({
        status: 400,
        message: err.message,
      });
    }

    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const result = await userService.Login(body);
    res.send({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

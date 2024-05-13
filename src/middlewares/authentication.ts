import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IAuthMiddleware } from "../types/app";
import { log } from "console";

export const Authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decode) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized",
      });
    }

    log(decode);

    res.locals.user = (decode as IAuthMiddleware).id;

    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
  }
};

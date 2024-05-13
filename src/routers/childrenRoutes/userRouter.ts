import { Router } from "express";
import { GetAllUsers, Register, Login } from "../../controllers/user";

const userRouter = Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/users", GetAllUsers);

export default userRouter;

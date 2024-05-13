import { Router } from "express";
import userRouter from "./childrenRoutes/userRouter";
import postRouter from "./childrenRoutes/postRouter";
import bookmarkRouter from "./childrenRoutes/bookmarkRouter";

const router = Router();

router.use("/", userRouter);
router.use("/", postRouter);
router.use("/", bookmarkRouter);

export default router;

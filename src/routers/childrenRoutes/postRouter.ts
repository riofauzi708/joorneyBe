import Router from "express";
import { createPosts, getAllPosts, getSomePosts } from "../../controllers/post";
import { Authentication } from "../../middlewares/authentication";

const postRouter = Router();

postRouter.get("/posted", getAllPosts);
postRouter.get("/post", getSomePosts);
postRouter.post("/posting", Authentication, createPosts);

export default postRouter;

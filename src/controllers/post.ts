import { Request, Response } from "express";
import * as postService from "../services/post";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.send({
      status: 200,
      message: "Success",
      data: posts,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

export const getSomePosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const posts = await postService.getSomePosts(+id);
    res.send({
      status: 200,
      message: "Success",
      data: posts,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }

  console.log(req.params);
};

export const createPosts = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.authorId = res.locals.user;
    const result = await postService.createPost(body);
    res.send({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

import Router from "express";
import { Authentication } from "../../middlewares/authentication";
import {
  createBookmark,
  deleteBookmark,
  getBookmarks,
} from "../../controllers/bookmark";

const bookmarkRouter = Router();

bookmarkRouter.get("/bookmark", Authentication, getBookmarks);
bookmarkRouter.delete("/delete-bookmark", Authentication, deleteBookmark);
bookmarkRouter.post("/create-bookmark", Authentication, createBookmark);

export default bookmarkRouter;

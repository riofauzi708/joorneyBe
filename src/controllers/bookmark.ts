import * as bookmarkService from "../services/bookmark";
import { Request, Response } from "express";

export const createBookmark = async (req: Request, res: Response) => {
  const { userId, postId } = req.body;
  try {
    const bookmark = await bookmarkService.createBookmark(userId, postId);
    res.status(201).json(bookmark);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const deleteBookmark = async (req: Request, res: Response) => {
  const { userId, postId } = req.body;
  try {
    const bookmark = await bookmarkService.deleteBookmark(userId, postId);
    res.status(200).json(bookmark);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const bookmarks = await bookmarkService.getUserBookmarks(userId);
    res.status(200).json(bookmarks);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

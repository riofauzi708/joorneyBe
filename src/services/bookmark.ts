import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBookmark = async (userId: any, postId: any) => {
  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    return bookmark;
  } catch (error) {
    throw new Error(`Failed to create bookmark`);
  }
};

export const deleteBookmark = async (userId: any, postId: any) => {
  try {
    const bookmark = await prisma.bookmark.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    return bookmark;
  } catch (error) {
    throw new Error(`Failed to delete bookmark`);
  }
};

export const getUserBookmarks = async (userId: any) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });
    return bookmarks;
  } catch (error) {
    console.log("err bkmrk", error);

    throw new Error(`Failed to get user's bookmarks`);
  }
};

import { PrismaClient } from "@prisma/client";
import { IPost } from "../types/app";

const prisma = new PrismaClient();

export const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            fullname: true,
          },
        },
        bookmarks: true,
      },
    });
    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`);
  }
};

export const getSomePosts = async (id: number) => {
  try {
    const posts = await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            fullname: true,
          },
        },
        bookmarks: true,
      },
    });
    return posts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`);
  }
};

export const createPost = async (post: IPost) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        authorId: post.authorId,
        title: post.title,
        content: post.content,
        image: post.image,
        createdAt: new Date(),
      },
    });
    return newPost;
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
};

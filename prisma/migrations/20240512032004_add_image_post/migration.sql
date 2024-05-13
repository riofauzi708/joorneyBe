/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT;

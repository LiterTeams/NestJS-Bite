/*
  Warnings:

  - Added the required column `category` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NewsCategories" AS ENUM ('news', 'promotion');

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "category" "NewsCategories" NOT NULL;

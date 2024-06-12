/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NoteExtension" AS ENUM ('doc', 'docx', 'txt', 'js', 'ogg', 'mp3');

-- CreateEnum
CREATE TYPE "ImageExtension" AS ENUM ('png', 'jpg', 'jpeg', 'webp', 'avif');

-- CreateEnum
CREATE TYPE "VideoExtension" AS ENUM ('mp4', 'webm', 'avi');

-- DropTable
DROP TABLE "Files";

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Videos";

-- DropEnum
DROP TYPE "FileFormats";

-- DropEnum
DROP TYPE "ImageFormats";

-- DropEnum
DROP TYPE "VideoFormats";

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" "NoteExtension" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" "ImageExtension" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" "VideoExtension" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the column `catalog_name` on the `Catalog` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image_preview` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropIndex
DROP INDEX "Catalog_catalog_name_key";

-- DropIndex
DROP INDEX "Category_category_name_key";

-- AlterTable
ALTER TABLE "Catalog" DROP COLUMN "catalog_name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "category_name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image_preview",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://bit.ly/4aXp8zr';

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_title_key" ON "Catalog"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

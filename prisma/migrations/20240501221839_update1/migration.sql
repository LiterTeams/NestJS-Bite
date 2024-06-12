/*
  Warnings:

  - The values [DRAFT,PUBLISHED,ARCHIVED] on the enum `NewsStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [NEW,ACCEPT,REJECT,DONE] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER,MODERATOR,ADMIN] on the enum `UserRoles` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NewsStatus_new" AS ENUM ('draft', 'published', 'archived');
ALTER TABLE "News" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "News" ALTER COLUMN "status" TYPE "NewsStatus_new" USING ("status"::text::"NewsStatus_new");
ALTER TYPE "NewsStatus" RENAME TO "NewsStatus_old";
ALTER TYPE "NewsStatus_new" RENAME TO "NewsStatus";
DROP TYPE "NewsStatus_old";
ALTER TABLE "News" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('new', 'accept', 'reject', 'done');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'new';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRoles_new" AS ENUM ('user', 'moderator', 'admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRoles_new" USING ("role"::text::"UserRoles_new");
ALTER TYPE "UserRoles" RENAME TO "UserRoles_old";
ALTER TYPE "UserRoles_new" RENAME TO "UserRoles";
DROP TYPE "UserRoles_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "News" ALTER COLUMN "status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'new';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

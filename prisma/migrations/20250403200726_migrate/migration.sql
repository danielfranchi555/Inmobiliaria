/*
  Warnings:

  - You are about to drop the column `typeProperty` on the `Property` table. All the data in the column will be lost.
  - Added the required column `listingType` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyListingType" AS ENUM ('SALE', 'RENT');

-- DropIndex
DROP INDEX "Property_typeProperty_idx";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "typeProperty",
ADD COLUMN     "listingType" "PropertyListingType" NOT NULL;

-- CreateIndex
CREATE INDEX "Property_listingType_idx" ON "Property"("listingType");

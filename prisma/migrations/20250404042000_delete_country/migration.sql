/*
  Warnings:

  - You are about to drop the column `country` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "country",
DROP COLUMN "zipCode";

/*
  Warnings:

  - You are about to drop the column `yearBuilt` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "yearBuilt",
ADD COLUMN     "studio" BOOLEAN NOT NULL DEFAULT false;

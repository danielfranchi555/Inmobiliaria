/*
  Warnings:

  - You are about to drop the column `userId` on the `Property` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_userId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "userId",
ADD COLUMN     "userSellerId" TEXT;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userSellerId_fkey" FOREIGN KEY ("userSellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

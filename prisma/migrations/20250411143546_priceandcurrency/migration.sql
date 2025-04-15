/*
  Warnings:

  - You are about to alter the column `price` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `currency` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'ARG');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "currency" "CurrencyType" NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

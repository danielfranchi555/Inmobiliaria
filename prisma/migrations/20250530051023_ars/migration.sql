/*
  Warnings:

  - The values [ARG] on the enum `CurrencyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CurrencyType_new" AS ENUM ('USD', 'ARS');
ALTER TABLE "Property" ALTER COLUMN "currency" TYPE "CurrencyType_new" USING ("currency"::text::"CurrencyType_new");
ALTER TYPE "CurrencyType" RENAME TO "CurrencyType_old";
ALTER TYPE "CurrencyType_new" RENAME TO "CurrencyType";
DROP TYPE "CurrencyType_old";
COMMIT;

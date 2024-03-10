/*
  Warnings:

  - You are about to drop the column `customerId` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_customerId_fkey";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "customerId";

/*
  Warnings:

  - Added the required column `booking_price` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `booking_price` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `isDeleted` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isDeleted` BOOLEAN NULL DEFAULT false;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_consignment_id_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `consignment_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_consignment_id_fkey` FOREIGN KEY (`consignment_id`) REFERENCES `Consignment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

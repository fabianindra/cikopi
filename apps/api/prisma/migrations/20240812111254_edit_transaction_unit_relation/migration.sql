/*
  Warnings:

  - You are about to drop the column `transaction_unit_id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transaction_id` to the `TransactionUnit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_discount_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_transaction_unit_id_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `transaction_unit_id`,
    MODIFY `discount_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `TransactionUnit` ADD COLUMN `transaction_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TransactionUnit` ADD CONSTRAINT `TransactionUnit_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

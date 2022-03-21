-- CreateTable
CREATE TABLE `room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` VARCHAR(5) NOT NULL,
    `room_price` FLOAT NOT NULL,
    `room_type_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `room_room_number_key`(`room_number`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_type` (
    `room_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_type_name` VARCHAR(20) NOT NULL,
    `room_type_bed` VARCHAR(15) NOT NULL,
    `room_type_detail` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `room_type_room_type_name_key`(`room_type_name`),
    PRIMARY KEY (`room_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_prefix` VARCHAR(10) NOT NULL,
    `customer_name` VARCHAR(15) NOT NULL,
    `customer_surname` VARCHAR(15) NOT NULL,
    `customer_email` VARCHAR(30) NOT NULL,
    `customer_password` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customer_customer_email_key`(`customer_email`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authority` (
    `authority_id` INTEGER NOT NULL AUTO_INCREMENT,
    `authority_prefix` VARCHAR(10) NOT NULL,
    `authority_name` VARCHAR(15) NOT NULL,
    `authority_surname` VARCHAR(15) NOT NULL,
    `authority_email` VARCHAR(30) NOT NULL,
    `authority_password` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `authority_authority_email_key`(`authority_email`),
    PRIMARY KEY (`authority_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_start` DATETIME NOT NULL,
    `booking_end` DATETIME NOT NULL,
    `booking_status_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `authority_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_status` (
    `booking_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_status_name` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`booking_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_image` TEXT NOT NULL,
    `booking_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `check_in` (
    `check_in_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`check_in_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `check_out` (
    `check_out_id` INTEGER NOT NULL AUTO_INCREMENT,
    `check_in_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`check_out_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_room_type_id_fkey` FOREIGN KEY (`room_type_id`) REFERENCES `room_type`(`room_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_authority_id_fkey` FOREIGN KEY (`authority_id`) REFERENCES `authority`(`authority_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_booking_status_id_fkey` FOREIGN KEY (`booking_status_id`) REFERENCES `booking_status`(`booking_status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `check_in` ADD CONSTRAINT `check_in_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `check_out` ADD CONSTRAINT `check_out_check_in_id_fkey` FOREIGN KEY (`check_in_id`) REFERENCES `check_in`(`check_in_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

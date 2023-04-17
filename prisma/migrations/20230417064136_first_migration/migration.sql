-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPERADMIN', 'ADMIN', 'STUDENT') NOT NULL DEFAULT 'STUDENT',

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `University` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `numStudents` INTEGER NOT NULL,
    `emailDomain` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `University_emailDomain_key`(`emailDomain`),
    INDEX `University_emailDomain_fkey`(`emailDomain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RSO` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `universityId` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `rsoStatus` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING',

    INDEX `RSO_adminId_fkey`(`adminId`),
    INDEX `RSO_universityId_fkey`(`universityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RSOMembers` (
    `id` VARCHAR(191) NOT NULL,
    `memberId` VARCHAR(191) NOT NULL,
    `rsoID` VARCHAR(191) NOT NULL,

    INDEX `RSOMembers_rsoID_fkey`(`rsoID`),
    INDEX `RSOMembers_memberId_fkey`(`memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `starts` VARCHAR(191) NOT NULL,
    `ends` VARCHAR(191) NOT NULL,
    `eventType` ENUM('PUBLIC', 'PRIVATE', 'RSO') NOT NULL,
    `eventStatus` ENUM('PENDING', 'APPROVED') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `location_url` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,
    `rsoId` VARCHAR(191) NULL,
    `universityId` VARCHAR(191) NOT NULL,

    INDEX `Event_eventType_eventStatus_fkey`(`eventType`, `eventStatus`),
    INDEX `Event_rsoId_fkey`(`rsoId`),
    INDEX `Event_hostId_fkey`(`hostId`),
    INDEX `Event_universityId_fkey`(`universityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Comment_userId_fkey`(`userId`),
    INDEX `Comment_eventId_fkey`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RSO` ADD CONSTRAINT `RSO_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RSO` ADD CONSTRAINT `RSO_universityId_fkey` FOREIGN KEY (`universityId`) REFERENCES `University`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RSOMembers` ADD CONSTRAINT `RSOMembers_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RSOMembers` ADD CONSTRAINT `RSOMembers_rsoID_fkey` FOREIGN KEY (`rsoID`) REFERENCES `RSO`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_rsoId_fkey` FOREIGN KEY (`rsoId`) REFERENCES `RSO`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_universityId_fkey` FOREIGN KEY (`universityId`) REFERENCES `University`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `Alocacao` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Area` INTEGER NOT NULL,
    `Automovel` INTEGER NOT NULL,
    `IdConcessionaria` INTEGER NOT NULL,
    `Quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Automoveis` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Modelo` VARCHAR(255) NOT NULL,
    `Preco` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Concessionaria` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Concessionaria` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_IdConcessionaria_fkey` FOREIGN KEY (`IdConcessionaria`) REFERENCES `Concessionaria`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alocacao` ADD CONSTRAINT `Alocacao_Automovel_fkey` FOREIGN KEY (`Automovel`) REFERENCES `Automoveis`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

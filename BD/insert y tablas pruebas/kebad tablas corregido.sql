-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mykebab
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mykebab
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mykebab` DEFAULT CHARACTER SET utf8 ;
USE `mykebab` ;

-- -----------------------------------------------------
-- Table `mykebab`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(60) NULL,
  `telefono` INT(9) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  `tipo` ENUM('EMPRESA', 'USUARIO', "COCINA", "REPARTIDOR") NOT NULL DEFAULT 'USUARIO',
  `correo` VARCHAR(45) NOT NULL,
  `carrito_carrito` JSON NULL,
  `saldo` DECIMAL(6,2) NULL,
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC) VISIBLE,
  PRIMARY KEY (`id`, `usuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`ingrediente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`ingrediente` (
  `idingrediente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `cantidad` INT NULL,
  `imagen` VARCHAR(45) NULL,
  `precio` DECIMAL(4,2) NOT NULL,
  `descripcion` VARCHAR(300) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idingrediente`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `imagen_UNIQUE` (`imagen` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`alergenos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`alergenos` (
  `idalergenos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`idalergenos`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `imagen_UNIQUE` (`imagen` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `importe` DECIMAL(6,2) NOT NULL COMMENT 'se calculara con la suma de todas las lineas_pedido del pedido\nquiero que no pueda ser negativo si es posible',
  `usuario_id` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `direccion` VARCHAR(300) NULL COMMENT 'instantanea de la direccion seleccionada para el envio',
  `estado` ENUM("RECIBIDO", "EN PREPARACION", "ENVIADO", "COMPLETADO") NULL DEFAULT 'RECIBIDO' COMMENT 'aqui tengo que poner un enum con todos los estados disponibles',
  PRIMARY KEY (`idpedido`),
  INDEX `fk_pedido_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebab`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`kebab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`kebab` (
  `idkebab` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL,
  `precio` DECIMAL(4,2) NOT NULL,
  `descripcion` VARCHAR(300) NOT NULL,
  `kebab_idkebab` INT NULL,
  `estado` ENUM("activo", "Inactivo") NOT NULL,
  PRIMARY KEY (`idkebab`),
  UNIQUE INDEX `foto_UNIQUE` (`foto` ASC) VISIBLE,
  INDEX `fk_kebab_kebab1_idx` (`kebab_idkebab` ASC) VISIBLE,
  CONSTRAINT `fk_kebab_kebab1`
    FOREIGN KEY (`kebab_idkebab`)
    REFERENCES `mykebab`.`kebab` (`idkebab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`provincia` (
  `nombre` VARCHAR(30) NOT NULL COMMENT 'se obtienen los datos desde el ine',
  `codprov` INT NOT NULL,
  PRIMARY KEY (`nombre`),
  UNIQUE INDEX `codprov_UNIQUE` (`codprov` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`localidad` (
  `nombreloc` VARCHAR(60) NOT NULL,
  `nombreprov` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`nombreloc`, `nombreprov`),
  INDEX `fk_localidad_provincia1_idx` (`nombreprov` ASC) VISIBLE,
  CONSTRAINT `fk_localidad_provincia1`
    FOREIGN KEY (`nombreprov`)
    REFERENCES `mykebab`.`provincia` (`nombre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`direccion` (
  `iddireccion` INT NOT NULL AUTO_INCREMENT,
  `via` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(30) NOT NULL,
  `resto` VARCHAR(45) NULL,
  `puntoGPS` VARCHAR(45) NULL COMMENT 'necesito una api para que cuando guarde la direccion se cargue con una api desde google ',
  `localidad_nombreloc` VARCHAR(60) NOT NULL,
  `localidad_nombreprov` VARCHAR(30) NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`iddireccion`),
  INDEX `fk_direccion_localidad1_idx` (`localidad_nombreloc` ASC, `localidad_nombreprov` ASC) VISIBLE,
  INDEX `fk_direccion_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_direccion_localidad1`
    FOREIGN KEY (`localidad_nombreloc` , `localidad_nombreprov`)
    REFERENCES `mykebab`.`localidad` (`nombreloc` , `nombreprov`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_direccion_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebab`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`kebab_ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`kebab_ingredientes` (
  `kebab_idkebab` INT NOT NULL,
  `ingrediente_idingrediente` INT NOT NULL,
  PRIMARY KEY (`kebab_idkebab`, `ingrediente_idingrediente`),
  INDEX `fk_kebap_has_ingrediente_ingrediente1_idx` (`ingrediente_idingrediente` ASC) VISIBLE,
  INDEX `fk_kebap_has_ingrediente_kebap1_idx` (`kebab_idkebab` ASC) VISIBLE,
  CONSTRAINT `fk_kebap_has_ingrediente_kebap1`
    FOREIGN KEY (`kebab_idkebab`)
    REFERENCES `mykebab`.`kebab` (`idkebab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_kebap_has_ingrediente_ingrediente1`
    FOREIGN KEY (`ingrediente_idingrediente`)
    REFERENCES `mykebab`.`ingrediente` (`idingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`ingrediente_alergenos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`ingrediente_alergenos` (
  `ingrediente_idingrediente` INT NOT NULL,
  `alergenos_idalergenos` INT NOT NULL,
  PRIMARY KEY (`ingrediente_idingrediente`, `alergenos_idalergenos`),
  INDEX `fk_ingrediente_has_alergenos_alergenos1_idx` (`alergenos_idalergenos` ASC) VISIBLE,
  INDEX `fk_ingrediente_has_alergenos_ingrediente1_idx` (`ingrediente_idingrediente` ASC) VISIBLE,
  CONSTRAINT `fk_ingrediente_has_alergenos_ingrediente1`
    FOREIGN KEY (`ingrediente_idingrediente`)
    REFERENCES `mykebab`.`ingrediente` (`idingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingrediente_has_alergenos_alergenos1`
    FOREIGN KEY (`alergenos_idalergenos`)
    REFERENCES `mykebab`.`alergenos` (`idalergenos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`pedido_kebab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`pedido_kebab` (
  `kebab_idkebab` INT NOT NULL,
  `linea de linea` INT NOT NULL AUTO_INCREMENT COMMENT 'aqui vamos a poner la linea con toda la informacion necesaria, nombre de kebap, ingredientes, precio, cantidad, total',
  `pedido_idpedido` INT NOT NULL,
  `nombre_kebab` VARCHAR(45) NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` DECIMAL(4,2) NOT NULL,
  `total` DECIMAL(6,2) GENERATED ALWAYS AS (precio*cantidad) VIRTUAL COMMENT 'campo calculado',
  `kebabJSON` JSON NULL COMMENT 'de esta forma puedo guardar el kebap que pedi por si lo quiero llamar otra vez para volver a pedirlo, aqui podemos guardar un texto en formato json con el nombre del kebap y los ingradientes, si el kebap existe cargamos el kebap con los ingredientes que se pidieron en el pedido y que estan en el json, si no existe cargamos algusto con los ingredientes seleccionados del json.\n{nombre: nombreQueTiene, ingredientes:[nombre1,nombre2,nombre3]}',
  PRIMARY KEY (`linea de linea`),
  INDEX `fk_kebap_has_pedido_kebap1_idx` (`kebab_idkebab` ASC) VISIBLE,
  INDEX `fk_pedido_kebab_pedido1_idx` (`pedido_idpedido` ASC) VISIBLE,
  CONSTRAINT `fk_kebap_has_pedido_kebap1`
    FOREIGN KEY (`kebab_idkebab`)
    REFERENCES `mykebab`.`kebab` (`idkebab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_kebab_pedido1`
    FOREIGN KEY (`pedido_idpedido`)
    REFERENCES `mykebab`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebab`.`usuario_alergenos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebab`.`usuario_alergenos` (
  `usuario_id` INT NOT NULL,
  `alergenos_idalergenos` INT NOT NULL,
  PRIMARY KEY (`usuario_id`, `alergenos_idalergenos`),
  INDEX `fk_usuario_has_alergenos_alergenos1_idx` (`alergenos_idalergenos` ASC) VISIBLE,
  INDEX `fk_usuario_has_alergenos_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_has_alergenos_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebab`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_alergenos_alergenos1`
    FOREIGN KEY (`alergenos_idalergenos`)
    REFERENCES `mykebab`.`alergenos` (`idalergenos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

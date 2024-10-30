-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mykebap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mykebap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mykebap` DEFAULT CHARACTER SET utf8 ;
USE `mykebap` ;

-- -----------------------------------------------------
-- Table `mykebap`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(60) NULL,
  `telefono` INT(9) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  `tipo` ENUM('EMPRESA', 'USUARIO') NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `usuario_id` INT NULL,
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  INDEX `fk_usuario_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebap`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`ingrediente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`ingrediente` (
  `idingrediente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `cantidad` INT NULL,
  `imagen` VARCHAR(45) NULL,
  `precio` DECIMAL(4,2) NOT NULL,
  PRIMARY KEY (`idingrediente`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `imagen_UNIQUE` (`imagen` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`alergenos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`alergenos` (
  `idalergenos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  PRIMARY KEY (`idalergenos`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE,
  UNIQUE INDEX `imagen_UNIQUE` (`imagen` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `importe` DECIMAL(4,2) NOT NULL,
  `usuario_id` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `direccion` VARCHAR(200) NULL COMMENT 'la direccion sera un con todo concatenado de la direccion elegida si es envio a domicilio',
  PRIMARY KEY (`idpedido`),
  INDEX `fk_pedido_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebap`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`kebap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`kebap` (
  `idkebap` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL,
  `precio` DECIMAL(4,2) NOT NULL,
  PRIMARY KEY (`idkebap`),
  UNIQUE INDEX `foto_UNIQUE` (`foto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`provincia` (
  `nombre` INT NOT NULL COMMENT 'se obtienen los datos desde el ine',
  PRIMARY KEY (`nombre`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`localidad` (
  `nombreloc` VARCHAR(60) NOT NULL,
  `provincia_nombre` INT NOT NULL,
  PRIMARY KEY (`nombreloc`, `provincia_nombre`),
  INDEX `fk_localidad_provincia1_idx` (`provincia_nombre` ASC) VISIBLE,
  CONSTRAINT `fk_localidad_provincia1`
    FOREIGN KEY (`provincia_nombre`)
    REFERENCES `mykebap`.`provincia` (`nombre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`direccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`direccion` (
  `iddireccion` INT NOT NULL AUTO_INCREMENT,
  `via` VARCHAR(45) NOT NULL,
  `numero` INT NOT NULL,
  `resto` VARCHAR(45) NULL,
  `localidad_nombreloc` VARCHAR(60) NOT NULL,
  `localidad_privincia_privincia` VARCHAR(45) NOT NULL,
  `puntoGPS` VARCHAR(45) NOT NULL COMMENT 'necesito una api para que cuando guarde la direccion se cargue con una api desde google ',
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`iddireccion`, `localidad_nombreloc`, `localidad_privincia_privincia`, `usuario_id`),
  INDEX `fk_direccion_localidad1_idx` (`localidad_nombreloc` ASC, `localidad_privincia_privincia` ASC) VISIBLE,
  INDEX `fk_direccion_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_direccion_localidad1`
    FOREIGN KEY (`localidad_nombreloc`)
    REFERENCES `mykebap`.`localidad` (`nombreloc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_direccion_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mykebap`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`kebap_ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`kebap_ingredientes` (
  `kebap_idkebap` INT NOT NULL,
  `ingrediente_idingrediente` INT NOT NULL,
  PRIMARY KEY (`kebap_idkebap`, `ingrediente_idingrediente`),
  INDEX `fk_kebap_has_ingrediente_ingrediente1_idx` (`ingrediente_idingrediente` ASC) VISIBLE,
  INDEX `fk_kebap_has_ingrediente_kebap1_idx` (`kebap_idkebap` ASC) VISIBLE,
  CONSTRAINT `fk_kebap_has_ingrediente_kebap1`
    FOREIGN KEY (`kebap_idkebap`)
    REFERENCES `mykebap`.`kebap` (`idkebap`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_kebap_has_ingrediente_ingrediente1`
    FOREIGN KEY (`ingrediente_idingrediente`)
    REFERENCES `mykebap`.`ingrediente` (`idingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`ingrediente_alergenos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`ingrediente_alergenos` (
  `ingrediente_idingrediente` INT NOT NULL,
  `alergenos_idalergenos` INT NOT NULL,
  PRIMARY KEY (`ingrediente_idingrediente`, `alergenos_idalergenos`),
  INDEX `fk_ingrediente_has_alergenos_alergenos1_idx` (`alergenos_idalergenos` ASC) VISIBLE,
  INDEX `fk_ingrediente_has_alergenos_ingrediente1_idx` (`ingrediente_idingrediente` ASC) VISIBLE,
  CONSTRAINT `fk_ingrediente_has_alergenos_ingrediente1`
    FOREIGN KEY (`ingrediente_idingrediente`)
    REFERENCES `mykebap`.`ingrediente` (`idingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ingrediente_has_alergenos_alergenos1`
    FOREIGN KEY (`alergenos_idalergenos`)
    REFERENCES `mykebap`.`alergenos` (`idalergenos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mykebap`.`lineas_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mykebap`.`lineas_pedido` (
  `idlineas_pedido` INT NOT NULL AUTO_INCREMENT,
  `pedido_idpedido` INT NOT NULL,
  `linea de linea` VARCHAR(100) NOT NULL COMMENT 'aqui vamos a poner la linea con toda la informacion necesaria, nombre de kebap, ingredientes, precio, cantidad, total',
  `cantidad` INT NOT NULL,
  `precio` INT NOT NULL,
  `total` INT GENERATED ALWAYS AS (precio*cantidad) VIRTUAL COMMENT 'campo calculado',
  `kebapJSON` VARCHAR(300) NOT NULL COMMENT 'de esta forma puedo guardar el kebap que pedi por si lo quiero llamar otra vez para volver a pedirlo, aqui podemos guardar un texto en formato json con el nombre del kebap y los ingradientes, si el kebap existe cargamos el kebap con los ingredientes que se pidieron en el pedido y que estan en el json, si no existe cargamos algusto con los ingredientes seleccionados del json.\n{nombre: nombreQueTiene, ingredientes:[nombre1,nombre2,nombre3]}',
  PRIMARY KEY (`idlineas_pedido`, `pedido_idpedido`),
  INDEX `fk_lineas_pedido_pedido1_idx` (`pedido_idpedido` ASC) VISIBLE,
  CONSTRAINT `fk_lineas_pedido_pedido1`
    FOREIGN KEY (`pedido_idpedido`)
    REFERENCES `mykebap`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: mercasoftx
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `Id_Area` int NOT NULL AUTO_INCREMENT,
  `Nom_Area` varchar(100) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Agroindustria','2024-10-17 06:31:54','2024-10-17 06:31:54'),(22,'Pecuaria','2024-10-19 04:04:31','2024-10-19 04:04:31'),(24,'Agricola','2024-10-19 04:04:36','2024-10-19 04:04:35'),(25,'Gestion Ambiental','2024-10-19 04:04:45','2024-10-19 04:04:45');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `Id_Carrito` int NOT NULL AUTO_INCREMENT,
  `Id_Producto` int DEFAULT NULL,
  `Id_Cliente` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Carrito`),
  KEY `fk_carrito_producto_idx` (`Id_Producto`),
  KEY `fk_carrito_cliente_idx` (`Id_Cliente`),
  CONSTRAINT `fk_carrito_cliente` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Cliente`),
  CONSTRAINT `fk_carrito_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,NULL,NULL,6,'2024-08-22 02:25:07','2024-08-22 02:25:07'),(2,NULL,NULL,6,'2024-08-22 02:28:47','2024-08-22 02:28:47'),(4,NULL,NULL,14,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(5,NULL,NULL,14,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(6,NULL,NULL,99,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(8,NULL,NULL,15,'2024-08-22 02:06:59','2024-08-22 02:06:59'),(9,NULL,NULL,13,'2024-08-22 02:07:36','2024-08-22 02:07:36'),(10,NULL,NULL,12,'2024-08-22 02:08:25','2024-08-22 02:08:25'),(11,NULL,NULL,1111,'2024-08-22 02:19:23','2024-08-22 02:19:23'),(12,NULL,NULL,22,'2024-08-22 03:58:10','2024-08-22 03:58:10'),(13,11,16,1,'2024-10-11 15:08:27','2024-10-11 15:08:27'),(14,10,17,1,'2024-10-11 15:51:23','2024-10-11 15:51:23'),(15,9,18,1,'2024-10-14 14:48:27','2024-10-14 14:48:27'),(16,10,19,1,'2024-10-14 14:50:04','2024-10-14 14:50:04'),(17,10,20,4,'2024-10-18 04:27:16','2024-10-18 04:27:16'),(18,10,21,4,'2024-10-18 04:30:43','2024-10-18 04:30:43'),(19,10,22,4,'2024-10-18 04:33:58','2024-10-18 04:33:58'),(20,10,23,4,'2024-10-18 04:37:03','2024-10-18 04:37:03'),(21,10,24,1,'2024-10-18 04:39:19','2024-10-18 04:39:19'),(22,10,25,1,'2024-10-18 04:42:21','2024-10-18 04:42:21'),(23,10,26,1,'2024-10-18 04:42:57','2024-10-18 04:42:57'),(24,10,27,1,'2024-10-18 04:44:25','2024-10-18 04:44:25'),(25,10,28,2,'2024-10-18 04:47:13','2024-10-18 04:47:13');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritoproducto`
--

DROP TABLE IF EXISTS `carritoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritoproducto` (
  `Id_carritoProducto` int NOT NULL AUTO_INCREMENT,
  `Id_Carrito` int DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_carritoProducto`),
  KEY `fk_carritoproducto_carrito_idx` (`Id_Carrito`),
  KEY `fk_carritoproducto_producto_idx` (`Id_Producto`),
  CONSTRAINT `fk_carritoproducto_carrito` FOREIGN KEY (`Id_Carrito`) REFERENCES `carrito` (`Id_Carrito`),
  CONSTRAINT `fk_carritoproducto_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoproducto`
--

LOCK TABLES `carritoproducto` WRITE;
/*!40000 ALTER TABLE `carritoproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `Id_Cliente` int NOT NULL AUTO_INCREMENT,
  `Nom_Cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Cor_Cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tel_Cliente` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Dir_Cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tip_Cliente` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (16,'Sebastian','','312 212 1232','Sena Empresa','Regular','2024-10-11 15:08:27','2024-10-11 15:08:27'),(17,'Sofia Solano','SofiaSolaque@gmail.com','356 723 4567','Sena Empresa','Vigilante','2024-10-11 15:51:23','2024-10-11 15:51:23'),(18,'Fabian','fabian@gmail.com','301 211 5667','Ambiente de navegación','Funcionario','2024-10-14 14:48:27','2024-10-14 14:48:27'),(19,'Sebastian','sebastian@gmail.com','302 156 8465','Sala de profesores','Funcionario','2024-10-14 14:50:04','2024-10-14 14:50:04'),(20,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Aprendiz','2024-10-18 04:27:16','2024-10-18 04:27:16'),(21,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:30:43','2024-10-18 04:30:43'),(22,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:33:58','2024-10-18 04:33:58'),(23,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:37:03','2024-10-18 04:37:03'),(24,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:39:19','2024-10-18 04:39:19'),(25,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','1','2024-10-18 04:42:21','2024-10-18 04:42:21'),(26,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','1','2024-10-18 04:42:57','2024-10-18 04:42:57'),(27,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:44:25','2024-10-18 04:44:25'),(28,'Jesus','jesus@gmail.com','302 112 4566','Sena Empresa','Funcionario','2024-10-18 04:47:13','2024-10-18 04:47:13');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrada`
--

DROP TABLE IF EXISTS `entrada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrada` (
  `Id_Entrada` int NOT NULL AUTO_INCREMENT,
  `Dcp_Entrada` varchar(100) DEFAULT NULL,
  `Fec_Entrada` date DEFAULT NULL,
  `Ori_Entrada` varchar(100) DEFAULT NULL,
  `Des_Entrada` varchar(100) DEFAULT NULL,
  `Val_Unitario` int DEFAULT NULL,
  `Val_Total` int DEFAULT NULL,
  `Id_Unidad` int DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Id_Responsable` int DEFAULT NULL,
  `Can_Entrada` int DEFAULT NULL,
  `Fec_Vencimiento` date DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Entrada`),
  KEY `Id_Producto_idx` (`Id_Producto`),
  KEY `Id_Responsable_idx` (`Id_Responsable`),
  KEY `Id_Unidad_idx` (`Id_Unidad`),
  CONSTRAINT `Id_Producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`),
  CONSTRAINT `Id_Responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `Id_Unidad` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad` (`Id_Unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrada`
--

LOCK TABLES `entrada` WRITE;
/*!40000 ALTER TABLE `entrada` DISABLE KEYS */;
INSERT INTO `entrada` VALUES (1,'Ejemplo de documento','2024-10-19','1','2',100,1000,27,10,3,10,'2024-10-19','2024-10-19 21:12:16','2024-10-19 21:12:16'),(2,'123','2024-10-18','123','123',123,123,26,11,3,123,'2024-10-18','2024-10-18 07:02:10','2024-10-18 07:02:10'),(3,'asd','2024-10-16','1221212','1212',2322333,12212,1,10,27,23,'2024-10-31','2024-10-18 07:03:49','2024-10-18 07:03:49'),(5,'Ejemplo de documento','2024-10-19','Ovinos','Mercasena',2000,20000,55,15,3,10,'2024-10-31','2024-10-19 21:13:39','2024-10-19 21:13:39');
/*!40000 ALTER TABLE `entrada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `Id_Pedido` int NOT NULL AUTO_INCREMENT,
  `Id_Cliente` int DEFAULT NULL,
  `Fec_Pedido` date DEFAULT NULL,
  `Est_Pedido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Val_Pedido` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Pedido`),
  KEY `Id_Cliente_idx` (`Id_Cliente`),
  CONSTRAINT `Id_Cliente` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (10,19,'2024-10-14','Pendiente',10000,'2024-10-14 14:50:04','2024-10-14 14:50:04'),(11,28,'2024-10-18','Pendiente',20000,'2024-10-18 04:47:13','2024-10-18 04:47:13');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidoproducto`
--

DROP TABLE IF EXISTS `pedidoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidoproducto` (
  `Id_PedidoProducto` int NOT NULL AUTO_INCREMENT,
  `Id_Pedido` int DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_PedidoProducto`),
  KEY `Id_Producto_idx` (`Id_Producto`),
  KEY `fk_pedidoproducto_pedido_idx` (`Id_Pedido`),
  CONSTRAINT `fk_pedidoproducto_pedido` FOREIGN KEY (`Id_Pedido`) REFERENCES `pedido` (`Id_Pedido`),
  CONSTRAINT `fk_pedidoproducto_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidoproducto`
--

LOCK TABLES `pedidoproducto` WRITE;
/*!40000 ALTER TABLE `pedidoproducto` DISABLE KEYS */;
INSERT INTO `pedidoproducto` VALUES (1,11,10,2,'2024-10-18 04:47:13','2024-10-18 04:47:13');
/*!40000 ALTER TABLE `pedidoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `Id_Producto` int NOT NULL AUTO_INCREMENT,
  `Nom_Producto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Car_Producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Exi_Producto` int DEFAULT NULL,
  `Ima_Producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Fec_Vencimiento` date DEFAULT NULL,
  `Id_Unidad` int DEFAULT NULL,
  `Uni_DeMedida` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Pre_Producto` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Producto`),
  KEY `fk_producto_unidad_idx` (`Id_Unidad`),
  CONSTRAINT `fk_producto_unidad` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad` (`Id_Unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (9,'Manjar de cafe','Nutritivo',13,'/uploads/20241018013019534-18115191.jpg','2024-10-16',26,'Unidad',4000,'2024-10-18 06:46:09','2024-10-18 06:46:09'),(10,'Cubeta de huevos','Tipo AA',4,'/uploads/20241017233627679-158668797.jpg','2024-10-11',28,'Cubeta',10000,'2024-10-17 23:36:27','2024-10-17 23:36:27'),(11,'Tilapia Roja','Fresca y natural',19,'/uploads/20241017233634063-778790852.jpg','2024-10-31',25,'Kg',7000,'2024-10-18 07:30:16','2024-10-18 07:30:16'),(12,'Arroz con leche','Arroz y leche',15,'/uploads/20241017233643510-26182164.jpg','2024-10-31',27,'Kg',5000,'2024-10-17 23:36:43','2024-10-17 23:36:43'),(14,'Pure de limon','Dulce y nutrutivo',12,'/uploads/20241017233649997-958601738.jpg','2024-10-31',27,'Unidad',3000,'2024-10-17 23:36:50','2024-10-17 23:36:50'),(15,'Guayaba','Ricas y delicisas',16,'/uploads/20241017233657780-445571125.jpg','2024-10-31',27,'Unidad',3000,'2024-10-17 23:36:57','2024-10-17 23:36:57');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `Id_Responsable` int NOT NULL AUTO_INCREMENT,
  `Nom_Responsable` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tel_Responsable` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tip_Responsable` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tip_Genero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (3,'Edwar Mauricio Rojas Vargas','321 925 2362','Administrador','Masculino','2024-10-18 06:24:19','2024-10-18 06:24:19'),(27,'Jesus Alberto Molina Leal','302 822 8518','Administrador','Masculino','2024-10-12 21:09:26','2024-10-12 21:09:26'),(28,'Carlos German Moreno Bonilla','342 778 5578','Administrador','Masculino','2024-10-19 03:54:28','2024-10-19 03:54:28');
/*!40000 ALTER TABLE `responsable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traslado`
--

DROP TABLE IF EXISTS `traslado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traslado` (
  `Id_Traslado` int NOT NULL AUTO_INCREMENT,
  `Fec_Traslado` date DEFAULT NULL,
  `Dcp_Traslado` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Ori_Traslado` int DEFAULT NULL,
  `Des_Traslado` int DEFAULT NULL,
  `Uni_DeMedida` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `Val_Unitario` int DEFAULT NULL,
  `Id_Responsable` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Traslado`),
  KEY `Id_Responsable_idx` (`Id_Responsable`),
  KEY `Id_Producto_idx` (`Id_Producto`),
  CONSTRAINT `fk_traslado_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`),
  CONSTRAINT `fk_traslado_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslado`
--

LOCK TABLES `traslado` WRITE;
/*!40000 ALTER TABLE `traslado` DISABLE KEYS */;
INSERT INTO `traslado` VALUES (2,'2024-10-18','123',123,123,'kg',9,123,12,3,'2024-10-18 06:41:04','2024-10-18 06:41:04'),(3,'2024-10-19','123',123,123,'l',11,5,8000,3,'2024-10-19 21:18:44','2024-10-19 21:18:44');
/*!40000 ALTER TABLE `traslado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad` (
  `Id_Unidad` int NOT NULL AUTO_INCREMENT,
  `Id_Area` int DEFAULT NULL,
  `Id_Responsable` int DEFAULT NULL,
  `Nom_Unidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Unidad`),
  KEY `fk_unidad_area_idx` (`Id_Area`),
  KEY `fk_unidad_responsable_idx` (`Id_Responsable`),
  CONSTRAINT `fk_unidad_area` FOREIGN KEY (`Id_Area`) REFERENCES `area` (`Id_Area`),
  CONSTRAINT `fk_unidad_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,1,3,'Lacteos','2024-10-18 03:58:01','2024-10-18 03:58:01'),(25,1,3,'Carnicos','2024-10-19 04:05:41','2024-10-19 04:05:41'),(26,24,3,'Ganaderia','2024-10-12 21:13:12','2024-10-12 21:13:12'),(27,22,3,'Laboratorios de calidad','2024-10-18 02:01:35','2024-10-18 02:01:35'),(28,24,3,'Avicultura','2024-10-12 21:13:30','2024-10-12 21:13:30'),(29,25,3,'Bioinsumos','2024-10-12 21:13:26','2024-10-12 21:13:26'),(55,24,3,'Caprinos','2024-10-18 03:51:48','2024-10-18 03:51:48'),(56,22,27,'Caprinos','2024-10-19 21:09:33','2024-10-19 21:09:33');
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `Id_Usuario` int NOT NULL AUTO_INCREMENT,
  `Id_Responsable` int DEFAULT NULL,
  `Cor_Usuario` varchar(100) DEFAULT NULL,
  `Password_Usuario` varchar(255) DEFAULT NULL,
  `ResetPasswordToken` varchar(255) DEFAULT NULL,
  `ResetPasswordExpires` datetime DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Cor_Usuario_UNIQUE` (`Cor_Usuario`),
  KEY `fk_usuario_responsable_idx` (`Id_Responsable`),
  CONSTRAINT `fk_usuario_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (13,27,'jesusalbertomolinaleal@gmail.com','$2b$10$Hh0th/2vFfm72EV6YDAMuOeazAPlrfP5su.w2qS2KaThSAeOyfD.G','55586376dcde4bfdfab18fdd3d661b188be976b2','2024-10-18 00:41:21','2024-10-17 23:41:21','2024-10-17 23:41:21'),(14,28,'carlos.morenob@misena.edu.co','$2b$10$nkfm4wEtez4MM/.jj7vJE.rybQeXp8PlX03kDVzymmULX1ufcm/0q',NULL,NULL,'2024-10-19 04:02:19','2024-10-19 04:02:19');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `Id_Venta` int NOT NULL AUTO_INCREMENT,
  `Fec_Venta` date DEFAULT NULL,
  `Val_Venta` int DEFAULT NULL,
  `Tip_Cliente` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Id_Pedido` int DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Venta`),
  KEY `Id_Pedido_idx` (`Id_Pedido`) /*!80000 INVISIBLE */,
  KEY `fk_venta_producto_idx` (`Id_Producto`),
  CONSTRAINT `fk_venta_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`),
  CONSTRAINT `Id_Pedido` FOREIGN KEY (`Id_Pedido`) REFERENCES `pedido` (`Id_Pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (9,'2024-10-01',1000,'Funcionario',10,10,'2024-10-18 07:29:31','2024-10-18 07:29:31'),(10,'2024-10-19',100000,'Aprendiz',11,9,'2024-10-19 21:19:51','2024-10-19 21:19:51');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19 16:20:58

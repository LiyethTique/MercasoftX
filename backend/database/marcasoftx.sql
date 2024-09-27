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
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Agroindustria','2024-09-21 01:45:52','2024-09-21 01:45:52'),(2,'Pecuaria','2024-09-21 01:46:06','2024-09-21 01:46:06'),(3,'Agrícola','2024-09-21 01:46:24','2024-09-21 01:46:24'),(4,'Gestión Ambiental','2024-09-21 01:46:52','2024-09-21 01:46:52');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,NULL,NULL,6,'2024-08-22 02:25:07','2024-08-22 02:25:07'),(2,NULL,NULL,6,'2024-08-22 02:28:47','2024-08-22 02:28:47'),(4,NULL,NULL,14,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(5,NULL,NULL,14,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(6,NULL,NULL,99,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(8,NULL,NULL,15,'2024-08-22 02:06:59','2024-08-22 02:06:59'),(9,NULL,NULL,13,'2024-08-22 02:07:36','2024-08-22 02:07:36'),(10,NULL,NULL,12,'2024-08-22 02:08:25','2024-08-22 02:08:25'),(11,NULL,NULL,1111,'2024-08-22 02:19:23','2024-08-22 02:19:23'),(12,NULL,NULL,22,'2024-08-22 03:58:10','2024-08-22 03:58:10');
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
  `Tel_Cliente` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Dir_Cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tip_Cliente` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Fabian','fabian@example.com','5551234567',NULL,NULL,'2024-08-13 05:00:00','2024-09-15 15:10:18'),(2,'Sofia','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-13 05:00:00','2024-08-22 04:20:40'),(4,'Maria Montealegre','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-13 05:00:00','2024-09-15 15:09:55'),(6,'Maria Montealegre','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-13 05:00:00','2024-08-22 03:41:52'),(7,'Maria','mmontealegre@example.com','555123456',NULL,NULL,'2024-08-13 05:00:00','2024-09-15 15:10:10'),(9,'Maria2','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-13 05:00:00','2024-08-22 04:18:45'),(10,'Fiona','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-13 05:00:00','2024-08-22 04:21:13'),(11,'Fiona','mmontealegre@example.com','5551234568',NULL,NULL,'2024-08-22 04:21:39','2024-08-22 04:21:39'),(14,'asd','ads@gmail.com','1231',NULL,NULL,'2024-09-15 13:43:06','2024-09-15 13:46:09');
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
  `Ori_Entrada` int DEFAULT NULL,
  `Des_Entrada` int DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrada`
--

LOCK TABLES `entrada` WRITE;
/*!40000 ALTER TABLE `entrada` DISABLE KEYS */;
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
  `Id_Producto` int DEFAULT NULL,
  `Fec_Pedido` date DEFAULT NULL,
  `Est_Pedido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Val_Pedido` decimal(10,2) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Pedido`),
  KEY `Id_Cliente_idx` (`Id_Cliente`),
  KEY `fk_pedido_prodcuto_idx` (`Id_Producto`),
  CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Cliente`),
  CONSTRAINT `fk_pedido_prodcuto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,2,NULL,NULL,'Completado',250.75,'2024-09-19 01:25:31','2024-09-19 01:25:31'),(2,11,NULL,NULL,'Procesando',250.75,'2024-09-19 01:31:29','2024-09-19 01:31:29'),(5,9,NULL,NULL,'Fallido',250.75,'2024-09-19 01:31:20','2024-09-19 01:31:20'),(7,1,NULL,NULL,'En espera',10000.00,'2024-09-18 01:09:30','2024-09-18 01:09:30'),(15,1,NULL,NULL,'Pendiente',1.00,'2024-09-19 01:20:28','2024-09-19 01:20:28'),(16,1,NULL,NULL,'Pendiente',0.02,'2024-09-19 01:23:42','2024-09-19 01:23:42');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidoproducto`
--

LOCK TABLES `pedidoproducto` WRITE;
/*!40000 ALTER TABLE `pedidoproducto` DISABLE KEYS */;
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
  `Pre_Producto` decimal(10,2) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Producto`),
  KEY `fk_producto_unidad_idx` (`Id_Unidad`),
  CONSTRAINT `fk_producto_unidad` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad` (`Id_Unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Huevos','1',1,'URL','2024-09-18',1,'Gr',500.00,'2024-09-19 01:49:19','2024-09-19 01:49:19');
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
  `Tel_Responsable` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Tip_Responsable` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tip_Genero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (1,'Juan Perez','5551234567','Administrador','Masculino','2024-08-13 05:00:00','2024-08-13 05:00:00'),(2,'Camila Savogal','5551234566','Pasante','Femenino','2024-08-13 05:00:00','2024-08-13 05:00:00');
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
  `Dcp_Traslado` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Ori_Traslado` int DEFAULT NULL,
  `Des_Traslado` int DEFAULT NULL,
  `Uni_DeMedida` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `Val_Unitario` decimal(10,2) DEFAULT NULL,
  `Id_Responsable` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Traslado`),
  KEY `Id_Responsable_idx` (`Id_Responsable`),
  KEY `Id_Producto_idx` (`Id_Producto`),
  CONSTRAINT `fk_traslado_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`),
  CONSTRAINT `fk_traslado_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traslado`
--

LOCK TABLES `traslado` WRITE;
/*!40000 ALTER TABLE `traslado` DISABLE KEYS */;
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
  KEY `fk_unidad_responsable_idx` (`Id_Responsable`),
  KEY `fk_unidad_area_idx` (`Id_Area`),
  CONSTRAINT `fk_unidad_area` FOREIGN KEY (`Id_Area`) REFERENCES `area` (`Id_Area`),
  CONSTRAINT `fk_unidad_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,NULL,NULL,'Avicultura','2024-09-19 02:45:04','2024-09-19 02:45:04');
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
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Con_Usuario_UNIQUE` (`Cor_Usuario`),
  KEY `fk_usuario_responsable_idx` (`Id_Responsable`),
  CONSTRAINT `fk_usuario_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1,'jesus@gmail.com','$2b$10$ABO4N5..U42mNiKce3574.5sg9By83uzGR7.JziRLVDYfTL2lW.SK','2024-09-20 03:07:21','2024-09-20 03:07:21'),(2,2,'lukas@gmail.com','$2b$10$Zg6mXgBIuB37./6Mv0h1o.SVkrK9GrKazubfItNwr88ns/QScJiXm','2024-09-20 03:07:21','2024-09-20 03:07:21'),(3,NULL,'juan@gmail.com','$2b$10$ThGiWjg44QdRMWox0vXoFOEzTQ8orVzSpAdbnZSHNRCzkxae0T49K','2024-09-23 20:15:08','2024-09-23 20:15:08'),(4,NULL,'nati@gmail.com','$2b$10$Nzkg3A.L3d8PPENFk2RiQOp0AQuSQE4tvsHujMqpKnwYEToE3l5TO','2024-09-23 20:43:36','2024-09-23 20:43:36');
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
  `Val_Venta` decimal(10,2) DEFAULT NULL,
  `Id_Pedido` int DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Venta`),
  KEY `Id_Pedido_idx` (`Id_Pedido`),
  CONSTRAINT `Id_Pedido` FOREIGN KEY (`Id_Pedido`) REFERENCES `pedido` (`Id_Pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
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

-- Dump completed on 2024-09-25 12:43:18

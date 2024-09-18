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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `Id_Carrito` int NOT NULL AUTO_INCREMENT,
  `Id_Producto` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `Id_Cliente` int DEFAULT NULL,
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
INSERT INTO `carrito` VALUES (1,NULL,6,NULL,'2024-08-22 02:25:07','2024-08-22 02:25:07'),(2,NULL,6,NULL,'2024-08-22 02:28:47','2024-08-22 02:28:47'),(4,NULL,14,NULL,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(5,NULL,14,NULL,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(6,NULL,99,NULL,'2024-08-13 05:00:00','2024-08-13 05:00:00'),(8,NULL,15,NULL,'2024-08-22 02:06:59','2024-08-22 02:06:59'),(9,NULL,13,NULL,'2024-08-22 02:07:36','2024-08-22 02:07:36'),(10,NULL,12,NULL,'2024-08-22 02:08:25','2024-08-22 02:08:25'),(11,NULL,1111,NULL,'2024-08-22 02:19:23','2024-08-22 02:19:23'),(12,NULL,22,NULL,'2024-08-22 03:58:10','2024-08-22 03:58:10');
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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `Id_Categoria` int NOT NULL AUTO_INCREMENT,
  `Nom_Categoria` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Lacteos','2024-08-13 05:00:00','2024-08-13 05:00:00'),(2,'Carnicos','2024-08-13 05:00:00','2024-08-13 05:00:00'),(3,'Panificación','2024-09-17 14:17:42','2024-09-17 14:17:42'),(4,'Fruhor','2024-09-17 14:17:42','2024-09-17 14:17:42'),(5,'Poscosecha','2024-09-17 14:17:42','2024-09-17 14:17:42'),(6,'Laboratirio De Calidad','2024-09-17 14:23:44','2024-09-17 14:23:44'),(7,'Laboratorio De Cafe','2024-09-17 14:23:44','2024-09-17 14:23:44'),(8,'Planta De Aguas','2024-09-17 14:23:44','2024-09-17 14:23:44'),(9,'Chocalateria','2024-09-17 14:23:44','2024-09-17 14:23:44'),(10,'Porcinos','2024-09-17 14:24:02','2024-09-17 14:24:02'),(11,'Caprinos','2024-09-17 14:26:11','2024-09-17 14:26:11'),(12,'Cunicultura','2024-09-17 14:26:32','2024-09-17 14:26:32'),(13,'Avicultura','2024-09-17 14:27:46','2024-09-17 14:27:46'),(14,'Ganaderia','2024-09-17 14:28:56','2024-09-17 14:28:56'),(15,'Ovinos','2024-09-17 14:29:16','2024-09-17 14:29:16'),(16,'Psicicultura','2024-09-17 14:31:52','2024-09-17 14:31:52'),(17,'Apicultura','2024-09-17 14:33:11','2024-09-17 14:33:11'),(18,'Planta De Concentrados','2024-09-17 14:35:19','2024-09-17 14:35:19'),(19,'Laboratorio Reproduccion Bovina','2024-09-17 14:35:55','2024-09-17 14:35:55'),(20,'Lote 1','2024-09-17 14:37:28','2024-09-17 14:37:28'),(21,'Lote 1','2024-09-17 18:56:25','2024-09-17 18:56:25'),(22,'Lote 1','2024-09-17 18:56:36','2024-09-17 18:56:36'),(23,'Lote 2','2024-09-17 18:59:33','2024-09-17 18:59:33'),(24,'Lote 2','2024-09-17 18:59:35','2024-09-17 18:59:35'),(25,'Lote 3','2024-09-17 18:59:35','2024-09-17 18:59:35'),(26,'Lote 4','2024-09-17 18:59:35','2024-09-17 18:59:35'),(27,'Lote 5','2024-09-17 18:59:35','2024-09-17 18:59:35'),(28,'Lote 6','2024-09-17 18:59:35','2024-09-17 18:59:35'),(29,'Lote 7','2024-09-17 18:59:35','2024-09-17 18:59:35'),(30,'Lote 8','2024-09-17 18:59:35','2024-09-17 18:59:35'),(31,'Lote 9','2024-09-17 18:59:35','2024-09-17 18:59:35'),(32,'Lote 20','2024-09-17 18:59:35','2024-09-17 18:59:35'),(34,'Bioinsumos','2024-09-17 19:24:29','2024-09-17 19:24:29'),(35,'Vvero','2024-09-17 19:25:03','2024-09-17 19:25:03'),(36,'Zonas Verdes','2024-09-17 19:26:35','2024-09-17 19:26:35'),(37,'Laboratorio Ambiental','2024-09-17 19:27:28','2024-09-17 19:27:28'),(38,'Gestion De Centro','2024-09-17 19:28:22','2024-09-17 19:28:22'),(39,'Laboratorio Biotecnologia Vegetal','2024-09-17 19:41:44','2024-09-17 19:41:44'),(40,'Mecanizacion Agricola','2024-09-17 20:09:15','2024-09-17 20:09:15'),(41,'Parque De Riego','2024-09-17 20:09:41','2024-09-17 20:09:41'),(42,'Invernadero','2024-09-17 20:11:18','2024-09-17 20:11:18'),(43,'Agricultura De Precision','2024-09-17 23:23:51','2024-09-17 23:23:51'),(44,'Laboratorio De Suelos','2024-09-17 23:24:26','2024-09-17 23:24:26'),(45,'Mercasena 1','2024-09-17 23:25:03','2024-09-17 23:25:03'),(46,'Mercasena 2','2024-09-17 23:25:19','2024-09-17 23:25:19'),(47,'Oficina','2024-09-17 23:26:03','2024-09-17 23:26:03');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
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
INSERT INTO `cliente` VALUES (1,'Fabian','fabian@example.com','5551234567','2024-08-13 05:00:00','2024-09-15 15:10:18'),(2,'Sofia','mmontealegre@example.com','5551234568','2024-08-13 05:00:00','2024-08-22 04:20:40'),(4,'Maria Montealegre','mmontealegre@example.com','5551234568','2024-08-13 05:00:00','2024-09-15 15:09:55'),(6,'Maria Montealegre','mmontealegre@example.com','5551234568','2024-08-13 05:00:00','2024-08-22 03:41:52'),(7,'Maria','mmontealegre@example.com','555123456','2024-08-13 05:00:00','2024-09-15 15:10:10'),(9,'Maria2','mmontealegre@example.com','5551234568','2024-08-13 05:00:00','2024-08-22 04:18:45'),(10,'Fiona','mmontealegre@example.com','5551234568','2024-08-13 05:00:00','2024-08-22 04:21:13'),(11,'Fiona','mmontealegre@example.com','5551234568','2024-08-22 04:21:39','2024-08-22 04:21:39'),(14,'asd','ads@gmail.com','1231','2024-09-15 13:43:06','2024-09-15 13:46:09');
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
  `Fec_Entrada` datetime DEFAULT NULL,
  `Hor_Entrada` time DEFAULT NULL,
  `Id_Unidad` int DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Id_Responsable` int DEFAULT NULL,
  `Can_Entrada` int DEFAULT NULL,
  `Fec_Vencimiento` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Entrada`),
  KEY `Id_Producto_idx` (`Id_Producto`),
  KEY `Id_Responsable_idx` (`Id_Responsable`),
  KEY `Id_Unidad_idx` (`Id_Unidad`),
  CONSTRAINT `Id_Producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`),
  CONSTRAINT `Id_Responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `Id_Unidad` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad` (`Id_Unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `Fec_Pedido` date DEFAULT NULL,
  `Id_Cliente` int DEFAULT NULL,
  `Est_Pedido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Val_Pedido` decimal(10,2) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Pedido`),
  KEY `Id_Cliente_idx` (`Id_Cliente`),
  CONSTRAINT `Id_Cliente` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2024-08-17',2,'En espera',250.75,'2024-09-15 13:48:09','2024-09-15 13:48:09'),(2,'2024-08-17',11,'Pendiente',250.75,'2024-08-22 05:04:50','2024-08-22 05:04:50'),(5,'2024-08-17',9,'Pendiente',250.75,'2024-08-22 05:05:23','2024-08-22 05:05:23');
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
  `Ind_entrega` tinyint(1) DEFAULT NULL,
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
  `Pre_Promedio` decimal(10,2) DEFAULT NULL,
  `Exi_Producto` int DEFAULT NULL,
  `Ima_Producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Fec_Vencimiento` date DEFAULT NULL,
  `Id_Categoria` int DEFAULT NULL,
  `Pre_Anterior` decimal(10,2) DEFAULT NULL,
  `Uni_DeMedida` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Pre_Producto` decimal(10,2) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Producto`),
  KEY `Id_Categoria_idx` (`Id_Categoria`),
  CONSTRAINT `Id_Categoria` FOREIGN KEY (`Id_Categoria`) REFERENCES `categoria` (`Id_Categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
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
  `Cor_Responsable` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Tel_Responsable` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
INSERT INTO `responsable` VALUES (1,'Juan Perez','jperez@example.com','5551234567','Administrador','Masculino','2024-08-13 05:00:00','2024-08-13 05:00:00'),(2,'Camila Savogal','csavogal@example.com','5551234566','Pasante','Femenino','2024-08-13 05:00:00','2024-08-13 05:00:00');
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
  `Des_Traslado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Id_Producto` int DEFAULT NULL,
  `Can_Producto` int DEFAULT NULL,
  `Val_Unitario` decimal(10,2) DEFAULT NULL,
  `Val_Traslado` decimal(10,2) DEFAULT NULL,
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
  `Nom_Unidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
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
  `Con_Usuario` varchar(100) DEFAULT NULL,
  `Password_Usuario` varchar(255) DEFAULT NULL,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Con_Usuario_UNIQUE` (`Con_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
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

-- Dump completed on 2024-09-17 18:27:58

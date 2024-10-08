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
INSERT INTO `area` VALUES (1,'Agroindustria','2024-10-07 04:18:49','2024-10-07 04:18:49'),(2,'Pecuaria','2024-10-05 12:07:45','2024-10-05 12:07:45'),(3,'Agricola','2024-10-05 12:07:48','2024-10-05 12:07:48'),(4,'Gestion Ambiental','2024-10-05 12:08:00','2024-10-05 12:08:00');
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
  PRIMARY KEY (`Id_Carrito`)
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
  `Tel_Cliente` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
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
INSERT INTO `cliente` VALUES (14,'Sofia Solano','SofiaSolaque@gmail.com','335 475 6877',NULL,NULL,'2024-09-29 14:27:22','2024-09-29 14:27:22');
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
  `Ori_Entrada` varchar(45) DEFAULT NULL,
  `Des_Entrada` varchar(45) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrada`
--

LOCK TABLES `entrada` WRITE;
/*!40000 ALTER TABLE `entrada` DISABLE KEYS */;
INSERT INTO `entrada` VALUES (2,'asd','2024-10-08','asd','asd',123,123,1,8,28,123,'2024-10-09','2024-10-08 08:12:06','2024-10-08 08:12:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (8,'Perro caliente','Pan y salchicha Y QUESO',30,NULL,'2024-10-07',12,'Unidad',5000.00,'2024-10-07 05:50:55','2024-10-07 05:50:55'),(9,'Pan','Masas',50,'/uploads/20241007050934819-249693013.png','2024-10-05',2,'Unidad',5000.00,'2024-10-07 05:09:34','2024-10-07 05:09:34'),(10,'Huevos','Gallina',1,'/uploads/20241005205358560-212554924.png','2024-10-05',4,'Unidad',500.00,'2024-10-05 20:53:58','2024-10-05 20:53:58'),(11,'Huevos de codorniz','Codorniz',0,'/uploads/20241006182836472-716289079.png','2024-10-05',5,'Kg',10000.00,'2024-10-06 18:28:36','2024-10-06 18:28:36'),(12,'Queso','Leche',0,'/uploads/20241005222229695-402627604.jpeg','2024-10-05',3,'Kg',10000.00,'2024-10-05 22:22:29','2024-10-05 22:22:29'),(13,'Cebolla Morada','Cebolla',0,'/uploads/20241007055133497-693484072.ico','2024-10-05',3,'Kg',600.00,'2024-10-07 05:51:33','2024-10-07 05:51:33'),(15,'Aji',NULL,0,'/uploads/20241007055239217-261271691.png','2024-10-07',26,'Unidad',1000.00,'2024-10-07 05:52:39','2024-10-07 05:52:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (3,'Edwar Mauricio Rojas Vargas','321 925 2365','Administrador','Masculino','2024-10-05 12:17:36','2024-10-05 12:17:36'),(14,'Liye Jimena Tique Tique','322 325 4657','Administrador','Femenino','2024-10-05 12:17:49','2024-10-05 12:17:49'),(15,'Juan Esteban Leon Garcia','302 842 1714','Administrador','Masculino','2024-10-05 12:18:01','2024-10-05 12:18:01'),(16,'Daniel Felipe Mojica Barrero','321 165 4564','Aprendiz','Masculino','2024-10-06 16:25:08','2024-10-06 16:25:08'),(17,'Juan Carlos Pérez Gómez','300 123 4567','Aprendiz','Masculino','2024-10-05 12:16:57','2024-10-05 12:16:57'),(18,'María Fernanda López Ramírez','301 234 5678','Aprendiz','Femenino','2024-10-05 12:18:56','2024-10-05 12:18:56'),(19,'Andrés Felipe Rodríguez Salazar','302 345 6780','Aprendiz','Masculino','2024-10-05 12:19:34','2024-10-05 12:19:34'),(20,'Laura Isabel González Mendoza','303 456 7890','Aprendiz','Femenino','2024-10-05 12:20:05','2024-10-05 12:20:05'),(21,'Luis Fernando Martínez García','304 567 8901','Aprendiz','Masculino','2024-10-05 12:20:37','2024-10-05 12:20:37'),(22,'Daniela Alejandra Torres Sánchez','305 678 9012','Aprendiz','Femenino','2024-10-05 12:20:58','2024-10-05 12:20:58'),(23,'Santiago David Ramírez Vargas','306 789 0123','Aprendiz','Masculino','2024-10-05 12:21:12','2024-10-05 12:21:12'),(24,'Carolina Sofía Jiménez Paredes','307 890 1234','Aprendiz','Femenino','2024-10-05 12:21:54','2024-10-05 12:21:54'),(25,'Alejandro Tomás Castillo Torres','308 901 2345','Aprendiz','Masculino','2024-10-05 12:22:12','2024-10-05 12:22:12'),(26,'Valentina Camila Ortiz Muñoz','309 012 3456','Aprendiz','Femenino','2024-10-05 12:22:40','2024-10-05 12:22:40'),(27,'Sebastián Nicolás Rojas Mora','310 123 4567','Aprendiz','Masculino','2024-10-05 12:23:19','2024-10-05 12:23:19'),(28,'Juliana Andrea Moreno Cruz','311 234 5678','Aprendiz','Femenino','2024-10-05 12:23:33','2024-10-05 12:23:33'),(29,'Mateo Daniel Vega Gutiérrez','312 345 6789','Aprendiz','Masculino','2024-10-05 12:24:08','2024-10-05 12:24:08'),(30,'Paula Camila Gómez Navarro','313 456 7890','Aprendiz','Femenino','2024-10-05 12:24:21','2024-10-05 12:24:21'),(31,'Tomás Gabriel Duarte Mejía','314 567 8901','Aprendiz','Masculino','2024-10-05 12:24:35','2024-10-05 12:24:35'),(32,'Mariana Sofía Peña Castro','315 678 9012','Aprendiz','Femenino','2024-10-05 12:24:49','2024-10-05 12:24:49'),(33,'Nicolás Alejandro Vargas Ávila','316 789 0123','Aprendiz','Masculino','2024-10-05 12:25:10','2024-10-05 12:25:10'),(34,'Victoria Daniela Rincón Herrera','317 890 1234','Aprendiz','Femenino','2024-10-05 12:25:30','2024-10-05 12:25:30'),(35,'Martín Ignacio Rodríguez Luna','318 901 2345','Aprendiz','Masculino','2024-10-05 12:25:42','2024-10-05 12:25:42'),(36,'Ana María Hernández Jiménez','319 012 3456','Aprendiz','Femenino','2024-10-05 12:25:54','2024-10-05 12:25:54'),(37,'Miguel Ángel Ramírez Páez','320 123 4567','Aprendiz','Masculino','2024-10-05 12:26:11','2024-10-05 12:26:11'),(38,'Camila Valentina Pineda Suárez','321 234 5678','Aprendiz','Femenino','2024-10-05 12:26:29','2024-10-05 12:26:29'),(39,'Samuel Esteban Herrera Zúñiga','322 345 6789','Aprendiz','Masculino','2024-10-05 12:26:47','2024-10-05 12:26:47'),(40,'Sofía Isabel Montoya Escobar','323 456 7890','Aprendiz','Femenino','2024-10-05 12:27:07','2024-10-05 12:27:07'),(41,'Lucas Sebastián Gil Peña','324 567 8901','Aprendiz','Masculino','2024-10-05 12:27:20','2024-10-05 12:27:20'),(42,'Gabriela Alejandra Castro Pérez','325 678 9012','Aprendiz','Femenino','2024-10-05 12:27:35','2024-10-05 12:27:35'),(43,'Emiliano Joaquín Ruiz Díaz','326 789 0123','Aprendiz','Masculino','2024-10-05 12:27:52','2024-10-05 12:27:52'),(44,'Antonia Lucía García Becerra','327 890 1234','Aprendiz','Femenino','2024-10-05 12:28:10','2024-10-05 12:28:10'),(45,'Joaquín Manuel Díaz Rodríguez','328 901 2345','Aprendiz','Masculino','2024-10-05 12:28:38','2024-10-05 12:28:38'),(46,'Sara Isabel Vargas Morales','329 012 3456','Aprendiz','Femenino','2024-10-05 12:29:02','2024-10-05 12:29:02'),(49,'Jesus Alberto Molina Leal','302 282 8518','Administrador','Masculino','2024-10-06 19:56:08','2024-10-06 19:56:08');
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
  KEY `fk_unidad_area_idx` (`Id_Area`),
  KEY `fk_unidad_responsable_idx` (`Id_Responsable`),
  CONSTRAINT `fk_unidad_area` FOREIGN KEY (`Id_Area`) REFERENCES `area` (`Id_Area`),
  CONSTRAINT `fk_unidad_responsable` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,1,3,'Lacteos','2024-10-06 15:36:37','2024-10-06 15:36:37'),(2,1,14,'Carnicos','2024-10-05 12:37:38','2024-10-05 12:37:38'),(3,1,15,'Panificación','2024-10-05 13:46:38','2024-10-05 13:46:38'),(4,1,16,'Fruhor','2024-10-05 13:47:03','2024-10-05 13:47:03'),(5,1,17,'Poscosecha','2024-10-05 13:47:13','2024-10-05 13:47:13'),(6,1,18,'Laboratorios de calidad','2024-10-05 13:47:42','2024-10-05 13:47:42'),(7,1,19,'Laboratorios de cafe','2024-10-05 13:47:55','2024-10-05 13:47:55'),(8,1,20,'Chocolateria','2024-10-05 13:48:45','2024-10-05 13:48:45'),(9,2,21,'Porcinos','2024-10-06 15:40:24','2024-10-06 15:40:24'),(10,2,22,'Caprinos','2024-10-06 15:58:10','2024-10-06 15:58:10'),(11,2,23,'Cunicultura','2024-10-06 19:07:59','2024-10-06 19:07:59'),(12,2,24,'Avicultura','2024-10-06 19:08:16','2024-10-06 19:08:16'),(13,2,25,'Ganaderia','2024-10-06 19:09:06','2024-10-06 19:09:06'),(14,2,26,'Ovinos','2024-10-06 19:10:00','2024-10-06 19:10:00'),(15,2,27,'Piscicultura','2024-10-06 19:10:13','2024-10-06 19:10:13'),(16,2,28,'Apicultura','2024-10-06 19:10:34','2024-10-06 19:10:34'),(17,3,29,'Lote 1','2024-10-06 19:10:46','2024-10-06 19:10:46'),(18,3,30,'Lote 2','2024-10-06 19:10:56','2024-10-06 19:10:56'),(19,3,31,'Lote 3','2024-10-06 19:11:04','2024-10-06 19:11:04'),(20,3,32,'Lote 4','2024-10-06 19:11:28','2024-10-06 19:11:28'),(21,3,33,'Lote 5','2024-10-06 19:11:43','2024-10-06 19:11:43'),(22,3,34,'Lote 6','2024-10-06 19:11:56','2024-10-06 19:11:56'),(23,3,35,'Lote 7','2024-10-06 19:12:24','2024-10-06 19:12:24'),(24,3,36,'Lote 8','2024-10-06 19:12:52','2024-10-06 19:12:52'),(25,3,37,'Lote 9','2024-10-06 19:14:16','2024-10-06 19:14:16'),(26,3,38,'Lote 20','2024-10-06 19:15:17','2024-10-06 19:15:17'),(27,4,39,'Bioinsumos','2024-10-06 19:15:30','2024-10-06 19:15:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,3,'edwarrojs21@gmail.com','$2b$10$W.uSP9tNkI5jw0lvlUOHSODCwDlZ5/Jv.hFGEaJkmdFzZEBpq961y',NULL,NULL,'2024-09-29 20:19:30','2024-09-29 20:19:30'),(6,14,'jimenatique@gmail.com','$2b$10$qtGfIlcRwnG9Wl.SuIu.7Of/Uv9jFPE0/L4Y0MUtkc4YljetO2lsm',NULL,NULL,'2024-10-01 01:11:07','2024-10-01 01:11:07'),(8,49,'jesusalbertomolinaleal@gmail.com','$2b$10$8xHOkmIPe6N9Jk8aaqYqk.fBwPyTK9bwFS/zZ2dQDnTeLgK/9b4ia',NULL,NULL,'2024-10-06 20:25:26','2024-10-06 20:25:26');
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

-- Dump completed on 2024-10-08  3:19:56

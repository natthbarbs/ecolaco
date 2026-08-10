-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ecolaco
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bairro`
--

DROP TABLE IF EXISTS `bairro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bairro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cidade_id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `tipo_coleta` varchar(50) NOT NULL,
  `dia_coleta` varchar(50) NOT NULL,
  `horario` varchar(50) DEFAULT NULL,
  `observacao` varchar(100) DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_cidade_id` (`cidade_id`)
) ENGINE=MyISAM AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bairro`
--

LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` VALUES (1,1,'Aeroporto','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(2,1,'V. Nossa Senhora das Graças','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(3,1,'Alto da Boa Vista','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(4,1,'Centro','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(5,1,'Parque Industrial III','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(6,1,'Loteamento São Sebastião','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(7,1,'Arboris','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(8,1,'Residencial Riviera','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(9,1,'Jd. Alves','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(10,1,'Loteamento Parque Ecológico','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(11,1,'Jd. América','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(12,1,'Jd. Arruda','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(13,1,'Jd. Barão','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(14,1,'Jd. Cabral','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(15,1,'Jd. Canadá I e II','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(16,1,'Jd. Castro','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(17,1,'Jd. Cristo Rei','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(18,1,'Jd. Ismênia','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(19,1,'Jd. Kirei','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(20,1,'Jd. Maria Lúcia','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(21,1,'Jd. Marimar','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(22,1,'Jd. Popular','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(23,1,'Jd. São Francisco','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(24,1,'Jd. São Luis I e II','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(25,1,'Jd. São Paulo','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(26,1,'V. N. S. das Graças','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(27,1,'Parque dos Ipês','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(28,1,'Novo Aeroporto','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(29,1,'Jardim Alto Aeroporto','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(30,1,'Papagaios','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(31,1,'Paraiso','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(32,1,'Pq. Alvorada','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(33,1,'Pq. Bela Vista','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(34,1,'Pq. Dos Mirantes','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(35,1,'Pq. Santa Albertina','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(36,1,'Scyllas Peixoto','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(37,1,'V. Maria Angélica','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(38,1,'Vila Alves','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(39,1,'Vila Ema','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(40,1,'Vila Leão','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(41,1,'Novo Texas','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(42,1,'Vila Rosa','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(43,1,'Residencial Tonet','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(44,1,'Vila São Pedro','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(45,1,'J. Paraiso II','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(46,1,'Parque das Flores','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(47,1,'Vila Scyllas','Regular','Segunda, Quarta e Sexta','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(48,1,'Centro','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(49,1,'Arboris','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(50,1,'Residencial Riviera','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(51,1,'Parque Industrial III','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(52,1,'Loteamento São Sebastião','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(53,1,'Ch. Maravilha','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(54,1,'Cj. H. Anita Moreira','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(55,1,'Residencial Unigarden','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(56,1,'Parque dos Estudantes II','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(57,1,'Country Club','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(58,1,'D. Pedro Filipak','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(59,1,'Jardim Primavera','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(60,1,'Inocoop','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(61,1,'Jardim Batista','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(62,1,'Jd. Alto da Boa Vista','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(63,1,'Jd. Europa','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(64,1,'Jd. João Afonso','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(65,1,'Jd. Miguel Afonso','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(66,1,'Jd. Lamura','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(67,1,'Jd. Leonor','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(68,1,'Jd. Maria Estela','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(69,1,'Jd. Marina','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(70,1,'Jd. Maristela','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(71,1,'Jd. Marumbi','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(72,1,'Jd. Morada do Sol','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(73,1,'Jd. Panorama','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(74,1,'Jd. Santa Rita','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(75,1,'Nova Alcântara','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(76,1,'Nova Jacarezinho','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(77,1,'Pedro Scandolo','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(78,1,'Pq. dos Estudantes','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(79,1,'Res. Campo Belo','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(80,1,'Res. Campo Belo II','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(81,1,'Res. Pompéia II','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(82,1,'Res. Pompéia III','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(83,1,'Vila Aggêo','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(84,1,'Vila Delamura','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(85,1,'Vila Delminda','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(86,1,'Vila Jardim','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(87,1,'Vila Maria','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(88,1,'Vila Prestes','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(89,1,'Vila Ribeiro','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(90,1,'Vila Rondon','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(91,1,'Vila Santana','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(92,1,'Vila Setti','Regular','Terça, Quinta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(93,1,'Marques dos Reis','Especial','Terça e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(94,1,'Cadd','Especial','Terça e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(95,1,'Cofadd','Especial','Terça e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(96,1,'Vila Rural','Especial','Quarta e Sábado','','',1,'2026-08-10 01:26:36','2026-08-10 01:26:36'),(97,2,'Av. Getúlio Vargas','Regular','Segunda e Sexta','','',1,'2026-08-10 01:26:45','2026-08-10 01:26:45'),(98,2,'Rua Dona Úrsula','Regular','Segunda e Sexta','','',1,'2026-08-10 01:26:45','2026-08-10 01:26:45'),(99,2,'Sede','Regular','Terça e Quinta','','',1,'2026-08-10 01:26:45','2026-08-10 01:26:45'),(100,2,'Vila Unidos','Regular','Quarta e Sábado','','',1,'2026-08-10 01:26:45','2026-08-10 01:26:45'),(101,2,'Vila Santana','Regular','Quarta e Sábado','','',1,'2026-08-10 01:26:45','2026-08-10 01:26:45'),(102,3,'Câmpus Universitário','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(103,3,'Vale das Margaridas','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(104,3,'Ayrton Senna / Pe Paulo Broda','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(105,3,'Fortunato Sibin','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(106,3,'Sebastião Cunha','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(107,3,'Ouro Verde','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(108,3,'Dr. João Lima','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(109,3,'União I e II','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(110,3,'Florêncio Rebolho','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(111,3,'Mutirão I e II / Seminário','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(112,3,'Seminário','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(113,3,'Pioneiros','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(114,3,'Jardim Progresso','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(115,3,'Santa Terezinha','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(116,3,'Lago do Bosque / Maanain','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(117,3,'Santa Rosa','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(118,3,'Primavera / Vale do Sol','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(119,3,'Nova Esperança / Vale Verde I e II','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(120,3,'Vila Mariana / Vila Nova / Operários','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(121,3,'Veneza','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(122,3,'Royal Park / Porto Belo','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(123,3,'Novo Horizonte','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(124,3,'José Tiburcio','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(125,3,'Vicentine','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(126,3,'Independência','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(127,3,'Odilon Seganti Athayde','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(128,3,'Benedito Catarino / Marta Dequech','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(129,3,'Residencial das Orquídeas','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(130,3,'Rosário Piteli','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(131,3,'Santa Catarina','Regular','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(132,3,'Parque Industrial','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(133,3,'BR 369','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(134,3,'Aguativa','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(135,3,'Royal Garden','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(136,3,'Vila Morena','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(137,3,'Vila da Antena','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(138,3,'Bela Vista','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(139,3,'Vitor Dantas','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(140,3,'Belle Bergamasco','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(141,3,'João Rocha','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(142,3,'Condomínio dos Idosos','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(143,3,'Panorama','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(144,3,'Henrique Vitorelli','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(145,3,'Nossa Senhora Aparecida','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(146,3,'Ivani Paiva Gatti','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(147,3,'São Judas Tadeu','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(148,3,'Jardim Pérola','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(149,3,'Residencial Atlântico','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(150,3,'Distrito de Congonhas','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(151,3,'Alvorada','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(152,3,'Staiger','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(153,3,'São Pedro','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(154,3,'Cristo Rei','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(155,3,'Varotto','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(156,3,'Figueira','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(157,3,'Vila Moreira','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(158,3,'Vila Recreio','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(159,3,'Setor da FAFI','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(160,3,'Jardim Morumbi','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(161,3,'Jardim São Silvestre I e II','Regular','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(162,3,'Novo Bandeirantes','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(163,3,'Seugling','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(164,3,'Jardim Europa','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(165,3,'Inácio/Galeano','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(166,3,'Jardim Estoril','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(167,3,'Tauros','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(168,3,'Vila América','Regular','Segunda','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(169,3,'Bandeirantes','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(170,3,'Vila Daher','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(171,3,'Vila Ipiranga','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(172,3,'Vila Assad / Henriques','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(173,3,'Vila Paraíso / Vila Haddad','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(174,3,'João XXIII','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(175,3,'Vitória Régia','Regular','Terça','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(176,3,'Área Comercial Central','Regular','Diario','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(177,3,'Extensão da Av. XV de Novembro até o Monumento do Cristo - Rua Bahia','Regular','Diario','16h às 01h','Noturna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(178,3,'Henrique Vittorelli','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(179,3,'João Rocha','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(180,3,'Vitor Dantas','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(181,3,'Bela Vista','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(182,3,'Belle Bergamasco','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(183,3,'Panorama','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(184,3,'Setor da FAFI','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(185,3,'Vila da Antena','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(186,3,'Vila Moreira','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(187,3,'Vila Nossa Senhora','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(188,3,'Ivani Paiva Gatti','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(189,3,'Royal Garden','Seletiva','Segunda','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(190,3,'Rosário Piteli','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(191,3,'Tauros','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(192,3,'Jardim Estoril','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(193,3,'Jardim Europa','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(194,3,'Novo Bandeirantes','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(195,3,'Porto Bello','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(196,3,'Progresso','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(197,3,'Vila América','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(198,3,'Vila Galeano/Inácio','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(199,3,'Santa Catarina','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(200,3,'Santa Terezinha','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(201,3,'Lago do Bosque','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(202,3,'Maanain','Seletiva','Terça','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(203,3,'Área Comercial Central','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(204,3,'Vitória Régia','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(205,3,'Morumbi','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(206,3,'Vila Assad','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(207,3,'Vila Henriques','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(208,3,'São Silvestre I e II','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(209,3,'Vila Ipiranga','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55'),(210,3,'Residencial Atlântico','Seletiva','Quarta','07h às 16h','Diurna',1,'2026-08-10 01:26:55','2026-08-10 01:26:55');
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanhas`
--

DROP TABLE IF EXISTS `campanhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campanhas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prefeitura_id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descricao` text NOT NULL,
  `tipo` enum('campanha','evento','mutirao','reciclagem','comunicado') NOT NULL DEFAULT 'campanha',
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `local` varchar(200) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `status` enum('pendente','aprovado','rejeitado','publicado') NOT NULL DEFAULT 'pendente',
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_prefeitura_id` (`prefeitura_id`),
  KEY `idx_status` (`status`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanhas`
--

LOCK TABLES `campanhas` WRITE;
/*!40000 ALTER TABLE `campanhas` DISABLE KEYS */;
/*!40000 ALTER TABLE `campanhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `tem_info` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_nome_cidade` (`nome`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade` VALUES (1,'Jacarezinho',-23.1600000,-49.9698000,1),(2,'Cambará',-23.0444000,-50.0733000,1),(3,'Cornélio Procópio',-23.1811000,-50.6467000,1);
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_envios`
--

DROP TABLE IF EXISTS `historico_envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historico_envios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prefeitura_id` int(11) NOT NULL,
  `tipo` enum('coleta','pev','campanha','comunicado') NOT NULL,
  `descricao` text NOT NULL,
  `status` enum('pendente','aprovado','rejeitado') NOT NULL DEFAULT 'pendente',
  `observacao_admin` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_prefeitura_id` (`prefeitura_id`),
  KEY `idx_status` (`status`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_envios`
--

LOCK TABLES `historico_envios` WRITE;
/*!40000 ALTER TABLE `historico_envios` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico_envios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prefeituras`
--

DROP TABLE IF EXISTS `prefeituras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prefeituras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cidade_id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `oficio_path` varchar(255) DEFAULT NULL,
  `status` enum('pendente','ativo','inativo') NOT NULL DEFAULT 'pendente',
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cnpj` (`cnpj`),
  UNIQUE KEY `uk_email` (`email`),
  KEY `idx_cidade_id` (`cidade_id`),
  KEY `idx_status_ativo` (`status`,`ativo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prefeituras`
--

LOCK TABLES `prefeituras` WRITE;
/*!40000 ALTER TABLE `prefeituras` DISABLE KEYS */;
/*!40000 ALTER TABLE `prefeituras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_prefeitura`
--

DROP TABLE IF EXISTS `usuarios_prefeitura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios_prefeitura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prefeitura_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `ultimo_login` datetime DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_usuario_email` (`email`),
  KEY `idx_prefeitura_id` (`prefeitura_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_prefeitura`
--

LOCK TABLES `usuarios_prefeitura` WRITE;
/*!40000 ALTER TABLE `usuarios_prefeitura` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_prefeitura` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-09 22:56:53

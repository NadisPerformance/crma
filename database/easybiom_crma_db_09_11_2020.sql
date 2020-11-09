-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 09, 2020 at 10:38 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easybiom_crma_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `after_rental`
--

DROP TABLE IF EXISTS `after_rental`;
CREATE TABLE IF NOT EXISTS `after_rental` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rentalId` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `niveau_carburant` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `comment` text NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `after_rental`
--

INSERT INTO `after_rental` (`id`, `rentalId`, `albumId`, `kilometrage`, `niveau_carburant`, `createdAt`, `updatedAt`, `comment`, `deleted`) VALUES
(1, 1, 1, 10030, 222, '2020-10-12 13:33:26', '2020-10-14 08:00:00', 'aklejalzejm', 0);

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `title`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'Car before', '2020-10-15 10:00:00', '2020-10-15 09:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `before_rental`
--

DROP TABLE IF EXISTS `before_rental`;
CREATE TABLE IF NOT EXISTS `before_rental` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rentalId` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `niveau_carburant` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `comment` text NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `before_rental`
--

INSERT INTO `before_rental` (`id`, `rentalId`, `albumId`, `kilometrage`, `niveau_carburant`, `createdAt`, `updatedAt`, `comment`, `deleted`) VALUES
(1, 1, 1, 3093090, 222, '2020-10-12 13:27:59', '2020-10-15 08:00:00', 'azlkejazlkejklm', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE IF NOT EXISTS `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rentalId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `bill_number` varchar(30) NOT NULL,
  `bill_date` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bill_rows`
--

DROP TABLE IF EXISTS `bill_rows`;
CREATE TABLE IF NOT EXISTS `bill_rows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `billId` int(11) NOT NULL,
  `libelle` varchar(100) NOT NULL,
  `price_ht` int(11) NOT NULL,
  `price_ttc` int(11) NOT NULL,
  `day_nbr` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `montant_avance` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `comment` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `carId`, `customerId`, `montant_avance`, `date_begin`, `date_end`, `comment`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 1, 200, '2020-10-15', '2020-10-19', '', '2020-10-15 09:00:00', '2020-10-16 12:25:59', 0),
(2, 1, 2, 0, '2020-10-22', '2020-10-30', '', '2020-10-14 09:00:00', '2020-10-14 09:00:00', 0),
(3, 1, 1, 0, '2020-09-28', '2020-09-30', 'EEEEEEEEEEEEEEEEEEEEEEEEEEEE', '2020-10-16 11:15:33', '2020-10-28 14:40:55', 0);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `deleted`) VALUES
(1, 'MERCEDES', 0),
(2, 'AUDI', 0),
(3, 'FORD', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE IF NOT EXISTS `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plate_number` varchar(15) NOT NULL,
  `picture` varchar(100) NOT NULL,
  `brandId` int(11) NOT NULL,
  `model` varchar(30) NOT NULL,
  `model_date` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `colorId` int(11) NOT NULL,
  `chassis_number` varchar(30) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `statusId` int(11) NOT NULL,
  `scanned_grey_card` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `plate_number`, `picture`, `brandId`, `model`, `model_date`, `categoryId`, `price`, `colorId`, `chassis_number`, `availability`, `statusId`, `scanned_grey_card`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'FB883930', '9oFzi3Ldw-CROPPED-DSC_0008.JPG', 1, 'benz', 2005, 1, 100, 3, 'VF45664', 0, 3, NULL, '2020-10-14 08:00:00', '2020-11-05 13:30:34', 0),
(2, 'HG383893', 'xtGHvH0Fs-CROPPED-DSC_0008.JPG', 1, 'A3', 2013, 1, 350, 2, 'NY45664', 0, 2, NULL, '2020-10-15 13:00:00', '2020-11-04 11:31:01', 0),
(3, 'JH399303', '', 1, 'corolla', 2010, 1, 384, 0, 'AZ45664', 0, 1, NULL, '2020-10-16 11:00:00', '2020-10-22 09:22:45', 0);

-- --------------------------------------------------------

--
-- Table structure for table `car_insurances`
--

DROP TABLE IF EXISTS `car_insurances`;
CREATE TABLE IF NOT EXISTS `car_insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `insuranceId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `scanned_car_insurance` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `car_insurances`
--

INSERT INTO `car_insurances` (`id`, `carId`, `insuranceId`, `date_begin`, `date_end`, `scanned_car_insurance`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 2, '2020-09-03', '2020-10-16', 'www.google.com', '2020-10-15 05:00:00', '2020-10-22 16:52:20', 0),
(2, 2, 2, '2020-10-15', '2020-10-15', NULL, '2020-10-15 05:00:00', '2020-10-15 10:27:00', 0),
(3, 1, 1, '2020-09-03', '2020-10-16', NULL, '2020-10-15 05:00:00', '2020-10-22 16:52:20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `deleted`) VALUES
(1, 'Voiture Touristique', 0),
(2, 'Sport', 0),
(3, 'SUV', 0),
(4, 'Pick-up', 0);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `deleted`) VALUES
(1, 'blue', 0),
(2, 'Rouge', 0),
(3, 'Noire', 0),
(4, 'Blanche', 0),
(5, 'baige', 1),
(6, 'violet', 0);

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
CREATE TABLE IF NOT EXISTS `contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rentalId` int(11) NOT NULL,
  `contract_typeId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contracts_type`
--

DROP TABLE IF EXISTS `contracts_type`;
CREATE TABLE IF NOT EXISTS `contracts_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(30) NOT NULL,
  `cni` varchar(30) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `driver_license` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `scanned_driver_license` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_second_driver` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `birthday`, `gender`, `cni`, `type`, `driver_license`, `city`, `address`, `phone`, `email`, `company_name`, `scanned_driver_license`, `createdAt`, `updatedAt`, `deleted`, `is_second_driver`) VALUES
(1, 'zakaria', 'azdad', '1991-10-01', 'Mr', 'F33256', 1, 'erhehrzzzzzzzzzz', 'oujda', '81 rue EL-Amil quartier Takado', '0698765432', 'zaka@gmail.com', 'MABROKA MEDIA', NULL, '2020-10-15 00:00:00', '2020-10-15 09:14:19', 0, 0),
(2, 'hamza', 'belkhadir', '1986-10-01', 'Mme', 'FB123456', 1, 'X234R432', 'berkane', 'e', '0612345678', 'hamza@gmail.com', 'nadisperformance', NULL, '2020-10-14 09:00:00', '2020-10-16 10:00:49', 0, 0),
(3, 'Mohamed', 'ZBAIRI', '2020-10-16', 'Mme', '433FEG', 1, 'VRETHR6J54T', 'Taourirt', 'Z53HY', '234565432123456', 'AZER@zbdngf', 'mediatech', NULL, '2020-10-16 10:48:26', '2020-10-16 11:48:26', 0, 0),
(4, 'Ayoub', 'MAAMAR', '2020-10-16', 'M.', 'GT56543', 0, 'lbtennhein', 'Taourirt', 'oeigjoerijg', '2222222222222222', 'oiergj@irgueu', '', NULL, '2020-10-16 10:59:12', '2020-10-16 11:59:12', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `albumId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `albumId`, `path`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 'alzemazkmelm.jpg', '2020-10-15 10:00:00', '2020-10-15 08:00:00', 0),
(7, 1, 'public//uploads/images/iiR7Mp_ZB-CROPPED-DSC_0008.JPG', '2020-10-15 13:40:02', '2020-10-15 13:40:02', 0),
(8, 1, 'RzBVGtwvg-CROPPED-DSC_0008.JPG', '2020-10-15 13:43:21', '2020-10-15 13:43:21', 0);

-- --------------------------------------------------------

--
-- Table structure for table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
CREATE TABLE IF NOT EXISTS `insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `insurances`
--

INSERT INTO `insurances` (`id`, `name`, `deleted`) VALUES
(1, 'Sanad assurance', 0),
(2, 'Allianzz', 0),
(3, 'Wafa assurance', 1),
(4, 'Q55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
CREATE TABLE IF NOT EXISTS `rentals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookingId` int(11) DEFAULT NULL,
  `carId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `second_driverId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `comment` text,
  `scanned_contract` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rentals`
--

INSERT INTO `rentals` (`id`, `bookingId`, `carId`, `customerId`, `second_driverId`, `date_begin`, `date_end`, `comment`, `scanned_contract`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 1, 1, 1, '2020-10-13', '2020-10-08', NULL, NULL, '2020-10-15 08:00:00', '2020-10-21 04:00:00', 0),
(2, NULL, 3, 1, 1, '2020-10-15', '2020-10-18', NULL, NULL, '2020-10-16 09:01:23', '2020-10-16 10:01:23', 0),
(3, NULL, 3, 1, 1, '2020-10-24', '2020-10-25', NULL, NULL, '2020-10-16 09:09:05', '2020-10-16 10:09:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `title`, `deleted`) VALUES
(1, 'Administrateur', 0),
(2, 'Assistant(e) de location', 0);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(35) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `title`, `deleted`) VALUES
(1, 'En vente', 0),
(2, 'En réparation', 0),
(3, 'A louer', 0);

-- --------------------------------------------------------

--
-- Table structure for table `technical_controls`
--

DROP TABLE IF EXISTS `technical_controls`;
CREATE TABLE IF NOT EXISTS `technical_controls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `scanned_technical_control` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `technical_controls`
--

INSERT INTO `technical_controls` (`id`, `carId`, `date_begin`, `date_end`, `scanned_technical_control`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, '2020-10-01', '2020-10-24', NULL, '2020-10-14 14:41:56', '2020-10-22 10:19:52', 0),
(2, 3, '2020-10-01', '2020-10-31', NULL, '2020-10-14 14:41:56', '2020-10-21 16:27:45', 0),
(3, 3, '2020-10-01', '2020-10-31', NULL, '2020-10-14 14:41:56', '2020-10-21 11:06:01', 0),
(23, 1, '2020-09-29', '2020-10-29', NULL, '2020-10-21 20:30:32', '2020-10-21 21:30:32', 0),
(22, 2, '2020-09-29', '2020-10-31', NULL, '2020-10-21 18:08:55', '2020-10-21 19:13:09', 0),
(24, 1, '2020-09-28', '2020-10-29', 'BubpZHnGB-f.JPG', '2020-10-27 14:22:24', '2020-10-27 15:22:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `cni` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `roleId` int(11) NOT NULL,
  `password` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `cni`, `address`, `email`, `phone`, `roleId`, `password`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'Mohammed', 'ZBAIBI', 'Mr', 'FB120142', '07 LOT El Massira TAOURIRT', 'm.zbairi@gmail.fr', '0612345678', 2, '$2a$10$SCZNaUqeAi5VbvCJyo1IVu9aviVHYQwiACvwzC7tqx//v5gOKZ04.', '2020-10-15 00:00:00', '2020-10-14 06:00:00', 0),
(2, 'Ayoub', 'MAAMAR', 'Mr', 'HG292002', '', 'a.maamar@gmail.fr', '0698765432', 1, '$2a$10$U9qI770QiqkhWbLpukb2KeId4oJBEkUqXxwlwWpVRYvhpnCUZL0ni', '2020-10-14 06:00:00', '2020-10-14 05:00:00', 1),
(3, 'zaia', 'belkhadir', 'Mr', 'FB123456', 'LOT massira', 'zaka@gmail.com', '0612345678', 2, '$2a$10$83Z/9/bP3yR0h4vwYq/RC.zkuv28VousQy36xS/CKeNnvuRWF5ak2', '2020-10-14 08:00:00', '2020-10-14 07:00:00', 0),
(4, 'mkee', 'belabed', 'M', 'klkkjlkjl', 'kljklkl', 'elkjkl', 'zekljklrljk', 1, '$2a$10$BQ0ic9KyITArvaWvC5hI3OXKO/y3pwyd3cyxyODfY2Dckm1upMbpy', '2020-10-14 06:00:00', '2020-10-14 07:00:00', 1),
(5, 'Ayoub', 'MAAMAR', 'M', 'FB99999', 'N87 lot ennakhil', 'ayoub.maamar@crma.com', '0661651482', 1, '$2a$10$b.CWt49BQ4FLQn84sXFYVemsWOqLJVDSd180gZ9DoIN6CCeROUxpy', '2020-10-14 10:00:00', '2020-10-14 07:00:00', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 21 oct. 2020 à 21:12
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `easybiom_crma_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `after_rental`
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
-- Déchargement des données de la table `after_rental`
--

INSERT INTO `after_rental` (`id`, `rentalId`, `albumId`, `kilometrage`, `niveau_carburant`, `createdAt`, `updatedAt`, `comment`, `deleted`) VALUES
(1, 1, 1, 10030, 222, '2020-10-12 13:33:26', '2020-10-14 08:00:00', 'aklejalzejm', 0);

-- --------------------------------------------------------

--
-- Structure de la table `albums`
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
-- Déchargement des données de la table `albums`
--

INSERT INTO `albums` (`id`, `title`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'Car before', '2020-10-15 10:00:00', '2020-10-15 09:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `before_rental`
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
-- Déchargement des données de la table `before_rental`
--

INSERT INTO `before_rental` (`id`, `rentalId`, `albumId`, `kilometrage`, `niveau_carburant`, `createdAt`, `updatedAt`, `comment`, `deleted`) VALUES
(1, 1, 1, 3093090, 222, '2020-10-12 13:27:59', '2020-10-15 08:00:00', 'azlkejazlkejklm', 0);

-- --------------------------------------------------------

--
-- Structure de la table `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE IF NOT EXISTS `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_number` varchar(30) NOT NULL,
  `bill_date` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
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
-- Déchargement des données de la table `bookings`
--

INSERT INTO `bookings` (`id`, `carId`, `customerId`, `montant_avance`, `date_begin`, `date_end`, `comment`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 1, 200, '2020-10-15', '2020-10-19', '', '2020-10-15 09:00:00', '2020-10-16 12:25:59', 1),
(2, 1, 2, 0, '2020-10-22', '2020-10-30', '', '2020-10-14 09:00:00', '2020-10-14 09:00:00', 0),
(3, 1, 3, 2222, '2020-09-28', '2020-09-30', 'EEEEEEEEEEEEEEEEEEEEEEEEEEEE', '2020-10-16 11:15:33', '2020-10-16 12:15:33', 0);

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`, `deleted`) VALUES
(1, 'MERCEDES', 0),
(2, 'AUDI', 0);

-- --------------------------------------------------------

--
-- Structure de la table `cars`
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
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`id`, `plate_number`, `picture`, `brandId`, `model`, `model_date`, `categoryId`, `price`, `colorId`, `chassis_number`, `availability`, `statusId`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'FB883930', '9oFzi3Ldw-CROPPED-DSC_0008.JPG', 1, 'benz', 2000, 1, 100, 1, 'VF45664', 0, 3, '2020-10-14 08:00:00', '2020-10-21 16:21:15', 0),
(2, 'HG383893', 'xtGHvH0Fs-CROPPED-DSC_0008.JPG', 1, 'A3', 2013, 1, 350, 2, 'NY45664', 0, 2, '2020-10-15 13:00:00', '2020-10-21 19:16:27', 0),
(3, 'JH399303', '', 1, 'corolla', 2010, 1, 384, 0, 'AZ45664', 0, 1, '2020-10-16 11:00:00', '2020-10-22 08:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `car_insurances`
--

DROP TABLE IF EXISTS `car_insurances`;
CREATE TABLE IF NOT EXISTS `car_insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `insuranceId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `car_insurances`
--

INSERT INTO `car_insurances` (`id`, `carId`, `insuranceId`, `date_begin`, `date_end`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 1, '2020-10-15', '2020-10-15', '2020-10-15 05:00:00', '2020-10-15 10:27:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `title`, `deleted`) VALUES
(1, 'Voiture touristique', 0);

-- --------------------------------------------------------

--
-- Structure de la table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `colors`
--

INSERT INTO `colors` (`id`, `name`, `deleted`) VALUES
(1, 'Bleu', 0),
(2, 'Rouge', 0),
(3, 'Noire', 0),
(4, 'Blanche', 0);

-- --------------------------------------------------------

--
-- Structure de la table `contracts`
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
-- Structure de la table `contracts_type`
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
-- Structure de la table `customers`
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
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_second_driver` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `birthday`, `gender`, `cni`, `type`, `driver_license`, `city`, `address`, `phone`, `email`, `company_name`, `createdAt`, `updatedAt`, `deleted`, `is_second_driver`) VALUES
(1, 'zakia', 'momox', '1991-10-01', 'Mr', 'F33256', 1, 'erhehrzzzzzzzzzz', 'oujda', '81 rue EL-Amil quartier Takado', '0698765432', 'zaka@gmail.com', 'MABROKA MEDIA', '2020-10-15 00:00:00', '2020-10-15 09:14:19', 0, 0),
(2, 'hamza', 'belkhadir', '1986-10-01', 'Mme', 'FB123456', 1, 'X234R432', 'berkane', 'e', '0612345678', 'hamza@gmail.com', 'nadisperformance', '2020-10-14 09:00:00', '2020-10-16 10:00:49', 1, 0),
(3, 'mohamed', 'mohamedi', '2020-10-16', 'Mme', '433FEG', 1, 'VRETHR6J54T', 'Taourirt', 'Z53HY', '234565432123456', 'AZER@zbdngf', 'mediatech', '2020-10-16 10:48:26', '2020-10-16 11:48:26', 0, 0),
(4, 'tenoitne', 'lthtpij', '2020-10-16', 'M.', 'oiehnohien', 0, 'lbtennhein', 'oiethoir', 'oeigjoerijg', '2222222222222222', 'oiergj@irgueu', '', '2020-10-16 10:59:12', '2020-10-16 11:59:12', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `images`
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
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `albumId`, `path`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 'alzemazkmelm.jpg', '2020-10-15 10:00:00', '2020-10-15 08:00:00', 0),
(7, 1, 'public//uploads/images/iiR7Mp_ZB-CROPPED-DSC_0008.JPG', '2020-10-15 13:40:02', '2020-10-15 13:40:02', 0),
(8, 1, 'RzBVGtwvg-CROPPED-DSC_0008.JPG', '2020-10-15 13:43:21', '2020-10-15 13:43:21', 0);

-- --------------------------------------------------------

--
-- Structure de la table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
CREATE TABLE IF NOT EXISTS `insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `insurances`
--

INSERT INTO `insurances` (`id`, `name`, `deleted`) VALUES
(1, 'Sanad assurance', 0),
(2, 'Allianzz', 0),
(3, 'Wafa assurance', 1);

-- --------------------------------------------------------

--
-- Structure de la table `rentals`
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
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `rentals`
--

INSERT INTO `rentals` (`id`, `bookingId`, `carId`, `customerId`, `second_driverId`, `date_begin`, `date_end`, `comment`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, 1, 1, 1, '2020-10-13', '2020-10-08', NULL, '2020-10-15 08:00:00', '2020-10-21 04:00:00', 0),
(2, NULL, 3, 1, 1, '2020-10-15', '2020-10-18', NULL, '2020-10-16 09:01:23', '2020-10-16 10:01:23', 0),
(3, NULL, 3, 1, 1, '2020-10-24', '2020-10-25', NULL, '2020-10-16 09:09:05', '2020-10-16 10:09:35', 0);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `title`, `deleted`) VALUES
(1, 'Administrateur', 0),
(2, 'Assistant(e) de location', 0);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(35) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `title`, `deleted`) VALUES
(1, 'En vente', 0),
(2, 'En réparation', 0),
(3, 'A louer', 0);

-- --------------------------------------------------------

--
-- Structure de la table `technical_controls`
--

DROP TABLE IF EXISTS `technical_controls`;
CREATE TABLE IF NOT EXISTS `technical_controls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `technical_controls`
--

INSERT INTO `technical_controls` (`id`, `carId`, `date_begin`, `date_end`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 1, '2020-10-15', '2020-10-24', '2020-10-14 14:41:56', '2020-10-21 16:24:10', 0),
(2, 3, '2020-10-01', '2020-10-31', '2020-10-14 14:41:56', '2020-10-21 16:27:45', 0),
(3, 3, '2020-10-01', '2020-10-31', '2020-10-14 14:41:56', '2020-10-21 11:06:01', 0),
(22, 2, '2020-09-29', '2020-10-31', '2020-10-21 18:08:55', '2020-10-21 19:13:09', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
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
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `cni`, `address`, `email`, `phone`, `roleId`, `password`, `createdAt`, `updatedAt`, `deleted`) VALUES
(1, 'Mohammed', 'ZBAIBI', 'Mr', 'FB120142', '07 LOT El Massira TAOURIRT', 'm.zbairi@gmail.fr', '0612345678', 2, '$2a$10$SCZNaUqeAi5VbvCJyo1IVu9aviVHYQwiACvwzC7tqx//v5gOKZ04.', '2020-10-15 00:00:00', '2020-10-14 06:00:00', 0),
(2, 'Ayoub', 'MAAMAR', 'Mr', 'HG292002', '', 'a.maamar@gmail.fr', '0698765432', 1, '$2a$10$U9qI770QiqkhWbLpukb2KeId4oJBEkUqXxwlwWpVRYvhpnCUZL0ni', '2020-10-14 06:00:00', '2020-10-14 05:00:00', 1),
(3, 'zaia', 'belkhadir', 'Mr', 'FB123456', 'LOT massira', 'zaka@gmail.com', '0612345678', 2, '$2a$10$83Z/9/bP3yR0h4vwYq/RC.zkuv28VousQy36xS/CKeNnvuRWF5ak2', '2020-10-14 08:00:00', '2020-10-14 07:00:00', 0),
(4, 'mkee', 'belabed', 'kl', 'klkkjlkjl', 'kljklkl', 'elkjkl', 'zekljklrljk', 1, '$2a$10$BQ0ic9KyITArvaWvC5hI3OXKO/y3pwyd3cyxyODfY2Dckm1upMbpy', '2020-10-14 06:00:00', '2020-10-14 07:00:00', 1),
(5, 'Ayoub', 'MAAMAR', 'M', 'FB99999', 'N87 lot ennakhil', 'ayoub.maamar@crma.com', '0661651482', 1, '$2a$10$b.CWt49BQ4FLQn84sXFYVemsWOqLJVDSd180gZ9DoIN6CCeROUxpy', '2020-10-14 10:00:00', '2020-10-14 07:00:00', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

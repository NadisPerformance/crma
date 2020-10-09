-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 09 oct. 2020 à 16:37
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
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE IF NOT EXISTS `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_number` varchar(30) NOT NULL,
  `bill_date` datetime NOT NULL,
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
  `hour_begin` time NOT NULL,
  `hour_end` time NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bookings`
--

INSERT INTO `bookings` (`id`, `carId`, `customerId`, `montant_avance`, `date_begin`, `date_end`, `hour_begin`, `hour_end`, `comment`) VALUES
(1, 2, 1, 0, '2020-10-09', '2020-10-12', '11:07:23', '11:07:23', ''),
(2, 1, 2, 0, '2020-10-22', '2020-10-30', '13:27:23', '13:27:23', '');

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Mercedes'),
(2, 'BMW');

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE IF NOT EXISTS `cars` (
  `id` int(11) NOT NULL,
  `plate_number` varchar(15) NOT NULL,
  `brandId` int(11) NOT NULL,
  `model` varchar(30) NOT NULL,
  `model_date` date NOT NULL DEFAULT '2000-01-01',
  `categoryId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `colorId` int(11) NOT NULL,
  `chassis_number` varchar(30) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `statusId` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`id`, `plate_number`, `brandId`, `model`, `model_date`, `categoryId`, `price`, `colorId`, `chassis_number`, `availability`, `statusId`, `deleted`) VALUES
(1, 'FB883930', 1, '', '2000-01-01', 0, 100, 0, '', 0, 0, 0),
(2, 'HG383893', 2, '', '2000-01-01', 0, 350, 0, '', 0, 0, 0),
(3, 'JH399303', 0, '', '2000-01-01', 0, 384, 0, '', 0, 0, 0);

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `birthday`, `gender`, `cni`, `type`, `driver_license`, `city`, `address`, `phone`, `email`, `company_name`) VALUES
(1, 'zakia', 'momo', '1991-10-01', 'Mr', 'F33256', 1, 'erhehr', 'oujda', 'ddddddddd', '0698765432', 'zaka@gmail.com', ''),
(2, 'hamza', 'belkhadir', '1991-10-01', 'Mr', 'FB123456', 1, 'X234R432', 'berkan', 'eeeeeeeee', '0612345678', 'hamza@gmail.com', 'nadisperformance');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `albumId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `insurances`
--

DROP TABLE IF EXISTS `insurances`;
CREATE TABLE IF NOT EXISTS `insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `rentals`
--

DROP TABLE IF EXISTS `rentals`;
CREATE TABLE IF NOT EXISTS `rentals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookingId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `second_driverId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `hour_begin` time NOT NULL,
  `hour_end` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `title`) VALUES
(1, 'Administrateur'),
(2, 'Assistant(e) de location');

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `cni`, `address`, `email`, `phone`, `roleId`, `password`) VALUES
(1, 'Mohammed', 'ZBAIRI', 'Mr', 'FB120142', '07 LOT El Massira TAOURIRT', 'm.zbairi@gmail.fr', '0612345678', 2, '1234'),
(2, 'Ayoub', 'MAAMAR', 'Mr', '', '', 'a.maamar@gmail.fr', '0698765432', 1, 'abcde'),
(3, 'zaia', 'belkhadir', 'Mr', 'FB123456', 'LOT massira', 'zaka@gmail.com', '0612345678', 1, '$2a$10$V.3ssOulMx/798PwTdoxoueVXUeTL5a50Cdjw58OyLf3Nf.CHveou');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

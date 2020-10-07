-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 07 oct. 2020 à 14:10
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
(1, 'FB883930', 0, '', '2000-01-01', 0, 0, 0, '', 0, 0, 0),
(2, 'HG383893', 0, '', '2000-01-01', 0, 0, 0, '', 0, 0, 0),
(3, 'JH399303', 0, '', '2000-01-01', 0, 0, 0, '', 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `title`) VALUES
(1, 'Administrateur');

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
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `cni`, `address`, `email`, `phone`, `roleId`, `password`) VALUES
(1, 'Mohammed', 'ZBAIRI', 'Mr', 'FB120142', '07 LOT El Massira TAOURIRT', 'm.zbairi@gmail.fr', '0612345678', 0, '1234'),
(2, 'Ayoub', 'MAAMAR', 'Mr', '', '', 'a.maamar@gmail.fr', '0698765432', 0, 'abcde');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

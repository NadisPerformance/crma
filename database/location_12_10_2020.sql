-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  lun. 12 oct. 2020 à 13:16
-- Version du serveur :  5.5.65-MariaDB
-- Version de PHP :  7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `location`
--

-- --------------------------------------------------------

--
-- Structure de la table `after_rental`
--

CREATE TABLE `after_rental` (
  `id` int(11) NOT NULL,
  `rentalId` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `niveau_carburant` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `albums`
--

INSERT INTO `albums` (`id`, `title`, `deleted`) VALUES
(1, 'Car before', 0);

-- --------------------------------------------------------

--
-- Structure de la table `before_rental`
--

CREATE TABLE `before_rental` (
  `id` int(11) NOT NULL,
  `rentalId` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `niveau_carburant` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` text NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `bill_number` varchar(30) NOT NULL,
  `bill_date` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `montant_avance` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `hour_begin` time NOT NULL,
  `hour_end` time NOT NULL,
  `comment` text NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bookings`
--

INSERT INTO `bookings` (`id`, `carId`, `customerId`, `montant_avance`, `date_begin`, `date_end`, `hour_begin`, `hour_end`, `comment`, `deleted`) VALUES
(1, 2, 1, 0, '2020-10-09', '2020-10-12', '11:07:23', '11:07:23', '', 0),
(2, 1, 2, 0, '2020-10-22', '2020-10-30', '13:27:23', '13:27:23', '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`, `deleted`) VALUES
(1, 'MERCEDESS', 0),
(2, 'AUDI', 0);

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `plate_number` varchar(15) NOT NULL,
  `brandId` int(11) NOT NULL,
  `model` varchar(30) NOT NULL,
  `model_date` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `colorId` int(11) NOT NULL,
  `chassis_number` varchar(30) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `statusId` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`id`, `plate_number`, `brandId`, `model`, `model_date`, `categoryId`, `price`, `colorId`, `chassis_number`, `availability`, `statusId`, `deleted`) VALUES
(1, 'FB883930', 1, 'benz', 2000, 1, 100, 1, 'VF45664', 0, 1, 0),
(2, 'HG383893', 2, 'A3', 2013, 1, 350, 1, 'NY45664', 0, 1, 0),
(3, 'JH399303', 1, 'corolla', 2010, 1, 384, 0, 'AZ45664', 0, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `car_insurances`
--

CREATE TABLE `car_insurances` (
  `id` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `insuranceId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `title`, `deleted`) VALUES
(1, 'Voiture touristique', 0);

-- --------------------------------------------------------

--
-- Structure de la table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `colors`
--

INSERT INTO `colors` (`id`, `name`, `deleted`) VALUES
(1, 'Bleue', 0),
(2, 'Rouge', 0),
(3, 'Noire', 0),
(4, 'Blanche', 0);

-- --------------------------------------------------------

--
-- Structure de la table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `rentalId` int(11) NOT NULL,
  `contract_typeId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `contracts_type`
--

CREATE TABLE `contracts_type` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
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
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `birthday`, `gender`, `cni`, `type`, `driver_license`, `city`, `address`, `phone`, `email`, `company_name`, `deleted`) VALUES
(1, 'zakia', 'momox', '1991-10-01', 'Mr', 'F33256', 1, 'erhehrzzzzzzzzzz', 'oujda', 'ddddddddd', '0698765432', 'zaka@gmail.com', '', 0),
(2, 'hamza', 'belkhadir', '1991-10-01', 'Mr', 'FB123456', 1, 'X234R432', 'berkan', 'eeeeeeeee', '0612345678', 'hamza@gmail.com', 'nadisperformance', 0);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `albumId`, `path`, `deleted`) VALUES
(1, 1, 'alzemazkmelm.jpg', 0),
(2, 1, 'path', 0),
(3, 1, '../../public/uploads/images/ESQ2yhkK8-13450168_10209591996533576_5153653816537082298_n.jpg', 0),
(4, 1, '../public/uploads/images/zbMzs1U-e-13450168_10209591996533576_5153653816537082298_n.jpg', 0),
(5, 1, 'public/uploads/images/UHCMUbhVP-13450168_10209591996533576_5153653816537082298_n.jpg', 0),
(6, 1, 'public//uploads/images/9bLi-aD1_-13450168_10209591996533576_5153653816537082298_n.jpg', 0);

-- --------------------------------------------------------

--
-- Structure de la table `insurances`
--

CREATE TABLE `insurances` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `second_driverId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `hour_begin` time NOT NULL,
  `hour_end` time NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `title` varchar(35) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE `technical_controls` (
  `id` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `date_begin` date NOT NULL,
  `date_end` date NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `cni` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `roleId` int(11) NOT NULL,
  `password` varchar(80) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `cni`, `address`, `email`, `phone`, `roleId`, `password`, `deleted`) VALUES
(1, 'Mohammed', 'ZBAIBI', 'Mr', 'FB120142', '07 LOT El Massira TAOURIRT', 'm.zbairi@gmail.fr', '0612345678', 2, '$2a$10$SCZNaUqeAi5VbvCJyo1IVu9aviVHYQwiACvwzC7tqx//v5gOKZ04.', 0),
(2, 'Ayoub', 'MAAMAR', 'Mr', 'HG292002', '', 'a.maamar@gmail.fr', '0698765432', 1, '$2a$10$U9qI770QiqkhWbLpukb2KeId4oJBEkUqXxwlwWpVRYvhpnCUZL0ni', 1),
(3, 'zaia', 'belkhadir', 'Mr', 'FB123456', 'LOT massira', 'zaka@gmail.com', '0612345678', 2, '$2a$10$83Z/9/bP3yR0h4vwYq/RC.zkuv28VousQy36xS/CKeNnvuRWF5ak2', 0),
(4, 'mkee', 'belabed', 'kl', 'klkkjlkjl', 'kljklkl', 'elkjkl', 'zekljklrljk', 1, '$2a$10$BQ0ic9KyITArvaWvC5hI3OXKO/y3pwyd3cyxyODfY2Dckm1upMbpy', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `after_rental`
--
ALTER TABLE `after_rental`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `before_rental`
--
ALTER TABLE `before_rental`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `car_insurances`
--
ALTER TABLE `car_insurances`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contracts_type`
--
ALTER TABLE `contracts_type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `insurances`
--
ALTER TABLE `insurances`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `technical_controls`
--
ALTER TABLE `technical_controls`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `after_rental`
--
ALTER TABLE `after_rental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `before_rental`
--
ALTER TABLE `before_rental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `car_insurances`
--
ALTER TABLE `car_insurances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contracts_type`
--
ALTER TABLE `contracts_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `insurances`
--
ALTER TABLE `insurances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `technical_controls`
--
ALTER TABLE `technical_controls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

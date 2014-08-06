-- phpMyAdmin SQL Dump
-- version 4.1.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2014 at 05:42 AM
-- Server version: 5.5.36-log
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hommedu1_route_planner_clients`
--

-- --------------------------------------------------------

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
CREATE TABLE IF NOT EXISTS `Clients` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FULL_NAME` varchar(255) DEFAULT NULL,
  `USER_NAME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `DB_CODE` varchar(6) NOT NULL,
  UNIQUE KEY `id` (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `Clients`
--

INSERT INTO `Clients` (`ID`, `FULL_NAME`, `USER_NAME`, `EMAIL`, `PASSWORD`, `DB_CODE`) VALUES
(1, 'han wei', 'hanwei', 'yong880702@gmail.com', '9ef8f353d6f90b3d84828f620988ea62', 'test'),
(6, 'Alain Chautard', 'alcfeoh', 'alain@interstate21.com', '2b62307fab1bf7e12feb55f4676753a3', 'test');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.1.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 31, 2014 at 05:40 AM
-- Server version: 5.5.36-log
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hommedu1_rpt_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `Config`
--

DROP TABLE IF EXISTS `Config`;
CREATE TABLE IF NOT EXISTS `Config` (
  `ID` int(11) NOT NULL,
  `CUSTOM_FIELDS` varchar(1000) NOT NULL,
  `COMPANY_NAME` varchar(50) NOT NULL,
  `DEFAULT_START_LOC` varchar(200) NOT NULL,
  `DEFAULT_START_LOC_LAT` decimal(20,10) NOT NULL,
  `DEFAULT_START_LOC_LNG` decimal(20,10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Config`
--

INSERT INTO `Config` (`ID`, `CUSTOM_FIELDS`, `COMPANY_NAME`, `DEFAULT_START_LOC`, `DEFAULT_START_LOC_LAT`, `DEFAULT_START_LOC_LNG`) VALUES
(1, '[{"name":"Notes", "type":"textarea"}, {"name":"Amount to collect","type" :"input"} ]', 'Interstate 21, LLC', 'Valley Park Hotel, San Jose, CA', '37.3232880000', '-121.9367320000');

-- --------------------------------------------------------

--
-- Table structure for table `Drivers`
--

DROP TABLE IF EXISTS `Drivers`;
CREATE TABLE IF NOT EXISTS `Drivers` (
  `ID` int(11) NOT NULL,
  `STATUS` varchar(20) NOT NULL,
  `NAME` varchar(40) NOT NULL,
  `LOCATION_HISTORY` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Drivers`
--

INSERT INTO `Drivers` (`ID`, `STATUS`, `NAME`, `LOCATION_HISTORY`) VALUES
(1011, 'ON_DUTY', 'Joe Allen', NULL),
(1012, 'PAUSE', 'Jane Doe', NULL),
(1013, 'ON_DUTY', 'Lisa Ellis', NULL),
(1014, 'ON_DUTY', 'James Blue', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Driver_Stats`
--

DROP TABLE IF EXISTS `Driver_Stats`;
CREATE TABLE IF NOT EXISTS `Driver_Stats` (
  `DRIVER_ID` int(11) NOT NULL,
  `MILES_DRIVEN` int(11) NOT NULL,
  `JOBS_COMPLETED` int(11) NOT NULL,
  PRIMARY KEY (`DRIVER_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Jobs`
--

DROP TABLE IF EXISTS `Jobs`;
CREATE TABLE IF NOT EXISTS `Jobs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(20) NOT NULL DEFAULT 'CREATED',
  `LAT` decimal(20,10) NOT NULL,
  `LNG` decimal(20,10) NOT NULL,
  `ADDRESS` varchar(200) NOT NULL,
  `FIELDS` text,
  `DRIVER_NOTES` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `Jobs`
--

INSERT INTO `Jobs` (`ID`, `STATUS`, `LAT`, `LNG`, `ADDRESS`, `FIELDS`, `DRIVER_NOTES`) VALUES
(1, 'CREATED', '37.3951637000', '-122.0387498000', '955 Benecia Ave, Sunnyvale, CA 94085, USA', NULL, NULL),
(2, 'CREATED', '37.4418834000', '-122.1430195000', 'Palo Alto, CA, USA', NULL, NULL),
(3, 'CREATED', '37.5482697000', '-121.9885719000', 'Fremont, CA, USA', NULL, NULL),
(4, 'CREATED', '37.3393857000', '-121.8949555000', 'San Jose, CA, USA', NULL, NULL),
(5, 'CREATED', '37.7749295000', '-122.4194155000', 'San Francisco, CA, USA', NULL, NULL),
(6, 'CREATED', '37.8590937000', '-122.4852507000', 'Sausalito, CA, USA', NULL, NULL),
(7, 'CREATED', '38.5815719000', '-121.4943996000', 'Sacramento, CA, USA', NULL, NULL),
(8, 'CREATED', '33.8744673000', '-118.1861399000', 'dgfsdgffsa, Long Beach, CA 90805, USA', NULL, NULL),
(9, 'CREATED', '37.7396513000', '-121.4252227000', 'Tracy, CA, USA', NULL, NULL),
(10, 'CREATED', '37.3230729000', '-121.9909507000', 'Stevens Creek Blvd, San Jose, CA, USA', NULL, NULL),
(11, 'CREATED', '39.9340020000', '-74.8909988000', 'Mt Laurel, NJ, USA', NULL, NULL),
(12, 'CREATED', '38.9072309000', '-77.0364641000', 'Washington, DC, USA', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
CREATE TABLE IF NOT EXISTS `Notifications` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(10) NOT NULL,
  `DRIVER_ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(300) NOT NULL,
  `Drivers_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Notifications_Drivers` (`DRIVER_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Routes`
--

DROP TABLE IF EXISTS `Routes`;
CREATE TABLE IF NOT EXISTS `Routes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(20) NOT NULL DEFAULT 'CREATED',
  `JOBS` varchar(200) NOT NULL,
  `DRIVER` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Drivers_Routes` (`DRIVER`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Routes`
--

INSERT INTO `Routes` (`ID`, `STATUS`, `JOBS`, `DRIVER`) VALUES
(1, 'CREATED', '2,1,4,3', 1013),
(2, 'CREATED', '7,6,5', 1012),
(3, 'CREATED', '9,8,10', 1014),
(4, 'CREATED', '11,12', 1013);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

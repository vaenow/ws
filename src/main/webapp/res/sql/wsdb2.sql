-- --------------------------------------------------------
-- Host:                         192.168.0.100
-- Server version:               5.5.28-0ubuntu0.12.04.3 - (Ubuntu)
-- Server OS:                    debian-linux-gnu
-- HeidiSQL version:             7.0.0.4140
-- Date/time:                    2012-12-28 07:57:48
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for ws
CREATE DATABASE IF NOT EXISTS `ws` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ws`;


-- Dumping structure for view ws.getUserDetails
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `getUserDetails` (
	`UID` INT(10) UNSIGNED NOT NULL COMMENT 'user id ',
	`name` VARCHAR(50) NOT NULL COMMENT 'user name ' COLLATE 'utf8_general_ci',
	`passw` VARCHAR(50) NOT NULL COMMENT 'user password' COLLATE 'utf8_general_ci',
	`crtDttm` TIMESTAMP NOT NULL COMMENT 'user create date time ',
	`crtIp` VARCHAR(50) NOT NULL COMMENT 'user create ip address' COLLATE 'utf8_general_ci',
	`alias` VARCHAR(50) NULL COMMENT 'user alias' COLLATE 'utf8_general_ci',
	`mobile` VARCHAR(50) NULL COMMENT 'user mobile number' COLLATE 'utf8_general_ci',
	`email` VARCHAR(50) NULL COMMENT 'user email' COLLATE 'utf8_general_ci',
	`lastUpdtIp` VARCHAR(50) NULL COMMENT 'user last logon ip address' COLLATE 'utf8_general_ci',
	`lastUpdtDttm` TIMESTAMP NULL COMMENT 'user last logon date time',
	`headImg` VARCHAR(50) NULL COMMENT 'user head image src' COLLATE 'utf8_general_ci',
	`bgImg` VARCHAR(50) NULL COMMENT 'user background image src' COLLATE 'utf8_general_ci',
	`phrase` VARCHAR(50) NULL COMMENT 'user said somethings shortly' COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for table ws.msg_info
CREATE TABLE IF NOT EXISTS `msg_info` (
  `msg_id` int(10) unsigned NOT NULL,
  `msg_from` int(10) unsigned NOT NULL COMMENT 'the msg who send from',
  `msg_to` int(10) unsigned NOT NULL COMMENT 'the msg who send to',
  `msg_ty` char(50) NOT NULL COMMENT 'msg type:  1 -> text msg; 2 -> binary msg; 3 -> other',
  `msg_cnt` text COMMENT 'msg content',
  `msg_crt_dttm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `msg_crt_ip` varchar(50) DEFAULT '10.0.0.1',
  PRIMARY KEY (`msg_id`),
  KEY `FK_msg_info_u_info` (`msg_from`),
  CONSTRAINT `FK_msg_info_u_info` FOREIGN KEY (`msg_from`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='message infomations';

-- Dumping data for table ws.msg_info: ~0 rows (approximately)
/*!40000 ALTER TABLE `msg_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `msg_info` ENABLE KEYS */;


-- Dumping structure for table ws.u_details
CREATE TABLE IF NOT EXISTS `u_details` (
  `u_id` int(10) unsigned NOT NULL,
  `u_alias` varchar(50) DEFAULT NULL COMMENT 'user alias',
  `u_mobile` varchar(50) DEFAULT NULL COMMENT 'user mobile number',
  `u_email` varchar(50) DEFAULT NULL COMMENT 'user email',
  `u_updt_ip` varchar(50) DEFAULT '10.0.0.1' COMMENT 'user last logon ip address',
  `u_updt_dttm` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'user last logon date time',
  `u_img_head` varchar(50) DEFAULT NULL COMMENT 'user head image src',
  `u_img_bg` varchar(50) DEFAULT NULL COMMENT 'user background image src',
  `u_phrase` varchar(50) DEFAULT NULL COMMENT 'user said somethings shortly',
  PRIMARY KEY (`u_id`),
  CONSTRAINT `FK__u_info` FOREIGN KEY (`u_id`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user details';

-- Dumping data for table ws.u_details: ~4 rows (approximately)
/*!40000 ALTER TABLE `u_details` DISABLE KEYS */;
REPLACE INTO `u_details` (`u_id`, `u_alias`, `u_mobile`, `u_email`, `u_updt_ip`, `u_updt_dttm`, `u_img_head`, `u_img_bg`, `u_phrase`) VALUES
	(1, 'lw', '15208205268', 'vane@ws.com', '10.0.0.1', '2012-12-27 21:15:14', 'src-head-1', 'src-bg-2', '我来测试一丢丢。。'),
	(2, 'snow', '18782950985', 'snow@ws.com', '10.0.0.1', '2012-12-27 21:13:50', 'src-head', 'src-bg', '今天心情很好！'),
	(3, 'wc', '123466', NULL, '10.0.0.1', '2012-12-27 21:16:12', NULL, NULL, 'Im a sb.!'),
	(4, 'hl', '31313', 'qq.com', '10.0.0.1', '2012-12-27 21:16:41', NULL, NULL, 'haha~~');
/*!40000 ALTER TABLE `u_details` ENABLE KEYS */;


-- Dumping structure for table ws.u_friends
CREATE TABLE IF NOT EXISTS `u_friends` (
  `f_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'friends list index',
  `f_owner` int(10) unsigned NOT NULL COMMENT 'friends list owner',
  `f_friend` int(10) unsigned DEFAULT NULL COMMENT 'friends list:  0 stand for friends group',
  `f_crt_dttm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `f_crt_ip` varchar(50) DEFAULT '10.0.0.1',
  PRIMARY KEY (`f_id`),
  KEY `FK_u_friends_u_info` (`f_owner`),
  CONSTRAINT `FK_u_friends_u_info` FOREIGN KEY (`f_owner`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='user friends list';

-- Dumping data for table ws.u_friends: ~10 rows (approximately)
/*!40000 ALTER TABLE `u_friends` DISABLE KEYS */;
REPLACE INTO `u_friends` (`f_id`, `f_owner`, `f_friend`, `f_crt_dttm`, `f_crt_ip`) VALUES
	(1, 1, 2, '2012-12-27 21:11:32', '10.0.0.1'),
	(2, 1, 3, '2012-12-27 21:11:42', '10.0.0.1'),
	(3, 1, 4, '2012-12-27 21:11:57', '10.0.0.1'),
	(4, 2, 1, '2012-12-27 21:44:27', '10.0.0.1'),
	(5, 2, 4, '2012-12-27 21:44:41', '10.0.0.1'),
	(6, 3, 2, '2012-12-27 21:44:57', '10.0.0.1'),
	(7, 4, 1, '2012-12-27 21:44:59', '10.0.0.1'),
	(8, 4, 3, '2012-12-27 21:45:19', '10.0.0.1'),
	(9, 2, 3, '2012-12-27 21:45:28', '10.0.0.1'),
	(10, 3, 4, '2012-12-27 21:45:49', '10.0.0.1');
/*!40000 ALTER TABLE `u_friends` ENABLE KEYS */;


-- Dumping structure for table ws.u_info
CREATE TABLE IF NOT EXISTS `u_info` (
  `u_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'user id ',
  `u_name` varchar(50) NOT NULL COMMENT 'user name ',
  `u_passw` varchar(50) NOT NULL COMMENT 'user password',
  `u_crt_dttm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'user create date time ',
  `u_crt_ip` varchar(50) NOT NULL DEFAULT '10.0.0.1' COMMENT 'user create ip address',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_name` (`u_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='user infomations';

-- Dumping data for table ws.u_info: ~4 rows (approximately)
/*!40000 ALTER TABLE `u_info` DISABLE KEYS */;
REPLACE INTO `u_info` (`u_id`, `u_name`, `u_passw`, `u_crt_dttm`, `u_crt_ip`) VALUES
	(1, 'admin', 'admin', '2012-12-27 21:09:11', '10.0.0.1'),
	(2, 'admin2', 'admin2', '2012-12-27 21:09:31', '10.0.0.1'),
	(3, 'test1', 'test1', '2012-12-27 21:10:39', '10.0.0.1'),
	(4, 'test2', 'test2', '2012-12-27 21:10:58', '10.0.0.1');
/*!40000 ALTER TABLE `u_info` ENABLE KEYS */;


-- Dumping structure for view ws.getUserDetails
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `getUserDetails`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `getUserDetails` AS select `i`.`u_id` AS `UID`,`i`.`u_name` AS `name`,`i`.`u_passw` AS `passw`,`i`.`u_crt_dttm` AS `crtDttm`,`i`.`u_crt_ip` AS `crtIp`,`d`.`u_alias` AS `alias`,`d`.`u_mobile` AS `mobile`,`d`.`u_email` AS `email`,`d`.`u_updt_ip` AS `lastUpdtIp`,`d`.`u_updt_dttm` AS `lastUpdtDttm`,`d`.`u_img_head` AS `headImg`,`d`.`u_img_bg` AS `bgImg`,`d`.`u_phrase` AS `phrase` from (`u_info` `i` left join `u_details` `d` on((`i`.`u_id` = `d`.`u_id`)));
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

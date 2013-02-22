# --------------------------------------------------------
# Host:                         127.0.0.1
# Server version:               5.0.45-community-nt-log - MySQL Community Edition (GPL)
# Server OS:                    Win32
# HeidiSQL version:             6.0.0.3966
# Date/time:                    2013-02-22 01:36:51
# --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

# Dumping database structure for ws
DROP DATABASE IF EXISTS `ws`;
CREATE DATABASE IF NOT EXISTS `ws` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ws`;


# Dumping structure for view ws.getuserdetails
DROP VIEW IF EXISTS `getuserdetails`;
# Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `getuserdetails` (
	`UID`  NULL DEFAULT NULL,
	`name`  NULL DEFAULT NULL,
	`passw`  NULL DEFAULT NULL,
	`crtDttm`  NULL DEFAULT NULL,
	`crtIp`  NULL DEFAULT NULL,
	`alias`  NULL DEFAULT NULL,
	`mobile`  NULL DEFAULT NULL,
	`email`  NULL DEFAULT NULL,
	`lastUpdtIp`  NULL DEFAULT NULL,
	`lastUpdtDttm`  NULL DEFAULT NULL,
	`headImg`  NULL DEFAULT NULL,
	`bgImg`  NULL DEFAULT NULL,
	`phrase`  NULL DEFAULT NULL
) ENGINE=MyISAM;


# Dumping structure for table ws.msg_info
DROP TABLE IF EXISTS `msg_info`;
CREATE TABLE IF NOT EXISTS `msg_info` (
  `msg_id` int(10) unsigned NOT NULL auto_increment,
  `msg_from` int(10) unsigned NOT NULL COMMENT 'the msg who send from',
  `msg_to` int(10) unsigned NOT NULL COMMENT 'the msg who send to',
  `msg_ty` tinyint(4) NOT NULL COMMENT 'msg type:  1 -> text msg; 2 -> binary msg; 3 -> other',
  `msg_cnt` text COMMENT 'msg content',
  `msg_crt_dttm` timestamp NULL default CURRENT_TIMESTAMP,
  `msg_crt_ip` varchar(50) default '10.0.0.1',
  `msg_unread` tinyint(4) default '0' COMMENT '0: 已读\n1: 未读',
  `msg_isdelete` tinyint(4) default NULL,
  PRIMARY KEY  (`msg_id`),
  KEY `FK_msg_info_u_info` (`msg_from`),
  CONSTRAINT `FK_msg_info_u_info` FOREIGN KEY (`msg_from`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COMMENT='message infomations';

# Dumping data for table ws.msg_info: ~77 rows (approximately)
DELETE FROM `msg_info`;
/*!40000 ALTER TABLE `msg_info` DISABLE KEYS */;
INSERT INTO `msg_info` (`msg_id`, `msg_from`, `msg_to`, `msg_ty`, `msg_cnt`, `msg_crt_dttm`, `msg_crt_ip`, `msg_unread`, `msg_isdelete`) VALUES
	(2, 1, 2, 1, 'auto insert test-content', '2013-02-02 17:42:31', 'local-ip', 0, 0),
	(3, 1, 2, 1, 'auto insert test-content-2', '2013-02-02 17:42:34', 'local-ip', 0, 0),
	(4, 3, 4, 1, 'sdf', '2013-02-02 20:08:44', '127.0.0.1', 1, 0),
	(5, 3, 4, 1, 'fsfdsf', '2013-02-02 20:09:20', '127.0.0.1', 1, 0),
	(6, 3, 4, 1, 'ni mei ni mei ', '2013-02-02 20:09:33', '127.0.0.1', 1, 0),
	(7, 4, 1, 1, 'ni hao a !', '2013-02-02 20:10:50', '127.0.0.1', 1, 0),
	(8, 4, 1, 1, '我要看你的离线消息。。。', '2013-02-02 20:11:07', '127.0.0.1', 1, 0),
	(9, 4, 3, 1, '33333', '2013-02-02 23:32:03', '127.0.0.1', 1, 0),
	(10, 4, 3, 1, 'test', '2013-02-02 23:32:31', '127.0.0.1', 1, 0),
	(11, 4, 3, 1, '中文', '2013-02-02 23:32:42', '127.0.0.1', 1, 0),
	(12, 4, 3, 1, '速度快不快？', '2013-02-02 23:33:32', '127.0.0.1', 1, 0),
	(13, 4, 3, 1, '貌似还可以哒', '2013-02-02 23:33:39', '127.0.0.1', 1, 0),
	(14, 4, 3, 1, '刚刚有点卡了。', '2013-02-02 23:33:50', '127.0.0.1', 1, 0),
	(15, 1, 3, 1, '我是手机，我是手机！！', '2013-02-02 23:39:12', '192.168.1.105', 1, 0),
	(16, 1, 3, 1, '再来一次，我是手机！！', '2013-02-02 23:40:43', '192.168.1.105', 1, 0),
	(17, 4, 1, 1, '测试测试 。要发布嘞。', '2013-02-03 00:18:28', '127.0.0.1', 1, 0),
	(18, 4, 1, 1, 'ok. 测试过关。', '2013-02-03 00:19:03', '127.0.0.1', 1, 0),
	(19, 4, 1, 1, 'chatting with zxx', '2013-02-03 21:45:14', '127.0.0.1', 1, 0),
	(20, 1, 4, 1, 'ni zai 骨？', '2013-02-04 01:06:18', '127.0.0.1', 1, 0),
	(21, 1, 2, 1, 'ddd', '2013-02-04 01:14:16', '127.0.0.1', 1, 0),
	(22, 1, 2, 1, 'ni hao .', '2013-02-04 01:14:24', '127.0.0.1', 1, 0),
	(23, 4, 1, 1, '嘿嘿。', '2013-02-04 01:14:43', '127.0.0.1', 1, 0),
	(24, 1, 4, 1, '你好啊。', '2013-02-04 01:15:12', '127.0.0.1', 1, 0),
	(25, 4, 1, 1, '我上线了。', '2013-02-04 01:15:20', '127.0.0.1', 1, 0),
	(26, 1, 3, 1, 'test tonight', '2013-02-07 23:16:34', '127.0.0.1', 1, 0),
	(27, 4, 1, 1, 'xxx', '2013-02-07 23:31:21', '127.0.0.1', 1, 0),
	(28, 1, 4, 1, 'oh shit', '2013-02-07 23:31:36', '127.0.0.1', 1, 0),
	(29, 4, 1, 1, '呵呵 ', '2013-02-09 13:24:54', '127.0.0.1', 1, 0),
	(30, 1, 4, 1, 'still there?', '2013-02-09 15:33:34', '127.0.0.1', 1, 0),
	(31, 3, 4, 1, 'hello', '2013-02-09 15:34:01', '127.0.0.1', 1, 0),
	(32, 4, 1, 1, '', '2013-02-09 17:34:09', '127.0.0.1', 1, 0),
	(33, 4, 1, 1, '\n', '2013-02-09 17:34:13', '127.0.0.1', 1, 0),
	(34, 4, 1, 1, '\n', '2013-02-09 17:34:13', '127.0.0.1', 1, 0),
	(35, 4, 1, 1, '\n', '2013-02-09 17:34:13', '127.0.0.1', 1, 0),
	(36, 4, 1, 1, '\njkhkjh', '2013-02-09 17:34:13', '127.0.0.1', 1, 0),
	(37, 4, 1, 1, 'asdfasdkfjsdakljfsa;dlkjfas;dlkjfasl;djfasd;f', '2013-02-09 20:45:48', '127.0.0.1', 1, 0),
	(38, 4, 1, 1, NULL, '2013-02-09 20:51:06', '127.0.0.1', 1, 0),
	(39, 4, 1, 1, '', '2013-02-09 20:51:08', '127.0.0.1', 1, 0),
	(40, 4, 1, 1, '', '2013-02-09 20:51:10', '127.0.0.1', 1, 0),
	(41, 4, 1, 1, '', '2013-02-09 20:51:10', '127.0.0.1', 1, 0),
	(42, 4, 1, 1, '', '2013-02-09 20:51:13', '127.0.0.1', 1, 0),
	(43, 4, 1, 1, '', '2013-02-09 20:51:39', '127.0.0.1', 1, 0),
	(44, 4, 1, 1, '', '2013-02-09 20:51:42', '127.0.0.1', 1, 0),
	(45, 4, 1, 1, '', '2013-02-09 20:51:43', '127.0.0.1', 1, 0),
	(46, 4, 1, 1, '', '2013-02-09 20:51:43', '127.0.0.1', 1, 0),
	(47, 4, 1, 1, '', '2013-02-09 20:51:45', '127.0.0.1', 1, 0),
	(48, 4, 1, 1, '', '2013-02-09 21:15:19', '127.0.0.1', 1, 0),
	(49, 4, 1, 1, '', '2013-02-09 21:15:35', '127.0.0.1', 1, 0),
	(50, 4, 1, 1, '', '2013-02-09 22:30:14', '127.0.0.1', 1, 0),
	(51, 4, 1, 1, '', '2013-02-09 22:53:40', '127.0.0.1', 1, 0),
	(52, 4, 1, 1, 'dsafsadfsadfasdfsadfsdfasdf', '2013-02-09 22:55:59', '127.0.0.1', 1, 0),
	(53, 4, 1, 1, '<br>', '2013-02-09 22:57:30', '127.0.0.1', 1, 0),
	(54, 4, 1, 1, '', '2013-02-09 23:01:48', '127.0.0.1', 1, 0),
	(55, 4, 1, 1, 'asdfasdfsdfasdfasdfasdfsadfasfasfasdfsadfasdfsdfsdfasdfsdafsadfsdfasdfsdfasfasdfsdfsdfsadfsdafsad\nsdfsdfasf', '2013-02-09 23:38:43', '127.0.0.1', 1, 0),
	(56, 4, 1, 1, 'sdfasdf', '2013-02-09 23:39:14', '127.0.0.1', 1, 0),
	(57, 4, 1, 1, 'asdfsdafa', '2013-02-09 23:39:20', '127.0.0.1', 1, 0),
	(58, 4, 1, 1, '', '2013-02-09 23:54:23', '127.0.0.1', 1, 0),
	(59, 4, 1, 1, 'kjhkjhkjhjkhkjhkjhjhkjhkhkjhkjhkjhkjhkjhkjh', '2013-02-10 00:37:22', '127.0.0.1', 1, 0),
	(60, 4, 3, 1, 'sadfsadflksadflkjasdflkjasdflk;jasdklf;alsdk', '2013-02-10 00:40:55', '127.0.0.1', 1, 0),
	(61, 4, 3, 1, '\nsdfsadfasdfasdfasdfasdfasdfasdfasdfasdfasdfasd', '2013-02-10 00:41:01', '127.0.0.1', 1, 0),
	(62, 4, 3, 1, '', '2013-02-10 00:44:04', '127.0.0.1', 1, 0),
	(63, 4, 3, 1, 'asdfasdf', '2013-02-10 00:44:20', '127.0.0.1', 1, 0),
	(64, 4, 3, 1, 'sdfasdf', '2013-02-10 00:44:35', '127.0.0.1', 1, 0),
	(65, 4, 3, 1, 'test', '2013-02-10 00:44:42', '127.0.0.1', 1, 0),
	(66, 4, 3, 1, '\n', '2013-02-10 00:45:49', '127.0.0.1', 1, 0),
	(67, 4, 3, 1, 'sdaf', '2013-02-10 00:45:53', '127.0.0.1', 1, 0),
	(68, 4, 3, 1, 'kjhk', '2013-02-10 00:56:00', '127.0.0.1', 1, 0),
	(69, 1, 3, 1, 'sdfsadf', '2013-02-10 01:06:02', '127.0.0.1', 1, 0),
	(70, 4, 1, 1, 'is read?', '2013-02-10 01:51:25', '127.0.0.1', 1, 0),
	(71, 4, 1, 1, 'already read!!\n', '2013-02-10 01:52:21', '127.0.0.1', 0, 0),
	(72, 4, 3, 1, 'dsfsadf', '2013-02-10 12:20:38', '127.0.0.1', 1, 0),
	(73, 4, 3, 1, '....', '2013-02-10 12:24:23', '127.0.0.1', 1, 0),
	(74, 4, 1, 1, 'ddd', '2013-02-10 23:40:55', '127.0.0.1', 0, 0),
	(75, 1, 4, 1, 'xxx', '2013-02-10 23:50:35', '127.0.0.1', 0, 0),
	(76, 1, 4, 1, 'jkhk', '2013-02-10 23:50:52', '127.0.0.1', 1, 0),
	(77, 1, 2, 1, 'dd', '2013-02-20 23:35:52', '127.0.0.1', 0, 0),
	(78, 2, 1, 1, 'asdf', '2013-02-20 23:35:56', '127.0.0.1', 0, 0);
/*!40000 ALTER TABLE `msg_info` ENABLE KEYS */;


# Dumping structure for table ws.ude_sx
DROP TABLE IF EXISTS `ude_sx`;
CREATE TABLE IF NOT EXISTS `ude_sx` (
  `sx_type` tinyint(4) NOT NULL,
  `sx_name` varchar(45) default NULL,
  PRIMARY KEY  (`sx_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='鼠牛虎兔龙蛇 \n马羊猴鸡狗猪';

# Dumping data for table ws.ude_sx: ~5 rows (approximately)
DELETE FROM `ude_sx`;
/*!40000 ALTER TABLE `ude_sx` DISABLE KEYS */;
INSERT INTO `ude_sx` (`sx_type`, `sx_name`) VALUES
	(0, 'none'),
	(1, '鼠'),
	(2, '牛'),
	(3, '虎'),
	(4, '兔');
/*!40000 ALTER TABLE `ude_sx` ENABLE KEYS */;


# Dumping structure for table ws.ude_xx
DROP TABLE IF EXISTS `ude_xx`;
CREATE TABLE IF NOT EXISTS `ude_xx` (
  `xx_type` tinyint(4) NOT NULL,
  `xx_name` varchar(45) default NULL,
  PRIMARY KEY  (`xx_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='血型\n\n1 A\n2 B\n3 AB\n4 O\n5 others';

# Dumping data for table ws.ude_xx: ~6 rows (approximately)
DELETE FROM `ude_xx`;
/*!40000 ALTER TABLE `ude_xx` DISABLE KEYS */;
INSERT INTO `ude_xx` (`xx_type`, `xx_name`) VALUES
	(0, 'none'),
	(1, 'A'),
	(2, 'B'),
	(3, 'AB'),
	(4, 'O'),
	(5, 'others');
/*!40000 ALTER TABLE `ude_xx` ENABLE KEYS */;


# Dumping structure for table ws.ude_xz
DROP TABLE IF EXISTS `ude_xz`;
CREATE TABLE IF NOT EXISTS `ude_xz` (
  `xz_id` tinyint(4) NOT NULL,
  `xz_name` varchar(45) default NULL,
  PRIMARY KEY  (`xz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='水瓶 双鱼 牧羊 金牛 双子 巨蟹\n狮子 处女 天秤 天蝎 射手 摩羯';

# Dumping data for table ws.ude_xz: ~10 rows (approximately)
DELETE FROM `ude_xz`;
/*!40000 ALTER TABLE `ude_xz` DISABLE KEYS */;
INSERT INTO `ude_xz` (`xz_id`, `xz_name`) VALUES
	(0, 'none'),
	(1, '水瓶'),
	(2, '双鱼'),
	(3, '牧羊'),
	(4, '金牛'),
	(5, '双子'),
	(6, '巨蟹'),
	(7, '狮子'),
	(8, '处女'),
	(9, '天秤');
/*!40000 ALTER TABLE `ude_xz` ENABLE KEYS */;


# Dumping structure for table ws.ud_extras
DROP TABLE IF EXISTS `ud_extras`;
CREATE TABLE IF NOT EXISTS `ud_extras` (
  `e_id` int(11) NOT NULL auto_increment COMMENT '额外信息自增序列号',
  `e_owner` int(10) unsigned NOT NULL COMMENT '额外信息-拥有者',
  `e_xz` tinyint(4) default NULL COMMENT '1   水瓶座(1.21-2.19)\n2   双鱼座(2.20-3.20)\n3   牧羊座(3.21-4.20)\n4   金牛座(4.21-5.21)\n5   双子座(5.22-6.21)\n6   巨蟹座(6.22-7.23)\n7   狮子座(7.24-8.23)\n8   处女座(8.24-9.23)\n9   天秤座(9.24-10.23)\n10 天蝎座(10.24-11.22)\n11 射手座(11.23-12.21)\n12 摩羯座(12.22-1.20)',
  `e_sx` tinyint(4) default NULL COMMENT '1   鼠\n2   牛\n3   虎\n4   兔\n5   龙\n6   蛇\n7   马\n8   羊\n9   猴\n10 鸡\n11 狗\n12 猪',
  `e_xx` tinyint(4) default NULL COMMENT '血型\n\n1 A\n2 B\n3 AB\n4 O\n5 others',
  PRIMARY KEY  (`e_id`),
  KEY `FK_u_d_extras_u_details_idx` (`e_owner`),
  KEY `FK_ud_extras_ude_xx_idx` (`e_xx`),
  KEY `FK_ud_extras_ude_sx_idx` (`e_sx`),
  KEY `FK_ud_extras_ude_xz_idx` (`e_xz`),
  CONSTRAINT `FK_ud_extras_ude_sx` FOREIGN KEY (`e_sx`) REFERENCES `ude_sx` (`sx_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ud_extras_ude_xx` FOREIGN KEY (`e_xx`) REFERENCES `ude_xx` (`xx_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ud_extras_ude_xz` FOREIGN KEY (`e_xz`) REFERENCES `ude_xz` (`xz_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ud_extras_u_details` FOREIGN KEY (`e_owner`) REFERENCES `u_details` (`u_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户更丰富的信息';

# Dumping data for table ws.ud_extras: ~1 rows (approximately)
DELETE FROM `ud_extras`;
/*!40000 ALTER TABLE `ud_extras` DISABLE KEYS */;
INSERT INTO `ud_extras` (`e_id`, `e_owner`, `e_xz`, `e_sx`, `e_xx`) VALUES
	(0, 1, 0, 0, 0);
/*!40000 ALTER TABLE `ud_extras` ENABLE KEYS */;


# Dumping structure for table ws.uf_type
DROP TABLE IF EXISTS `uf_type`;
CREATE TABLE IF NOT EXISTS `uf_type` (
  `t_id` int(11) NOT NULL,
  `t_name` varchar(45) default NULL,
  `t_owner` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`t_id`),
  KEY `fk_f_type_u_info1_idx` (`t_owner`),
  CONSTRAINT `fk_f_type_u_info1` FOREIGN KEY (`t_owner`) REFERENCES `u_info` (`u_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='类型(分组)名称';

# Dumping data for table ws.uf_type: ~0 rows (approximately)
DELETE FROM `uf_type`;
/*!40000 ALTER TABLE `uf_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `uf_type` ENABLE KEYS */;


# Dumping structure for table ws.u_details
DROP TABLE IF EXISTS `u_details`;
CREATE TABLE IF NOT EXISTS `u_details` (
  `u_id` int(10) unsigned NOT NULL,
  `u_alias` varchar(50) default NULL COMMENT 'user alias',
  `u_mobile` varchar(50) default NULL COMMENT 'user mobile number',
  `u_email` varchar(50) default NULL COMMENT 'user email',
  `u_updt_ip` varchar(50) default '10.0.0.1' COMMENT 'user last logon ip address',
  `u_updt_dttm` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT 'user last logon date time',
  `u_img_head` varchar(50) default NULL COMMENT 'user head image src',
  `u_img_bg` varchar(50) default NULL COMMENT 'user background image src',
  `u_phrase` varchar(50) default NULL COMMENT 'user said somethings shortly',
  `u_gender` tinyint(4) default '0' COMMENT '1: male\n2: female\n0: others',
  `u_age` tinyint(4) default NULL COMMENT '年龄',
  `u_real_m` varchar(45) default NULL COMMENT '真实姓名',
  `u_remark` varchar(45) default NULL,
  `u_vipcode` int(11) default NULL,
  `u_extras` int(11) default '0' COMMENT '额外信息',
  PRIMARY KEY  (`u_id`),
  CONSTRAINT `FK__u_info` FOREIGN KEY (`u_id`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user details';

# Dumping data for table ws.u_details: ~8 rows (approximately)
DELETE FROM `u_details`;
/*!40000 ALTER TABLE `u_details` DISABLE KEYS */;
INSERT INTO `u_details` (`u_id`, `u_alias`, `u_mobile`, `u_email`, `u_updt_ip`, `u_updt_dttm`, `u_img_head`, `u_img_bg`, `u_phrase`, `u_gender`, `u_age`, `u_real_m`, `u_remark`, `u_vipcode`, `u_extras`) VALUES
	(1, 'lw', '15208205268', 'vane@ws.com', '10.0.0.1', '2013-02-20 23:09:43', 'hd12.jpg', 'src-bg-2', '我来测试一丢丢。。', 0, NULL, NULL, NULL, NULL, 0),
	(2, 'snow', '18782950985', 'snow@ws.com', '10.0.0.1', '2013-02-20 23:08:58', 'hd02.jpg', 'src-bg', '今天心情很好！', 0, NULL, NULL, NULL, NULL, 0),
	(3, 'wc', '123466', NULL, '10.0.0.1', '2013-02-20 23:09:43', 'hd07.jpg', NULL, 'Im a sb.!', 0, NULL, NULL, NULL, NULL, 0),
	(4, 'hl', '31313', 'qq.com', '10.0.0.1', '2013-02-20 23:09:43', 'hd16.jpg', NULL, 'haha~~', 0, NULL, NULL, NULL, NULL, 0),
	(5, 'nickname', '13111112222', 'test@ws.com', '10.1.1.1', '2013-02-22 00:41:00', 'hd04.jpg', 'bg-04.jpg', 'user-phrase', 1, 20, 'real-name', 'remark-beizhu', 0, 0),
	(7, 'test3-01', 'mobile-01', 'email-01', '127.0.0.1', '2013-02-22 00:00:00', 'hd01.jpg', 'bg01.jpg', 'phrase-01', 1, 20, 'real-name-01', 'remark-01', 0, 0),
	(9, 'test22-13', 'mobile-13', 'email-13', '127.0.0.1', '2013-02-22 00:00:00', 'hd13.jpg', 'bg13.jpg', 'phrase-13', 1, 20, 'real-name-13', 'remark-13', 0, 0),
	(10, 'luowen-12', 'mobile-12', 'email-12', '127.0.0.1', '2013-02-22 00:00:00', 'hd12.jpg', 'bg12.jpg', 'phrase-12', 1, 20, 'real-name-12', 'remark-12', 0, 0);
/*!40000 ALTER TABLE `u_details` ENABLE KEYS */;


# Dumping structure for table ws.u_friends
DROP TABLE IF EXISTS `u_friends`;
CREATE TABLE IF NOT EXISTS `u_friends` (
  `f_id` int(10) NOT NULL auto_increment COMMENT 'friends list index',
  `f_owner` int(10) unsigned NOT NULL COMMENT 'friends list owner',
  `f_friend` int(10) unsigned default NULL COMMENT 'friends list:  0 stand for friends group',
  `f_crt_dttm` timestamp NULL default CURRENT_TIMESTAMP,
  `f_crt_ip` varchar(50) default '10.0.0.1',
  `f_type` int(10) NOT NULL default '0' COMMENT 'list type 列表类型(分组)\n\n    0: 用户列表\n非0: 分组信息',
  `f_id_parent` int(11) NOT NULL COMMENT 'f_id 的父节点。\n用于无限级分类\n\n0表示为根',
  `f_rank` int(11) NOT NULL COMMENT '用户列表排序',
  PRIMARY KEY  (`f_id`,`f_id_parent`),
  KEY `FK_u_friends_u_info` (`f_owner`),
  KEY `FK_u_friends_f_type_idx` (`f_type`),
  CONSTRAINT `FK_u_friends_f_type` FOREIGN KEY (`f_type`) REFERENCES `uf_type` (`t_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_u_friends_u_info` FOREIGN KEY (`f_owner`) REFERENCES `u_info` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='user friends list';

# Dumping data for table ws.u_friends: ~10 rows (approximately)
DELETE FROM `u_friends`;
/*!40000 ALTER TABLE `u_friends` DISABLE KEYS */;
INSERT INTO `u_friends` (`f_id`, `f_owner`, `f_friend`, `f_crt_dttm`, `f_crt_ip`, `f_type`, `f_id_parent`, `f_rank`) VALUES
	(1, 1, 2, '2012-12-27 21:11:32', '10.0.0.1', 0, 0, 0),
	(2, 1, 3, '2012-12-27 21:11:42', '10.0.0.1', 0, 0, 0),
	(3, 1, 4, '2012-12-27 21:11:57', '10.0.0.1', 0, 0, 0),
	(4, 2, 1, '2012-12-27 21:44:27', '10.0.0.1', 0, 0, 0),
	(5, 2, 4, '2012-12-27 21:44:41', '10.0.0.1', 0, 0, 0),
	(6, 3, 2, '2012-12-27 21:44:57', '10.0.0.1', 0, 0, 0),
	(7, 4, 1, '2012-12-27 21:44:59', '10.0.0.1', 0, 0, 0),
	(8, 4, 3, '2012-12-27 21:45:19', '10.0.0.1', 0, 0, 0),
	(9, 2, 3, '2012-12-27 21:45:28', '10.0.0.1', 0, 0, 0),
	(10, 3, 4, '2012-12-27 21:45:49', '10.0.0.1', 0, 0, 0);
/*!40000 ALTER TABLE `u_friends` ENABLE KEYS */;


# Dumping structure for table ws.u_info
DROP TABLE IF EXISTS `u_info`;
CREATE TABLE IF NOT EXISTS `u_info` (
  `u_id` int(10) unsigned NOT NULL auto_increment COMMENT 'user id ',
  `u_name` varchar(50) NOT NULL COMMENT 'user name ',
  `u_passw` varchar(50) NOT NULL COMMENT 'user password',
  `u_crt_dttm` timestamp NOT NULL default CURRENT_TIMESTAMP COMMENT 'user create date time ',
  `u_crt_ip` varchar(50) NOT NULL default '10.0.0.1' COMMENT 'user create ip address',
  `u_active` tinyint(4) NOT NULL default '1' COMMENT '0: 禁用\n1: 启用',
  PRIMARY KEY  (`u_id`),
  UNIQUE KEY `u_name` (`u_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='user infomations';

# Dumping data for table ws.u_info: ~9 rows (approximately)
DELETE FROM `u_info`;
/*!40000 ALTER TABLE `u_info` DISABLE KEYS */;
INSERT INTO `u_info` (`u_id`, `u_name`, `u_passw`, `u_crt_dttm`, `u_crt_ip`, `u_active`) VALUES
	(1, 'admin', 'admin', '2012-12-27 21:09:11', '10.0.0.1', 1),
	(2, 'admin2', 'admin2', '2012-12-27 21:09:31', '10.0.0.1', 1),
	(3, 'test1', 'test1', '2012-12-27 21:10:39', '10.0.0.1', 1),
	(4, 'test2', 'test2', '2012-12-27 21:10:58', '10.0.0.1', 1),
	(5, 'test', 'test', '2013-02-21 00:00:00', '127.0.0.1', 1),
	(6, 'test12', 'test12', '2013-02-21 00:00:00', '127.0.0.1', 1),
	(7, 'test3', 'test3', '2013-02-22 00:00:00', '127.0.0.1', 1),
	(9, 'test22', 'test21', '2013-02-22 00:00:00', '127.0.0.1', 1),
	(10, 'luowen', 'lqyygy', '2013-02-22 00:00:00', '127.0.0.1', 1);
/*!40000 ALTER TABLE `u_info` ENABLE KEYS */;


# Dumping structure for table ws.u_passport
DROP TABLE IF EXISTS `u_passport`;
CREATE TABLE IF NOT EXISTS `u_passport` (
  `u_id` int(10) unsigned NOT NULL auto_increment,
  `u_passw` varchar(45) default NULL COMMENT '用户密码',
  `u_active` tinyint(4) NOT NULL default '1' COMMENT '0: 禁用\n1: 启用',
  PRIMARY KEY  (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dumping data for table ws.u_passport: ~0 rows (approximately)
DELETE FROM `u_passport`;
/*!40000 ALTER TABLE `u_passport` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_passport` ENABLE KEYS */;


# Dumping structure for view ws.getuserdetails
DROP VIEW IF EXISTS `getuserdetails`;
# Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `getuserdetails`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `getuserdetails` AS select `i`.`u_id` AS `UID`,`i`.`u_name` AS `name`,`i`.`u_passw` AS `passw`,`i`.`u_crt_dttm` AS `crtDttm`,`i`.`u_crt_ip` AS `crtIp`,`d`.`u_alias` AS `alias`,`d`.`u_mobile` AS `mobile`,`d`.`u_email` AS `email`,`d`.`u_updt_ip` AS `lastUpdtIp`,`d`.`u_updt_dttm` AS `lastUpdtDttm`,`d`.`u_img_head` AS `headImg`,`d`.`u_img_bg` AS `bgImg`,`d`.`u_phrase` AS `phrase` from (`u_info` `i` left join `u_details` `d` on((`i`.`u_id` = `d`.`u_id`)));
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
